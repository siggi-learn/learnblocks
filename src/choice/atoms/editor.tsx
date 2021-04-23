import * as React from "react"
import { Button, Form } from "react-bootstrap"
import { ChoiceEditorAtoms } from "../types"

const OptionFormAtom: ChoiceEditorAtoms["optionForm"] = ({
  option,
  onChange,
  onDelete,
}) => {
  const handleCorrectToggle = () =>
    onChange({ ...option, isCorrect: !option.isCorrect })

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...option, content: event.currentTarget.value })

  return (
    <div className="d-flex align-items-center py-1">
      <Form.Check
        checked={option.isCorrect}
        onClick={handleCorrectToggle}
        readOnly
      />
      <Form.Control
        type="text"
        value={option.content}
        onChange={handleContentChange}
      />
      <Button className="ml-2" onClick={onDelete} variant="danger">
        Delete
      </Button>
    </div>
  )
}

const AppendOptionButton: ChoiceEditorAtoms["appendOptionButton"] = ({
  onClick,
}) => (
  <Button variant="outline-success" onClick={onClick} className="w-100 mt-2">
    Add Option
  </Button>
)

export const choiceEditorAtoms: ChoiceEditorAtoms = {
  as: "div",
  optionForm: OptionFormAtom,
  appendOptionButton: AppendOptionButton,
}
