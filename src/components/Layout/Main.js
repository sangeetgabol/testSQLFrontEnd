import React, { useEffect, useState } from "react";

import Section from "./Section";
import Question from "../Question";

import OutputTable from "../Database/Output";

import Feedback from "../Feedback";

import checkAnswer from "../Question/answer";

import { saveProgress } from "../Group/API";

import buildQuestions from "../../questions/utils/buildQuestions";
import saveQuestions from "../../questions/utils/saveQuestions";

import InputForm from "../Database/Input";

import { withStyles } from "@material-ui/core/styles";
let userData = "";
const styles = (theme) => ({
  containerStyle: {
    flexGrow: 1,
    height: "100%",
    flexDirection: "column",
    display: "flex",
    overflow: "auto",
  },
  innerContainerStyle: {
    overflow: "auto",
  },
  // Necessary for content to be below app bar.
  toolbar: theme.mixins.toolbar,
});

function Main(props) {
 
  const [feedback, setFeedback] = useState(null);
  const [val, setVal] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [allQuestions, setAllQuestions] = useState(null);
  const changeFeedback = (feedback) =>
    setFeedback({
      feedback: { ...feedback, timestamp: new Date().getTime() },
    });
  console.log(feedback, "d");
 
  useEffect(() => {
    userData = JSON.parse(localStorage.getItem("user"));

    getQuestions();
  }, []);
  const getQuestions = async () => {
    let allQuestions;


    const group = (userData && userData.group) || null;

    // Has the group already have generated questions.
    // Joining a group SHOULD remove all questions so they are rebuilt with the new group database.
    if (group && group.questions && group.questions.length > 0) {
      allQuestions = group.questions;
    } else {
      // Check the localStorage for any cached question sets
      const cachedQuestions = localStorage.getItem("__testSQL_Questions__");

      if (cachedQuestions && !group) {
        // Cached questions, and the user is not in a group.
        allQuestions = JSON.parse(cachedQuestions);
      } else {
        // Cached questions, but the user is in a group that doesn't have questions.
        // Rebuild the questions for this group.
        allQuestions = await buildQuestions(props.currentDatabase);

        // No group, no cache, so the questions got built, now save them locally.
        saveQuestions(allQuestions);
      }

      // If the user has no saved questions, then send all the generated questions up to the server.
      // If the user is in a group. Save the progress.
      if (group) {
        saveProgress(allQuestions);
      }
    }

    return setAllQuestions(allQuestions);
  };

  const changeQuestion = (index) => setActiveQuestionIndex(index);

  const runQuery = async (sql) => {
    console.log(props);
   
    let results = [];

    try {
      const output = props.currentDatabase.exec(sql);
      console.log(output);

      // Check if any database actions were ran, if so only update the database.
      if (props.currentDatabase.getRowsModified()) {
        props.loadDatabase(props.currentDatabase);
      } else {
        results = output;
      }

      if (
        checkAnswer(
          props.currentDatabase,
          sql,
          allQuestions[activeQuestionIndex]
        )
      ) {
        const updatedAllQuestions = await completeCurrentQuestion(sql);

        if (userData) {
          saveProgress(updatedAllQuestions);
        } else {
          saveQuestions(updatedAllQuestions, props.user);
          saveProgress(updatedAllQuestions);
        }
      }
    } catch (Error) {
      changeFeedback({ message: Error.message, variant: "error" });
    }
    setVal(!val);
    // Update the results array in the Container component.
    props.updateResultsHandler(results);
  };

  const completeCurrentQuestion = (sql) => {
    
    changeFeedback({ message: "Correct Answer", variant: "success" });

    const activeQuestion = allQuestions[activeQuestionIndex];

    // Create a copy of the original question set and update the completed flag of the active question.
    // Immutable \o/.
    const updatedAllQuestions = allQuestions.map((question) => {
      if (Object.is(question, activeQuestion)) {
        return { ...question, completed: true };
      }

      return question;
    });
    setAllQuestions(updatedAllQuestions);

    return updatedAllQuestions;
  };
  console.log("dd", val);

  return (
    <main className={props.classes.containerStyle}>
      <div className={props.classes.toolbar} />
      <div className={props.classes.innerContainerStyle}>
        <Section title="Questions">
          {allQuestions && (
            <Question
              activeQuestionIndex={activeQuestionIndex}
              allQuestions={allQuestions}
              changeQuestionHandler={changeQuestion}
              val={val}
              setVal={setVal}
            />
          )}
        </Section>

        <Section title="Statement" padding="16px">
          <InputForm submitHandler={runQuery} />
        </Section>

        {props.results.map((result, i) => (
          <Section title="Results" key={i} padding="16px">
            <OutputTable columns={result.columns} values={result.values} />
          </Section>
        ))}
        <Feedback {...feedback} changeHandler={changeFeedback} />
      </div>
    </main>
  );
}

export default withStyles(styles)(Main);
