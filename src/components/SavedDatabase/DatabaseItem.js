import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DatabaseItem(props) {
  const handleClick = () => props.clickHandler(props.database._id);

  const handleDelete = () => props.deleteHandler(props.database._id);

  const { title, createdAt } = props.database;

  const date = new Date(createdAt).toDateString();

  return (
    <ListItem onClick={handleClick} button>
      <ListItemText primary={title} secondary={date} />
      {props.deleteHandler && (
        <ListItemSecondaryAction onClick={handleDelete}>
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
}
