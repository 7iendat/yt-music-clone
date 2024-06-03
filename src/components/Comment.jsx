import { Avatar } from "antd";
import React from "react";

const Comment = ({ value }) => {
  const { authorDisplayName, authorProfileImageUrl, textDisplay } = value;
  return (
    <div
      style={{
        width: "100%",

        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: "20px",
      }}
    >
      <div style={{ width: "40px" }}>
        <Avatar src={authorProfileImageUrl} size="large">
          {authorProfileImageUrl
            ? ""
            : authorDisplayName?.charAt(0)?.toUpperCase()}
        </Avatar>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
          marginLeft: "10px",
        }}
      >
        <span style={{ fontWeight: "bold" }}>{authorDisplayName}</span>
        <span>{textDisplay}</span>
      </div>
    </div>
  );
};

export default Comment;
