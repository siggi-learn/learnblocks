import classNames from "classnames"
import { uniqueId } from "lodash"
import * as React from "react"
import { Button, Form } from "react-bootstrap"
import { ChoicePresenterAtoms } from "../types"

const FormAtom: ChoicePresenterAtoms["form"] = (props) => <Form {...props} />

const FeedbackAtom: ChoicePresenterAtoms["feedback"] = ({
  feedbackIsVisible,
  isCorrect,
  totalCorrectSelections,
  remainingSelections,
}) => {
  let message = "Select one or multiple options"

  if (feedbackIsVisible) {
    message = isCorrect ? "Yeeees 💪" : "Noooo 🙈"
  } else if (totalCorrectSelections !== null && remainingSelections !== null) {
    if (remainingSelections === 0) message = "Submit your answer"
    else if (remainingSelections === totalCorrectSelections)
      message = `Choose ${Math.abs(remainingSelections)}`
    else if (remainingSelections > 0)
      message = `Choose ${Math.abs(remainingSelections)} more`
    else message = `Choose ${Math.abs(remainingSelections)} less`
  }

  return <span className="font-italic">{message}</span>
}

const OptionAtom: ChoicePresenterAtoms["option"] = ({
  content,
  disabled,
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
          disabled={disabled}
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

const StageButtonAtom: ChoicePresenterAtoms["stageButton"] = ({ disabled }) => (
  <Button type="submit" disabled={disabled} variant="success" className="w-100">
    Check my Answer
  </Button>
)

const CommitButtonAtom: ChoicePresenterAtoms["commitButton"] = ({
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

export const choicePresenterAtoms: ChoicePresenterAtoms = {
  as: "div",
  feedback: React.memo(FeedbackAtom),
  form: React.memo(FormAtom),
  option: React.memo(OptionAtom),
  stageButton: React.memo(StageButtonAtom),
  commitButton: React.memo(CommitButtonAtom),
}
