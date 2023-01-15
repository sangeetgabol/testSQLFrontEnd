import React, { useEffect, useState } from "react";

import { marked } from "marked";

import { withStyles } from "@material-ui/core/styles";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import StepLabel from "@material-ui/core/StepLabel";

import Typography from "@material-ui/core/Typography";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import Divider from "@material-ui/core/Divider";

import Button from "@material-ui/core/Button";

import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";
import Hidden from "@material-ui/core/Hidden";
import { ConstructionOutlined } from "@mui/icons-material";

const styles = (theme) => ({
  innerPadding: {
    padding: theme.spacing(2),
    overflow: "auto",
  },
  stepperButton: {
    padding: theme.spacing(1),
    margin: -theme.spacing(1),
  },
  stepperLabel: {
    padding: 0,
  },
  completedStep: {
    color: "green !important",
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
  previousButton: {
    marginRight: theme.spacing(1),
  },
  SkipButton: {
    marginRight: theme.spacing(1),
  },
  bottomActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
});
let prevProp;
function QuestionManager(props) {
  const [allSetNames, setAllSetNames] = useState([]);
  const [activeSet, setactiveSet] = useState(null);
  const [activeQuestionSet, setActiveQuestionSet] = useState(null);
  const [countNext, setCountNext] = useState(0);
  const [countPrev, setCountPrev] = useState(0);
  useEffect(() => {
    const { allQuestions } = props;

    const allSetNames = [
      ...new Set(allQuestions.map((question) => question.set)),
    ];

    const activeSet = allSetNames[0];

    const activeQuestionSet = [
      ...allQuestions.filter((question) => question.set === activeSet),
    ];
    const countPrev = 0;
    setAllSetNames(allSetNames);
    setactiveSet(activeSet);
    setActiveQuestionSet(activeQuestionSet);
    setCountPrev(countPrev);
  }, []);

  const handleNext = () => {
    const activeQuestionIndex =
      props.allQuestions[props.activeQuestionIndex].index;
    console.log("active index", activeQuestionIndex);
    console.log("total data", activeQuestionSet.length);

    const next = activeQuestionIndex + 1;
    console.log("current value", next);

    const allQuestionsIndex = next;

    console.log(activeQuestionSet[activeQuestionIndex]?.completed);
    console.log("final index", allQuestionsIndex);
    props.changeQuestionHandler(allQuestionsIndex);
    setCountNext(countNext + 1);
    setCountPrev(countPrev + 1);
  };

  const handlePrev = () => {
    const activeQuestionIndex =
      props.allQuestions[props.activeQuestionIndex].index;

    const prevIndex = activeQuestionIndex - 1;

    const prev = prevIndex < 0 ? activeQuestionSet.length - 1 : prevIndex;

    const allQuestionsIndex = prevIndex;

    props.changeQuestionHandler(allQuestionsIndex);
    setCountNext(countNext - 1);
    setCountPrev(countPrev - 1);
  };

  const handleQuestionChange = (index) => () => {
    props.changeQuestionHandler(index);
  };

  const handleSetChange = (event) => {
    const set = event.target.value;
    console.log(set);

    if (set === props.activeSet) return;

    const { allQuestions } = props;

    const activeQuestionSet = [
      ...allQuestions.filter((question) => question.set === set),
    ];
    console.log(activeQuestionSet);

    if (activeQuestionSet.length === 0) return;

    props.changeQuestionHandler(activeQuestionSet[0].index);

    const activeSet = set;
    const countNext = 0;
    const countPrev = 0;
    console.log(activeSet);
    setActiveQuestionSet(activeQuestionSet);
    setactiveSet(activeSet);
    setCountPrev(countPrev);
    setCountNext(countNext);
  };

  async function fetchData(prevProps) {
    const activeQuestion = props.allQuestions[props?.activeQuestionIndex];

    const activeQuestionSet = [
      ...props.allQuestions.filter((question) => question.set === activeSet),
    ];
    setActiveQuestionSet(activeQuestionSet);

    if (props.allQuestions && activeSet !== activeQuestion.set) {
      if (allSetNames.includes(activeQuestion.set) === false) {
        const allSetNames = [
          ...new Set(props.allQuestions.map((question) => question.set)),
        ];
        setAllSetNames(allSetNames);
      }

      const activeSet = activeQuestion.set;

      const activeQuestionSet = [
        ...props.allQuestions.filter((question) => question.set === activeSet),
      ];
      setactiveSet(activeSet);
      setActiveQuestionSet(activeQuestionSet);
    }
  }
  useEffect(() => {
    fetchData();
    console.log("www");
  }, [props.val, countNext, countPrev]);

  if (!activeSet) {
    return <div>Dividing the questions by their sets.</div>;
  }

  const { classes, allQuestions, activeQuestionIndex } = props;

  const activeQuestion = allQuestions[activeQuestionIndex];

  const activeStep = activeQuestionSet.indexOf(activeQuestion);
  console.log("active", activeStep);

  return (
    <React.Fragment>
      {activeQuestionSet && (
        <Stepper
          activeStep={activeStep}
          className={classes.innerPadding}
          nonLinear
        >
          {activeQuestionSet.map((question) => (
            <Step key={question.index}>
              <StepButton
                className={classes.stepperButton}
                aria-label={`Question #${question.index}`}
                onClick={handleQuestionChange(question.index)}
                completed={Boolean(question.completed)}
              >
                <StepLabel
                  classes={{
                    iconContainer: classes.stepperLabel,
                  }}
                  StepIconProps={{
                    classes: {
                      active: classes.activeStep,
                      completed: classes.completedStep,
                    },
                  }}
                  error={Boolean(question.error)}
                />
              </StepButton>
            </Step>
          ))}
        </Stepper>
      )}
      <Divider />
      <div className={classes.innerPadding}>
        {activeQuestion && (
          <Typography
            variant="subtitle1"
            component="div"
            color={activeQuestion.error ? "error" : "inherit"}
            dangerouslySetInnerHTML={{
              __html: marked(activeQuestion.question),
            }}
            gutterBottom
          />
        )}
        <div className={classes.bottomActions}>
          {activeSet && (
            <div>
              <Select value={activeSet} onChange={handleSetChange}>
                {allSetNames.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
          <div>
            {console.log("countPrev", countPrev)}
            <Button
              className={classes.previousButton}
              variant="contained"
              size="small"
              disabled={countPrev === 0 ? true : false}
              aria-label="Previous question"
              onClick={handlePrev}
            >
              <KeyboardArrowLeftIcon />
              <Hidden xsDown implementation="css">
                Previous
              </Hidden>
            </Button>
            {console.log("countnext", countNext)}
            {console.log("totalQues", activeQuestionSet.length)}
            <Button
              className={classes.SkipButton}
              variant="contained"
              size="small"
              color="primary"
              aria-label="Next question"
              onClick={handleNext}
              disabled={
                countNext === activeQuestionSet.length - 1 ? true : false
              }
            >
              <Hidden xsDown implementation="css">
                Skip
              </Hidden>
              <KeyboardArrowRightIcon />
            </Button>

            <Button
              className={classes.nextButton}
              variant="contained"
              size="small"
              color="primary"
              aria-label="Next question"
              disabled={
                Boolean(activeQuestionSet[activeQuestionIndex]?.completed) ===
                false
                  ? true
                  : false
              }
              onClick={handleNext}
            >
              <Hidden xsDown implementation="css">
                Next
              </Hidden>
              <KeyboardArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withStyles(styles)(QuestionManager);
