import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
const NotFound = () => {
  return (
    <div className="container text-white">
      <div className="not-found-container">
        <h1 className="not-found-heading">404 - Page Not Found</h1>
        <p className="not-found-message">
          The page you are looking for does not exist.
        </p>
      </div>
      <div>
        <Link to="/">Quay Về Trang Chủ </Link>
      </div>
    </div>
  );
};

export default NotFound;
