import { uniqueId } from "lodash"
import * as React from "react"
import { ChoicePresenterAtoms } from "../types"

const FormAtom: ChoicePresenterAtoms["form"] = (props) => <form {...props} />

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

  return (
    <div className="py-1">
      <input
        id={id}
        type="checkbox"
        checked={isSelected}
        disabled={disabled}
        readOnly
        onClick={onClick}
      />
      <label htmlFor={id}>{content}</label>
      <span aria-label="Correctly Selected" className="font-weight-bold">
        {feedbackIsVisible && correctlySelected && " ✓"}
      </span>
    </div>
  )
}

const StageButtonAtom: ChoicePresenterAtoms["stageButton"] = ({ disabled }) => (
  <button type="submit" disabled={disabled} className="w-100">
    Check my Answer
  </button>
)

const CommitButtonAtom: ChoicePresenterAtoms["commitButton"] = ({
  disabled,
  feedbackIsVisible,
  isCorrect,
}) => {
  let message = "Commit"
  if (feedbackIsVisible) {
    message = isCorrect ? "Nice" : "Awwww"
  }

  return (
    <button type="submit" disabled={disabled} className="w-100">
      {message}
    </button>
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
