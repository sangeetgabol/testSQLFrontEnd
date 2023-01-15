import getTables from "./utils/getTables";
import getColumns from "./utils/getColumns";
import getRandomInt from "lodash/random";


const fetchNext = {
  set: "Hard",
  build: (db) => {
    const tables = getTables(db);

    const [{ table, column: column_1 }] = getColumns(db, tables, 1, "INTEGER");
    const randomInt = getRandomInt(2, 4);

    return {
      question: `Skip the first ${randomInt} **${table}** with the highest **${column_1}**, and fetches the next  ${randomInt} ones.`,
      answer: `SELECT * FROM ${table} ORDER BY ${column_1} DESC OFFSET ${randomInt} ROWS
      FETCH NEXT ${randomInt} ROWS ONLY`,
    };
  },
};

export default fetchNext;
