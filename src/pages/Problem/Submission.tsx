import React, { useEffect, useState } from "react";
import { useProblemContext } from "../../contexts/ProblemContext";
import {
  GetSubmissionListRequest,
  GetSubmissionListResponse,
  GetSubmissionRequest,
  Submission,
  SubmissionStatusError,
  SubmissionStatusExecuting,
  SubmissionStatusFinished,
  getSubmission,
  getSubmissionList,
  DataType,
} from "../../services";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  kimbieLight,
  railscasts,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button, message, Modal, Space, Table, TableProps, Tag } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import "./Problem.css";

export default function SubmissionDisplay() {
  const {
    submission,
    setSubmission,
    problemUUID,
    currentPage,
    setCurrentPage,
    disableSubmit,
    setDisableSubmit,
  } = useProblemContext();
  const [submissions, setSubmissions] = useState<DataType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState("");
  const [modalLanguage, setModelLanguage] = useState<string>("");
  const { user } = useAuth();
  const showModal = (content: string, language: string) => {
    setCurrentSubmission(content);
    setIsModalVisible(true);
    setModelLanguage(language.toLowerCase());
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      width: "25%",
    },
    {
      title: "Submission",
      dataIndex: "submission",
      key: "submission",
      width: "15%",
      render: (text: string, record: DataType) => (
        <Button
          onClick={() =>
            showModal(record.submission as string, record.language)
          }
        >
          View
        </Button>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "30%",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: "25%",
      render: (status) => (
        <>
          {status == 3 && (
            <Tag color={"green"} key={status}>
              Judged
            </Tag>
          )}
          {status == 2 && (
            <Tag color={"blue"} key={status}>
              Executing
            </Tag>
          )}
          {status == 1 && (
            <Tag color={"geekblue"} key={status}>
              Executing
            </Tag>
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    const fetchSubmissionList = async () => {
      if (!user?.accountUUID || !user.username) {
        message.error("Can't find user id");
        return null;
      }
      let req: GetSubmissionListRequest = {
        problemUUID: problemUUID,
        authorAccountUUID: user?.accountUUID || "",
      };
      const response: GetSubmissionListResponse = await getSubmissionList(req);
      if (response.Submissions) {
        const tableArray = response.Submissions.map((item, index) => ({
          key: (index + 1).toString(),
          language: item.language,
          submission: item.content,
          result: item.grading_result || "Pending",
          status: item.status,
          createdAt: new Date(item.created_time).toLocaleString(),
        }));
        setSubmissions(tableArray);
      } else {
        console.error(
          "Submissions data is not in the expected format:",
          response,
        );
      }
    };
    fetchSubmissionList();
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let startTime: number;
    if (submission) {
      startTime = Date.now();
      const fetchSubmission = async () => {
        let req: GetSubmissionRequest = { UUID: submission.UUID };
        try {
          const res = await getSubmission(req);

          // 3 = judged = update last submission to new submission
          // 1 = executing = adding new submission
          if (res) {
            const newSubmission: DataType = {
              key: (submissions.length + 1).toString(),
              language: res.Submission.language,
              submission: res.Submission.content, // Truncate for display
              result: res.Submission.grading_result || "Pending",
              status: res.Submission.status,
              createdAt: new Date(res.Submission.created_time).toLocaleString(),
            };

            setSubmissions((prevSubmissions) => {
              const updatedSubmissions = [...prevSubmissions];
              if (newSubmission.status == SubmissionStatusFinished) {
                if (updatedSubmissions.length > 0) {
                  updatedSubmissions[updatedSubmissions.length - 1] =
                    newSubmission;
                  message.success("Done executing");
                }
                return updatedSubmissions;
              } else if (newSubmission.status == SubmissionStatusExecuting) {
                if (updatedSubmissions.length == 0) {
                  updatedSubmissions.push(newSubmission);
                  return updatedSubmissions;
                } else if (updatedSubmissions.length > 0) {
                  if (
                    updatedSubmissions[updatedSubmissions.length - 1].status ==
                    SubmissionStatusFinished
                  ) {
                    updatedSubmissions.push(newSubmission);
                    return updatedSubmissions;
                  } else if (
                    updatedSubmissions[updatedSubmissions.length - 1].status ==
                    SubmissionStatusExecuting
                  ) {
                    return updatedSubmissions;
                  }
                }
              }
              return updatedSubmissions;
            });
          }
          // Check if polling should stop
          if (
            res.Submission.status === SubmissionStatusFinished ||
            res.Submission.status === SubmissionStatusError ||
            Date.now() - startTime > 9000
          ) {
            if (intervalId) clearInterval(intervalId);
            setDisableSubmit(false);
          }
        } catch (error) {
          console.error("Error fetching submission:", error);
          if (intervalId) clearInterval(intervalId);
        }
      };

      // Initial fetch
      fetchSubmission();

      // Set up interval for polling (every 4 seconds)
      intervalId = setInterval(fetchSubmission, 4000);
    }

    // Cleanup function
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [submission]);

  return (
    <div className="problem-submission">
      <>
        <Table
          className="submission-table"
          columns={columns}
          dataSource={submissions}
          expandable={{
            expandedRowRender: (submission) => (
              <div className="expanded-row-animation">
                <SyntaxHighlighter
                  language={submission.language.toLowerCase()}
                  style={kimbieLight}
                  customStyle={{
                    margin: 0,
                    borderRadius: "4px",
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  {submission.result}
                </SyntaxHighlighter>
              </div>
            ),
          }}
          pagination={{
            pageSize: 6,
            showSizeChanger: false,
            showQuickJumper: false,
            current: currentPage,
            onChange: (page) => setCurrentPage(page),
          }}
        />
        <Modal
          title="Submission Content"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          className="code-editor-modal"
          width={800} // Adjust as needed
          footer={null}
        >
          <SyntaxHighlighter
            language={modalLanguage} // Change this based on the submission language
            style={railscasts}
            customStyle={{
              margin: 0,
              padding: "16px",
              borderRadius: "0 0 4px 4px",
            }}
          >
            {currentSubmission}
          </SyntaxHighlighter>
        </Modal>
      </>
    </div>
  );
}
