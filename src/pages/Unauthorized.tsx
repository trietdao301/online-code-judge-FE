import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div>
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
}
