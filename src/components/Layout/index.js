import React, { useState } from "react";

import Header from "../Auth";
import DatabaseContext from "../Database/Context";

import Container from "./Container";

const containerStyle = {
  height: "100vh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

export default function Layout() {
 
  const [openSidebar, setOpenSidebart] = useState(false);
  const handleToggleSidebar = (open) =>
    // If the open parameter is not passed it will toggle the previous state.
    setOpenSidebart((prevState) => ({
      openSidebar:
        typeof open === "undefined" ? !prevState.openSidebar : Boolean(open),
    }));

  return (
    <div style={containerStyle}>
      <Header sidebarToggleHandler={handleToggleSidebar} />

      <DatabaseContext.Consumer>
        {({ database, loadDatabase }) =>
          database ? (
            <Container
              currentDatabase={database}
              loadDatabase={loadDatabase}
              sidebarToggleHandler={handleToggleSidebar}
              openSidebar={openSidebar}
            />
          ) : (
            <div>Loading...</div>
          )
        }
      </DatabaseContext.Consumer>
    </div>
  );
}
