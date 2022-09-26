import * as React from "react"
import { FlashcardEditorAtoms } from "../types"

const InputFront: FlashcardEditorAtoms["inputFront"] = ({
  defaultValue,
  onChange,
}) => {
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    const content = event.currentTarget.value
    onChange(content)
  }

  return (
    <textarea
      defaultValue={defaultValue}
      className="mb-2"
      onChange={handleChange}
      rows={3}
      placeholder="Frontside of the Card"
    />
  )
}

const InputBack: FlashcardEditorAtoms["inputBack"] = ({
  defaultValue,
  onChange,
}) => {
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    const content = event.currentTarget.value
    onChange(content)
  }

  return (
    <textarea
      defaultValue={defaultValue}
      onChange={handleChange}
      rows={3}
      placeholder="Backside of the Card"
    />
  )
}

export const flashcardEditorAtoms: FlashcardEditorAtoms = {
  as: "div",
  inputFront: InputFront,
  inputBack: InputBack,
}
