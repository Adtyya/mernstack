import { Spinner } from "react-bootstrap";
import React from "react";

const Loading = ({ size = 100 }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner style={{ width: size, height: size }} animation="border" />
    </div>
  );
};

export default Loading;
