import React, { useState } from "react";

import Main from "./Main";
import Sidebar from "./Sidebar";
import buildQuestions from "../../questions/utils/buildQuestions";
import UserContext from "../Auth/Context";
import saveQuestions from "../../questions/utils/saveQuestions";
const containerStyle = {
  display: "flex",
  flexDirection: "row",
  zIndex: 0, // The header shadow will overlap.
  height: "100%",
};

export default function Container({
  currentDatabase,
  sidebarToggleHandler,
  loadDatabase,
  openSidebar,
}) {
 
  const [results, setResult] = useState([]);
  const handleUpdateResults = (results) => {
    setResult(results);
  };

  const displaySchema = async (name) => {
 
    const results = currentDatabase.exec(`SELECT * FROM ${name} LIMIT 10`);
    console.log(results);
    handleUpdateResults(results);

    return sidebarToggleHandler();
  };

  return (
    <div style={containerStyle}>
      <Sidebar
        open={openSidebar}
        currentDatabase={currentDatabase}
        uploadDatabaseHandler={loadDatabase}
        showSchemaHandler={displaySchema}
        toggleSidebarHandler={sidebarToggleHandler}
      />
      <UserContext.Consumer>
        {({ isLoaded, user }) =>
          isLoaded && (
            <Main
              user={user}
              results={results}
              updateResultsHandler={handleUpdateResults}
              currentDatabase={currentDatabase}
              loadDatabase={loadDatabase}
            />
          )
        }
      </UserContext.Consumer>
    </div>
  );
}
