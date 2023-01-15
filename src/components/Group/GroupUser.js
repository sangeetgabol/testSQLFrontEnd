import React from "react";

import IconButton from "@material-ui/core/IconButton";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import PersonRemoveAlt1OutlinedIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import Typography from "@material-ui/core/Typography";

import Red from "@material-ui/core/colors/red";
import Green from "@material-ui/core/colors/green";

const styles = {
  smallButton: { padding: 6 },
};

export default function GroupUser (props) {
 const handleRemoveUser = () => props.removeHandler(props.user._id);

    const { user, dense } = props;

    const {
      username,
      active,
      totalQuestions,
      questionsCompleted,
      canRemove,
      updatedAt,
    } = user;

    const lastActive = new Date(updatedAt).toLocaleString("en-GB");

    const percentage = Math.round((questionsCompleted / totalQuestions) * 100);

    const colorCodedAverageText =
      percentage < 20 ? Red[500] : percentage > 80 ? Green[500] : "inherit";

    return (
      <ListItem divider dense>
        <Typography
          style={{ color: colorCodedAverageText }}
          title={`${username} has completed ${percentage}% (${questionsCompleted}/${totalQuestions}) of the questions.`}
        >{`${percentage}%`}</Typography>
        <ListItemText
          inset
          primary={username}
          secondary={active ? "Active" : `Last active ${lastActive}`}
        />
        {canRemove && (
          <ListItemSecondaryAction>
            <IconButton
              style={(dense && styles.smallButton) || {}}
              color="secondary"
              onClick={handleRemoveUser}
              aria-label="Remove User from the group"
            >
              <PersonRemoveAlt1OutlinedIcon fontSize="small" />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }

