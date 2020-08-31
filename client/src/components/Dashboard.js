import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";

const Dashboard = () => {
  return (
    <div>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link
          to="/surveys/new"
          className="btn-floating btn-large #424242 grey darken-3"
        >
          <i className="material-icons">create</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
