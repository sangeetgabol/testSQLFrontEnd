import React from "react";

import BarChart from "./BarChart";
import PieChart from "./PieChart";
import Treemap from "./Treemap";
import { Grid } from "@material-ui/core";

export default function ChartManager(props) {
  // render() {
  // const { questionMetrics, setMetrics, users } = props;

  return (
    <Grid container>
      <Grid item xs={12}>
        <BarChart data={props.users} />
      </Grid>
      <Grid item xs={12} sm={6} xl={3}>
        <PieChart data={props.setMetrics} />
      </Grid>
      <Grid item xs={12} sm={6} xl={3}>
        <Treemap data={props.questionMetrics} />
      </Grid>
    </Grid>
  );
}
