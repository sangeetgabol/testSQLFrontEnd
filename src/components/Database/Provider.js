/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

// import initSqlJs from "sql.js/dist/sql-wasm";

import initSqlJs from "sql.js";

// Required to let webpack 4 know it needs to copy the wasm file to our assets
// eslint-disable-next-line import/no-webpack-loader-syntax
// import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";

import getDatabase from "./utils/getDatabase";
import saveDatabase from "./utils/saveDatabase";

import DatabaseContext from "./Context";
import file from "../../sql-wasm.wasm";
// const initSqlJs = window.initSqlJs;

export default function Provider(props) {
  const loadDatabase = async (typedArray) => {
    console.log("again", typedArray);
    const SQL = await initSqlJs({
      locateFile: () => file,
    });
    console.log(SQL);
    // Create a new SQL object
    const database = new SQL.Database(typedArray);
    console.log(database);
    database.lastModified = Date.now();
   
    // Save the database in the cache, for persistence without reliance of the server.
    saveDatabase(database);

    return setDatabase(database);
  };
  const [database, setDatabase] = useState(null);

  const state = {
    database: database,
    loadDatabase: loadDatabase,
  };

  useEffect(async () => {
    const database = await getDatabase("");
    loadDatabase(database);
  }, []);

  return (
    <DatabaseContext.Provider value={state}>
      {props.children}
    </DatabaseContext.Provider>
  );
}
