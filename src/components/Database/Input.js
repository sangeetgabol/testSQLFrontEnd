import React, { useState } from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

import AceEditor from "react-ace";

import "brace/mode/sql";
import "brace/theme/tomorrow";

const styles = (theme) => ({
  button: {
    marginRight: 8,
    marginTop: 8,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  iconSmall: {
    fontSize: 20,
  },
  codemirror: {
    border: `1px solid ${theme.palette.grey[100]}`,
  },
});

function DatabaseInput({ submitHandler, classes }) {

  const [statement, setStatement] = useState("");
  const handleChange = (statement) => setStatement(statement);

  const handleClear = () => setStatement("");

  const handleSubmit = () => submitHandler(statement);

  return (
    <React.Fragment>
      <AceEditor
        mode="sql"
        theme="tomorrow"
        showPrintMargin={false}
        focus
        height="9rem"
        width="100%"
        onChange={handleChange}
        value={statement}
        wrapEnabled
      />

      <Button
        className={classes.button}
        size="small"
        variant="contained"
        color="primary"
        aria-label="Test"
        onClick={handleSubmit}
      >
        Test
        <DoneIcon className={classes.rightIcon} />
      </Button>
      <Button
        className={classes.button}
        size="small"
        variant="contained"
        color="secondary"
        aria-label="Clear"
        onClick={handleClear}
      >
        Clear
        <ClearIcon className={classes.rightIcon} />
      </Button>
    </React.Fragment>
  );
}

DatabaseInput.propTypes = {
  submitHandler: PropTypes.func,
};

export default withStyles(styles)(DatabaseInput);
