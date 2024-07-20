import React, { useEffect } from "react";
import { useLayoutContext } from "../contexts/LayoutContext";

export default function Submissions() {
  const { setHeader } = useLayoutContext();

  useEffect(() => {
    setHeader("Submission");
  }, []);
  return <div>submission</div>;
}
