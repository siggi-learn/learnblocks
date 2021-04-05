import { ShortTextAnswerEditorAtoms } from "@learnblocks/short-text-answer"
import * as React from "react"
import { Form } from "react-bootstrap"

const TextInputAtom: ShortTextAnswerEditorAtoms["textinput"] = ({
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.currentTarget.value)

  return (
    <Form.Control
      type="text"
      placeholder="Correct answer"
      onChange={handleChange}
      {...props}
    />
  )
}

export const shortTextAnswerEditorAtoms: ShortTextAnswerEditorAtoms = {
  as: "div",
  textinput: TextInputAtom,
}
