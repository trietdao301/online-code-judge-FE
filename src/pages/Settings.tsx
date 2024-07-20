import React, { useEffect } from "react";
import { useLayoutContext } from "../contexts/LayoutContext";

export default function Settings() {
  const { setHeader } = useLayoutContext();

  useEffect(() => {
    setHeader("Setting");
  }, []);
  return <div>setting</div>;
}
