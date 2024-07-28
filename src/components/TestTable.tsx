import {
  Button,
  ConfigProvider,
  message,
  Modal,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { Test } from "../services/test-case";
import { CodeEditor } from "./CodeEditor/CodeEditor";
import { TestCaseData } from "../services";
import {
  getTestCaseListByProblemUUID,
  GetTestCaseListResponse,
} from "../services/test-case";
import { Editor } from "@monaco-editor/react";

interface TestTableType {
  key: string | undefined;
  language: string | undefined;
  createdAt: string | undefined;
  testContent: React.ReactNode | undefined;
}

interface TestTableProps {
  problemUUID: string | undefined;
}

export default function TestTable({ problemUUID }: TestTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableList, setTableList] = useState<TestTableType[]>([]);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);

  const showModal = (test: Test) => {
    setSelectedTest(test);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    try {
      const fetchTestCaseByProblemUUID = async () => {
        if (problemUUID != undefined) {
          const response: GetTestCaseListResponse =
            await getTestCaseListByProblemUUID(problemUUID);
          if (response.TestCaseList == null) {
            const mappedTestList: TestTableType[] = [];
            message.warning("Please add tests");
          } else if (response.TestCaseList) {
            const mappedTestList: TestTableType[] = response.TestCaseList.map(
              (test: Test, index) => {
                return {
                  key: String(index + 1),
                  language: test.language,
                  createdAt: test.createdAt,
                  testContent: (
                    <>
                      <ConfigProvider
                        theme={{
                          token: {
                            colorPrimary: "#DEFFD3",
                          },
                        }}
                      >
                        <Button
                          style={{ border: "none" }}
                          type="default"
                          onClick={() => showModal(test)}
                        >
                          View
                        </Button>
                      </ConfigProvider>
                    </>
                  ),
                };
              },
            );
            setTableList(mappedTestList);
          }
        }
      };
      fetchTestCaseByProblemUUID();
    } catch (error) {
      message.error("fail to get test case list");
    }
  }, []);

  const columns: TableProps<TestTableType>["columns"] = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Test Content",
      dataIndex: "testContent",
      key: "testContent",
    },
  ];
  // const data: TestTableType[] = [
  //   {
  //     key: testCase ? '1' : undefined,
  //     language: testCase?.language,
  //     createdAt: testCase?.createdAt,
  //     testContent:
  //     <>
  //       <Button type="dashed" onClick={showModal}>
  //         View
  //       </Button>
  //         <Modal title="Test Info" height={"800px"} width={ "900px"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
  //           <CodeEditor theme={'vs-dark'} height={"700px"} width={"850px"} value={testCase?.testFileContent } collapsed={false} />
  //       </Modal>
  //     </>
  //   },
  // ];
  return (
    <>
      <Table columns={columns} dataSource={tableList} />
      <Modal
        title="Test Info"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
        footer={false}
      >
        <Editor
          theme={"vs-dark"}
          height="700px"
          width="850px"
          value={selectedTest?.testFileContent || ""}
          language={selectedTest?.language}
        />
      </Modal>
    </>
  );
}
