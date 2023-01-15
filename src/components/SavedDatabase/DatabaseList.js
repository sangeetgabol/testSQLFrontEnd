import React, { useState } from "react";

import List from "@mui/material/List";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import Button from "@mui/material/Button";

import { loadDatabase, deleteDatabase } from "./API";

import DatabaseItem from "./DatabaseItem";

import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const flexSpaceBetween = { display: "flex", justifyContent: "space-between" };

export default function DatabaseList(props) {

  const [error, setError] = useState(null);
  const handleLoadDatabase = async (id) => {
    const { loadDatabaseHandler, closeHandler } = props;

    let fileBuffer;

    // Try to fetch the database from the server.
    try {
      fileBuffer = await loadDatabase(id);

      // Load the database into the client.
      loadDatabaseHandler(new Uint8Array(fileBuffer));

      return closeHandler();
    } catch (response) {
      const error = await response.text();
      setError(error);
    }
  };

  const handleDeleteDatabase = async (id) => {
    // Try to delete the database from the server.
    try {
      await deleteDatabase(id);

      // Refresh the database list so the newly deleted databases goes.
      // This could be replaced with a client-side removal of the node, if you're a stickler for optimization.
      return props.refreshSavedDatabaseList();
    } catch (response) {
      const error = await response.text();
      setError(error);
    }
  };

  const handleClose = () => props.closeHandler();

  const { list } = props;

  return (
    <React.Fragment>
      <DialogTitle id="dialog-title">
        <div style={flexSpaceBetween}>
          Saved Databases
          <Button
            component={Link}
            to="/database/save"
            color="primary"
            variant="contained"
            size="small"
          >
            Save &raquo;
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
          Allows you to save your current database in a more <em>permanent</em>{" "}
          location, on the server.
        </DialogContentText>
      </DialogContent>

      <List>
        {list && list.length ? (
          list.map((database) => (
            <DatabaseItem
              key={database._id}
              database={database}
              clickHandler={handleLoadDatabase}
              deleteHandler={handleDeleteDatabase}
            />
          ))
        ) : (
          <ListItem disabled>
            <ListItemText>No saved databases yet!</ListItemText>
          </ListItem>
        )}
      </List>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}
