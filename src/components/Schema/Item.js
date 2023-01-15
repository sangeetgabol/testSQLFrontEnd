import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

function SchemaItem(props) {
  const handleClick = () => props.showSchemaHandler(props.name);
  return (
    <ListItem>
      <ListItemText primary={props.name} />
      <ListItemSecondaryAction>
        <ListItemText secondary={props.count} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default SchemaItem;
