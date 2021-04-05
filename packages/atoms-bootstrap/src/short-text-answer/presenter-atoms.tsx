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

const ResultAtom: ShortTextAnswerPresenterAtoms["result"] = ({
  isCorrect,
  isVisible,
}) => (
  <div className={classNames("mt-2 text-right", { invisible: !isVisible })}>
    {isCorrect ? "Correct 🎉" : "Wrong 😖"}
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
  form: FormAtom,
  button: ButtonAtom,
  textinput: TextInputAtom,
  result: ResultAtom,
}
