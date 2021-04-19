import classNames from "classnames"
import { uniqueId } from "lodash"
import * as React from "react"
import { Button, Form } from "react-bootstrap"
import { ChoicePresenterAtoms } from "../types"

const FormAtom: ChoicePresenterAtoms["form"] = (props) => <Form {...props} />

const FeedbackAtom: ChoicePresenterAtoms["feedback"] = ({
  feedbackIsVisible,
  isCorrect,
  remainingSelections,
}) => {
  let message = "Select one or multiple options"

  if (feedbackIsVisible) {
    message = isCorrect ? "Yeeees 💪" : "Noooo 🙈"
  } else if (remainingSelections !== null) {
    if (remainingSelections === 0) message = "Submit your answer"
    else if (remainingSelections > 0)
      message = `Choose ${Math.abs(remainingSelections)} more`
    else message = `Choose ${Math.abs(remainingSelections)} less`
  }

  return <span className="font-italic">{message}</span>
}

const OptionAtom: ChoicePresenterAtoms["option"] = ({
  content,
  isCorrect,
  isSelected,
  feedbackIsVisible,
  onClick,
}) => {
  const { current: id } = React.useRef(uniqueId("option-"))
  const correctlySelected = isCorrect === isSelected
  const classes = classNames({
    "text-success": feedbackIsVisible && correctlySelected,
    "text-danger": feedbackIsVisible && !correctlySelected,
  })
  return (
    <div className="py-1">
      <Form.Check id={id} type="checkbox">
        <Form.Check.Input
          checked={isSelected}
          disabled={feedbackIsVisible}
          readOnly
          onClick={onClick}
        />
        <Form.Check.Label className={classes}>{content}</Form.Check.Label>
        <span aria-label="Correctly Selected" className="font-weight-bold">
          {feedbackIsVisible && correctlySelected && " ✓"}
        </span>
      </Form.Check>
    </div>
  )
}

const SubmitButtonAtom: ChoicePresenterAtoms["submitButton"] = ({
  disabled,
  isCorrect,
  feedbackIsVisible,
  status,
}) => {
  const variant = feedbackIsVisible && !isCorrect ? "danger" : "success"

  let caption = "Check"
  if (status === "staged") caption = "Next"
  if (status === "commited") caption = "Done"

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

export const choicePresenterAtoms: ChoicePresenterAtoms = {
  as: "div",
  feedback: FeedbackAtom,
  form: FormAtom,
  option: OptionAtom,
  submitButton: SubmitButtonAtom,
}
