import classNames from "classnames"
import * as React from "react"
import { Button, Form } from "react-bootstrap"
import { ShortTextAnswerPresenterAtoms } from "../types"

const ButtonAtom: ShortTextAnswerPresenterAtoms["button"] = ({ status }) => {
  let caption = "Check"
  if (status === "staged") caption = "Next"
  if (status === "commited") caption = "Done"

  return (
    <Button type="submit" className="ml-2" disabled={status === "commited"}>
      {caption}
    </Button>
  )
}

const FormAtom: ShortTextAnswerPresenterAtoms["form"] = (props) => (
  <Form className="d-flex" {...props} />
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

const TextInputAtom: ShortTextAnswerPresenterAtoms["textinput"] = ({
  defaultValue,
  onChange,
  status,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.currentTarget.value)

  return (
    <Form.Control
      type="text"
      defaultValue={defaultValue}
      disabled={status !== "initial"}
      placeholder="Your answer"
      onChange={handleChange}
    />
  )
}

export const shortTextAnswerPresenterAtoms: ShortTextAnswerPresenterAtoms = {
  as: "div",
  button: ButtonAtom,
  feedback: FeedbackAtom,
  form: FormAtom,
  textInput: TextInputAtom,
}
