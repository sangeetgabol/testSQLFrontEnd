const buildQuestions = async (database, availableQuestions) =>
  new Promise((resolve) => {
    // Setup the caching.
    window.questionCache = {};

    return import("../index").then(({ default: allQuestions }) => {
      // console.log(allQuestions);
      // console.log(allQuestions);
      const questions = allQuestions.reduce((acc, cur, i) => {
        // If the current index is included in the array.
        if (availableQuestions && availableQuestions.indexOf(i) === -1) {
          return acc;
        }

        const { build } = cur;
        // const table = localStorage.getItem("name");

        // console.log(table);
        // console.log(database);
        try {
          const { question, answer } = build(database);
          // console.log(question);
          // console.log(answer);
          acc.push({ index: i, ...cur, question, answer });

          return acc;
        } catch (Error) {
          // Mark as error question, tried twice can't generate this question.
          acc.push({
            ...cur,
            question: `Error: ${Error.message}`,
            answer: null,
            error: true,
          });

          return acc;
        }
      }, []);
      console.log(questions);
      return resolve(questions);
    });
  });

export default buildQuestions;
