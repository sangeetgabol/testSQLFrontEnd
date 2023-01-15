import getTables from "./utils/getTables";
import getColumns from "./utils/getColumns";

const createIndex = {
  set: "Hard",
  build: (db) => {
    const tables = getTables(db, 1);

    const [{ table, column }] = getColumns(db, tables);

    return {
      question: `Create Index on column **${column}**'s of table **${table}**`,
      answer: `CREATE INDEX index_name ON ${table} (${column})`,
    };
  },
};

export default createIndex;
