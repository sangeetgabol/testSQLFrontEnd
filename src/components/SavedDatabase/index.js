import React, { Suspense, useState } from "react";

import IconButton from "@mui/material/IconButton";
import StorageIcon from "@mui/icons-material/Storage";

import Tooltip from "@material-ui/core/Tooltip";

const LoadableDatabaseManager = React.lazy(() =>
  import("./DatabaseManager" /* webpackChunkName: "saved-databases" */)
);

export default function SavedDatabase(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const { currentDatabase, loadDatabaseHandler, disabled } = props;

  if (disabled) {
    return (
      <Tooltip title="Disabled while in a group">
        <span style={{ display: "inline-block" }}>
          <IconButton
            color="inherit"
            aria-label="Saved Database Actions"
            disabled
          >
            <StorageIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    );
  }

  return (
    <React.Fragment>
      <Tooltip title="Saved Databases">
        <span style={{ display: "inline-block" }}>
          <IconButton
            onClick={handleOpen}
            color="inherit"
            aria-label="Saved Database Actions"
          >
            <StorageIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
      {open && (
        <Suspense fallback={<div>Loading...</div>}>
          <LoadableDatabaseManager
            closeHandler={handleClose}
            currentDatabase={currentDatabase}
            loadDatabaseHandler={loadDatabaseHandler}
          />
        </Suspense>
      )}
    </React.Fragment>
  );
}
