import * as React from "react"
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
      <input
        type="checkbox"
        checked={option.isCorrect}
        onClick={handleCorrectToggle}
        readOnly
      />
      <input
        type="text"
        value={option.content}
        onChange={handleContentChange}
      />
      <button className="ml-2" onClick={onDelete}>
        Delete
      </button>
    </div>
  )
}

const AppendOptionButton: ChoiceEditorAtoms["appendOptionButton"] = ({
  onClick,
}) => (
  <button onClick={onClick} className="w-100 mt-2">
    Add Option
  </button>
)

export const choiceEditorAtoms: ChoiceEditorAtoms = {
  as: "div",
  optionForm: OptionFormAtom,
  appendOptionButton: AppendOptionButton,
}
