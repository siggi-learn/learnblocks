import { ShortTextAnswerPresenterAtoms } from "@learnblocks/short-text-answer"
import classNames from "classnames"
import * as React from "react"
import { Button, Form } from "react-bootstrap"

const ButtonAtom: ShortTextAnswerPresenterAtoms["button"] = (props) => (
  <Button type="submit" className="ml-2" {...props}>
    Submit
  </Button>
)

const FormAtom: ShortTextAnswerPresenterAtoms["form"] = (props) => (
  <Form className="d-flex" {...props} />
)

const FeedbackAtom: ShortTextAnswerPresenterAtoms["feedback"] = ({
  answerState: {
    isCompleted,
    isCorrect,
    withTypo,
    matchedAnswer,
    isSampleSolution,
  },
  block,
}) => (
  <div
    className={classNames("mt-2 text-right", {
      invisible: !isCompleted,
    })}
  >
    {isCorrect ? "Correct 🎉" : "Wrong 😖"}
    {withTypo && `You meant "${matchedAnswer}"`}
    {!isSampleSolution && `The sample solution is: ${block.correctAnswers[0]}`}
  </div>
)

const TextInputAtom: ShortTextAnswerPresenterAtoms["textinput"] = ({
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.currentTarget.value)

  return (
    <Form.Control
      type="text"
      placeholder="Your answer"
      onChange={handleChange}
      {...props}
    />
  )
}

export const shortTextAnswerPresenterAtoms: ShortTextAnswerPresenterAtoms = {
  as: "div",
  button: ButtonAtom,
  feedback: FeedbackAtom,
  form: FormAtom,
  textinput: TextInputAtom,
}
