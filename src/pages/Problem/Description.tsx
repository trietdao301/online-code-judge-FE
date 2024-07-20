import React from "react";
import { useProblemContext } from "../../contexts/ProblemContext";
import { ParseHTML } from "../../utils/parseHTML";
import "./Problem.css";
import parse from "html-react-parser";

export default function Description() {
  const { description } = useProblemContext();
  return (
    <div className="problem-description">
      <pre
        className="description-content"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
