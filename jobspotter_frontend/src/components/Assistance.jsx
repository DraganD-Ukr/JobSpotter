import React from "react";

export default function Assistance() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Need Assistance?</h1>
      <p>Congratulations on completing your profile, Where would you like to go next?</p>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => window.location.href = "/searchjobpost"}>
          Search for Jobs
        </button>
        <button onClick={() => window.location.href = "/myjobposts"}>
          View My Job Posts
        </button>
        <button onClick={() => window.location.href = "/"}>
          Go to Home
        </button>
      </div>
    </div>
  );
}
