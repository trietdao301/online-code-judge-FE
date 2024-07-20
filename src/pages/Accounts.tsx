import React, { useEffect } from "react";
import { useLayoutContext } from "../contexts/LayoutContext";

export default function Accounts() {
  const { setHeader } = useLayoutContext();

  useEffect(() => {
    setHeader("Account");
  }, []);
  return <div>accounts</div>;
}
