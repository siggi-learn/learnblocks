import classNames from "classnames"
import * as React from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { ShortTextAnswerPresenterAtoms } from "../types"

const ButtonAtom: ShortTextAnswerPresenterAtoms["button"] = ({
  disabled,
  isCorrect,
  feedbackDisabled,
  status,
}) => {
  let caption = "Check"
  if (status === "staged") caption = "Next"
  if (status === "commited") caption = "Done"
  const variant =
    status !== "initial" && !isCorrect && !feedbackDisabled
      ? "danger"
      : "success"

  return (
    <Button
      type="submit"
      disabled={status === "commited" || disabled}
      variant={variant}
      className="w-100"
    >
      {caption}
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
    className={classNames("mt-2 text-right", {
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
  button: ButtonAtom,
  feedback: FeedbackAtom,
  form: FormAtom,
  textInput: TextInputAtom,
}
