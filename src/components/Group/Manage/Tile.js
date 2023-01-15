import React from "react";

import Typography from "@material-ui/core/Typography";

import { Paper } from "@material-ui/core";

import "./manageGroup.css";

const flexSpaceBetween = { display: "flex", justifyContent: "space-between" };

const style = {
  closeButton: { marginRight: 16 },
  flex: { flex: 1 },
};

export default function Tile(props) {
  // render() {
  const { number, title, color, backgroundColor } = props;

  return (
    <Paper elevation={2} className="tile" style={{ backgroundColor }}>
      <div className="content">
        <Typography variant="h1" style={{ color }}>
          {number}
        </Typography>
        <Typography variant="h6">{title}</Typography>
      </div>
    </Paper>
  );
}
