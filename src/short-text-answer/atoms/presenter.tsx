import classNames from "classnames"
import * as React from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { ShortTextAnswerPresenterAtoms } from "../types"

const StageButtonAtom: ShortTextAnswerPresenterAtoms["stageButton"] = ({
  disabled,
}) => (
  <Button type="submit" disabled={disabled} variant="success" className="w-100">
    Check my Answer
  </Button>
)

const CommitButtonAtom: ShortTextAnswerPresenterAtoms["commitButton"] = ({
  disabled,
  feedbackIsVisible,
  isCorrect,
}) => {
  const variant = feedbackIsVisible && !isCorrect ? "danger" : "success"

  return (
    <Button
      type="submit"
      disabled={disabled}
      variant={variant}
      className="w-100"
    >
      Commit
    </Button>
  )
}

const FormAtom: ShortTextAnswerPresenterAtoms["form"] = (props) => (
  <Form {...props} />
)

const FeedbackAtom: ShortTextAnswerPresenterAtoms["feedback"] = ({
  block,
  state,
}) => (
  <div
    className={classNames("my-2", {
      invisible: state.status === "initial",
    })}
  >
    {state.withTypo && `You meant "${state.matchedAnswer}"? `}
    {state.isCorrect ? "Correct 🎉" : "Wrong 😖"}
    {!state.isSampleSolution &&
      `The sample solution is: ${block.correctAnswers[0]}`}
  </div>
)

const TextInputAtom: ShortTextAnswerPresenterAtoms["textInput"] = ({
  defaultValue,
  dontKnowEnabled,
  manualCorrectEnabled,
  onChange,
  handleDontKnow,
  handleManualCorrect,
  status,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.currentTarget.value)

  return (
    <Row className="mb-2">
      <Col>
        <Form.Control
          type="text"
          defaultValue={defaultValue}
          disabled={status !== "initial"}
          placeholder="Your answer"
          onChange={handleChange}
        />
      </Col>
      {(dontKnowEnabled || manualCorrectEnabled) && (
        <Col md={4}>
          {dontKnowEnabled && (
            <Button
              onClick={handleDontKnow}
              variant="outline-warning"
              className="w-100"
            >
              Dunno
              <span role="img" aria-label="thinking">
                🤔
              </span>
            </Button>
          )}
          {manualCorrectEnabled && (
            <Button
              onClick={handleManualCorrect}
              variant="dark"
              className="w-100"
            >
              Was correct
            </Button>
          )}
        </Col>
      )}
    </Row>
  )
}

export const shortTextAnswerPresenterAtoms: ShortTextAnswerPresenterAtoms = {
  as: "div",
  feedback: FeedbackAtom,
  form: FormAtom,
  textInput: TextInputAtom,
  stageButton: StageButtonAtom,
  commitButton: CommitButtonAtom,
}
