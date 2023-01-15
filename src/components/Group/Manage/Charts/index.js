import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import BarChartIcon from "@material-ui/icons/BarChart";
import PieChartIcon from "@material-ui/icons/PieChart";
import ScatterChartIcon from "@material-ui/icons/ShowChart";
import TreemapIcon from "@material-ui/icons/ViewQuilt";

import BarChart from "./BarChart";
import ScatterChartContainer from "./ScatterChart";
import PieChart from "./PieChart";
import Treemap from "./Treemap";

export default function ChartManager(props) {
  // state = {
  //   index: 0
  // };
  const [index, setIndex] = useState(0);
  const handleChange = (element, value) => setIndex(value);

  // render() {
  // const { index } = this.state;

  const { questionMetrics, setMetrics, users } = props;

  return (
    <div>
      {index === 0 && <BarChart data={users} />}
      {index === 1 && <ScatterChartContainer data={questionMetrics} />}
      {index === 2 && <PieChart data={setMetrics} />}
      {index === 3 && <Treemap data={questionMetrics} />}
      <Tabs
        value={index}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        scrollButtons="auto"
        variant="scrollable"
      >
        <Tab icon={<BarChartIcon />} />
        <Tab icon={<ScatterChartIcon />} />
        <Tab icon={<PieChartIcon />} />
        <Tab icon={<TreemapIcon />} />
      </Tabs>
    </div>
  );
}
