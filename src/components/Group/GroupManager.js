import React from "react";

import Dialog from "@material-ui/core/Dialog";

import { Route, Routes } from "react-router-dom";

import CreateGroup from "./CreateGroup";
import GroupList from "./GroupList";
import ManageGroup from "./Manage";

import { BrowserRouter as Router } from "react-router-dom";

export default function GroupManager(props) {
  const handleClose = () => props.closeHandler();


  const {
    currentGroup,
    loadDatabaseHandler,
    joinGroupHandler,
    leaveGroupHandler,
    handleOpen,
  } = props;

  const ManageGroupComponent = ({ match }) => (
    <Dialog onClose={handleClose} open fullScreen>
      <ManageGroup match={match} closeHandler={handleClose} />
    </Dialog>
  );

  const CreateGroupComponent = () => (
    <Dialog onClose={handleClose} open fullWidth>
      <CreateGroup closeHandler={handleClose} />
    </Dialog>
  );

  const GroupListComponent = () => (
    <Dialog onClose={handleClose} open fullWidth>
      <GroupList
        currentGroup={currentGroup}
        joinGroupHandler={joinGroupHandler}
        leaveGroupHandler={leaveGroupHandler}
        loadDatabaseHandler={loadDatabaseHandler}
        closeHandler={handleClose}
        handleOpen={handleOpen}
      />
    </Dialog>
  );

  // Why do some routes use `component` prop and some the `render` prop?
  // https://stackoverflow.com/a/48152635
  return (
    <Routes>
      <Route path="/" element={<GroupListComponent />} />
      <Route
        path="/group/manage/:id/:title"
        element={<ManageGroupComponent />}
      />
      <Route path="/group/create" element={<CreateGroupComponent />} />
     
    </Routes>
  );
}

