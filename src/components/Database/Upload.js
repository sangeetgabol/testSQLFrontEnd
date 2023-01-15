import React from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import UserContext from "../Auth/Context";

const displayNone = { display: "none" };

function UploadDatabase(props) {
  const handleUpload = (e) => {
    const files = e.target.files;

   
    // No file selected, return
    if (files.length === 0) return false;

    const [file] = files;
    console.log(file);
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const typedArray = new Uint8Array(fileReader.result);

      // Run the submit handler from the parent component
      props.uploadDatabaseHandler(typedArray);
    };

    // Tell the file reader to read the selected file as an array buffer
    fileReader.readAsArrayBuffer(file);

    // Reset the import back to blank so in theory could re-upload the same file
    e.target.value = "";
    window.location.reload();
  };

  return (
    <UserContext.Consumer>
      {({ user, isLoaded }) =>
        isLoaded &&
        (user && user.group ? (
          <Tooltip title="Disabled while in a group">
            <span>
              <IconButton
                component="span"
                aria-label="Upload Database"
                disabled
              >
                <CloudUploadIcon />
              </IconButton>
            </span>
          </Tooltip>
        ) : (
          <React.Fragment>
            <Tooltip title="Upload Database">
              <label>
                <IconButton component="span" aria-label="Upload Database">
                  <CloudUploadIcon />
                </IconButton>
                <input
                  accept=".db,.sqlite"
                  onChange={handleUpload}
                  style={displayNone}
                  type="file"
                />
              </label>
            </Tooltip>
          </React.Fragment>
        ))
      }
    </UserContext.Consumer>
  );
}

export default UploadDatabase;
