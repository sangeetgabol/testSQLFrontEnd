import React, { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import List from "@material-ui/core/List";

import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import { Link } from "react-router-dom";

import { loadDatabase } from "../SavedDatabase/API";

import GroupItem from "./GroupItem";

import { listGroups, joinGroup, leaveCurrentGroup } from "./API";
import clearQuestions from "../../questions/utils/clearQuestions";

const flexSpaceBetween = { display: "flex", justifyContent: "space-between" };

function GroupList(props) {
  const [error, setError] = useState(null);
  const [list, setList] = useState(null);



  useEffect(() => {
    load();
  }, []);


  const load = async () => {
    // Attempt to load all the available groups.
    try {
      const groups = await listGroups();
      setList(groups);
      setError(null);
    } catch (response) {
      const error = await response.text();
      setError(error);
    }
  };

  const handleClose = () => props.closeHandler();

  const handleJoinGroup = async (id) => {
    try {
      const group = await joinGroup(id);

      // Update the user first. Any group questions already generated will be loaded first.
      // Otherwise <Main> will generate the questions twice; once for the detected database change, then the detected group change.
      props.joinGroupHandler(group);

      // Once the user is marked as in this group, load the group database from the server.
      const fileBuffer = await loadDatabase(group.database);

      const typedArray = new Uint8Array(fileBuffer);

      // Now load the database into the client-side sql.js.
      props.loadDatabaseHandler(typedArray);

      // Find the group the user has just joined, and set it as active.
      // This saves pinging the server again to reload the `list` prop.
      const updatedGroupList = list.map((listGroup) => {
        // Update the isCurrent for all the groups in the list, leaving the last joined group as the active one.
        listGroup.isCurrent = group._id === listGroup._id;

        return listGroup;
      });
      setList(updatedGroupList);
      setError(null);
      handleClose();
      Swal.fire({
        text: "Group Joined Successfully",
        icon: "success",
        // position: "bottom-end",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });

    } catch (response) {
      const error = await response;
      setError(error);

      await leaveCurrentGroup();

      props.leaveGroupHandler();
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await leaveCurrentGroup();

      // Update the isCurrent for all the groups in the list to false
      const updatedGroupList = list.map((listGroup) => {
        listGroup.isCurrent = false;
        
        return listGroup;
      });

      // Clear all the cached questions, this will prompt the generation of a new set.
      clearQuestions();

      props.leaveGroupHandler();
      setList(updatedGroupList);
      setError(null);
    } catch (response) {
      const error = await response.text();
      setError(error);

    }
  };

  // render() {
  //   const { list, error } = this.state;

  return (
    <React.Fragment>
      <DialogTitle id="dialog-title">
        <div style={flexSpaceBetween}>
          Groups
          <Button
            component={Link}
            to="/group/create"
            color="primary"
            variant="contained"
            size="small"
          >
            Create &raquo;
          </Button>
        </div>
      </DialogTitle>
      {error && (
        <DialogContent>
          <DialogContentText color="error" align="center">
            {error}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogContent>
        <DialogContentText>
          Groups allow you to customize the experience and track the progress of
          every user that joins your group.
        </DialogContentText>
      </DialogContent>
      {console.log(list)}
      {list && (
        <List dense={list.length >= 5}>
          {list.map((group) => (
            <GroupItem
              key={group._id}
              group={group}
              closeHandler={props.closeHandler}
              joinGroupHandler={handleJoinGroup}
              leaveGroupHandler={handleLeaveGroup}
              dense={list.length >= 5}
            />
          ))}
        </List>
      )}
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}

export default GroupList;
