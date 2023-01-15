import React from "react";

import IconButton from "@mui/material/IconButton";

import LogoutIcon from "@mui/icons-material/Logout";

import Group from "../Group";
import SavedDatabase from "../SavedDatabase";

import DatabaseContext from "../Database/Context";

import { logout } from "./API";
import Tooltip from "@mui/material/Tooltip";

function LoggedIn({ logoutHandler, user, joinGroup, leaveGroup }) {
  const handleLogout = () => logout().then(() => logoutHandler());

  return (
    <React.Fragment>
      <DatabaseContext.Consumer>
        {({ database: currentDatabase, loadDatabase }) => (
          <React.Fragment>
            <SavedDatabase
              currentDatabase={currentDatabase}
              loadDatabaseHandler={loadDatabase}
              disabled={Boolean(user.group)}
            />

            <Group
              loadDatabaseHandler={loadDatabase}
              currentGroup={user && user.group}
              joinGroupHandler={joinGroup}
              leaveGroupHandler={leaveGroup}
            />
          </React.Fragment>
        )}
      </DatabaseContext.Consumer>

      <Tooltip title="Logout">
        <IconButton color="inherit" aria-label="Logout" onClick={handleLogout}>
          <LogoutIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

export default LoggedIn;
