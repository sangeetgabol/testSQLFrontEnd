import React from "react";

import IconButton from "@material-ui/core/IconButton";
import Swal from "sweetalert2";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
import { deleteGroup } from "./API";
import { Link } from "react-router-dom";

const styles = {
  progress: { flex: "0 0 40px" },
  smallButton: { padding: 6 },
};

export default function GroupItem(props) {
  const handleJoinGroup = () => props.joinGroupHandler(props.group._id);

  const handleLeaveGroup = () => props.leaveGroupHandler();
  const deleteGroupFrom = async () => {
    try {
      deleteGroup(props.group._id);
      props.closeHandler();
      Swal.fire({
        text: "Group Deleted Successfully",
        icon: "success",
        position: "bottom-end",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (response) {
      const error = await response;
    }
  };

  const { group, dense } = props;

  const {
    _id: id,
    title,
    completedQuestions = "-",
    totalQuestions = "-",
    canManage,
    isCurrent,
  } = group;

  return (
    <ListItem
      onClick={handleJoinGroup}
      disabled={isCurrent}
      selected={isCurrent}
      component="li"
      button
    >
      <Typography
        color="textSecondary"
        style={styles.progress}
        title={`You have completed ${completedQuestions} out of ${totalQuestions} questions in this group.`}
      >
        {`${completedQuestions}/${totalQuestions}`}
      </Typography>
      <ListItemText primary={title} />
      <ListItemSecondaryAction>
        <IconButton
          style={(dense && styles.smallButton) || {}}
          component={Link}
          to={`/group/manage/${id}/${title}`}
          title="Manage this group"
          aria-label="Manage group"
        >
          <SettingsIcon fontSize="small" />
        </IconButton>
   
        <IconButton
          style={(dense && styles.smallButton) || {}}
          color="secondary"
          onClick={handleLeaveGroup}
          title="Leave this group"
          aria-label="Leave current group"
        >
          <ExitToAppIcon fontSize="small" />
        </IconButton>
        <IconButton
          style={(dense && styles.smallButton) || {}}
          // color="secondary"
          onClick={deleteGroupFrom}
          title="Delete this group"
          aria-label="Delete current group"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
//}
