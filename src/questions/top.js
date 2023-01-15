import getTables from "./utils/getTables";
import getRandomInt from "lodash/random";


const top = {
  set: "Hard",

  build: (db) => {
    let [table] = getTables(db, 1);
        // Get a random limit number between 1-4
    const randomInt = getRandomInt(1, 4);

    return {
      question: `Display first ${randomInt} **${table}**`,
      answer: `SELECT top 3 * FROM ${table}`,
    };
  },
};

export default top;
