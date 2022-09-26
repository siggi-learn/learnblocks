import classNames from "classnames"
import * as React from "react"
import { ShortTextAnswerPresenterAtoms } from "../types"

const StageButtonAtom: ShortTextAnswerPresenterAtoms["stageButton"] = ({
  disabled,
}) => (
  <button type="submit" disabled={disabled} className="w-100">
    Check my Answer
  </button>
)

const CommitButtonAtom: ShortTextAnswerPresenterAtoms["commitButton"] = ({
  disabled,
  feedbackIsVisible,
  isCorrect,
}) => {
  let message = "Commit"
  if (feedbackIsVisible) message = isCorrect ? "Nice!" : "Awww"

  return (
    <button type="submit" disabled={disabled} className="w-100">
      {message}
    </button>
  )
}

const FormAtom: ShortTextAnswerPresenterAtoms["form"] = (props) => (
  <form {...props} />
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
    <div>
      <div>
        <input
          type="text"
          defaultValue={defaultValue}
          disabled={status !== "initial"}
          placeholder="Your answer"
          onChange={handleChange}
        />
      </div>
      {(dontKnowEnabled || manualCorrectEnabled) && (
        <div>
          {dontKnowEnabled && (
            <button onClick={handleDontKnow} className="w-100">
              Dunno
              <span role="img" aria-label="thinking">
                🤔
              </span>
            </button>
          )}
          {manualCorrectEnabled && (
            <button onClick={handleManualCorrect} className="w-100">
              Was correct
            </button>
          )}
        </div>
      )}
    </div>
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
