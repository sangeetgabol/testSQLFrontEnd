import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";

import SchemaItem from "./Item";

function Schema(props) {

  const [schema, setSchema] = useState(null);
  useEffect(() => {
    load();
  }, []);
 
  const load = () => {
    const sql = 'SELECT `tbl_name` FROM `sqlite_master` WHERE `type` = "table"';

    // Destructure the response to get only the values (the real schema data).
    let [{ values: tableNames }] = props.currentDatabase.exec(sql);

    const schema = tableNames.map(([tableName]) => {
      // Extra the row count from each table.
      // Expensive operation!
      const [
        {
          values: [[count]],
        },
      ] = props.currentDatabase.exec(`SELECT COUNT(*) FROM ${tableName}`);

      return {
        name: tableName,
        count,
      };
    });
    setSchema(schema);
  };

  if (!schema) {
    return <div>Loading...</div>;
  }

  const { showSchemaHandler } = props;

  return (
    <React.Fragment>
      <Typography
        component="h3"
        variant="body1"
        color="textSecondary"
        align="center"
        gutterBottom
      >
        Database Schema
      </Typography>
      <List dense>
        {schema.map(({ name, count }) => (
          <SchemaItem
            key={name}
            name={name}
            count={count}
            showSchemaHandler={showSchemaHandler}
          />
        ))}
      </List>
    </React.Fragment>
  );
}

export default Schema;
