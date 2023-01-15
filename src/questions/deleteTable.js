import getTables from "./utils/getTables";

const deleteTable = {
  set: "Hard",

  build: (db) => {
    let [table] = getTables(db, 1);

    return {
      question: `Delete all data from **${table}**`,
      answer: `DELETE FROM ${table}`,
    };
  },
};

export default deleteTable;
