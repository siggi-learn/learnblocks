/**
 * 📝 Notes for Contributors:
 */

import * as React from "react"
import { BlockEditor } from "../types"
import { ChoiceBlock, ChoiceEditorAtoms, ChoiceOption } from "./types"

export const defaultChoiceBlock: ChoiceBlock = {
  type: "choice",
  hideCorrectCount: false,
  options: [
    { content: "yes", isCorrect: true },
    { content: "no", isCorrect: true },
    { content: "maybe", isCorrect: false },
  ],
}

const defaultOption: ChoiceOption = { content: "", isCorrect: false }

export const ChoiceEditor: BlockEditor<ChoiceEditorAtoms, ChoiceBlock> = ({
  atoms,
  block,
  onChange,
}) => {
  const handleOptionChange = (index: number) => (
    changedOption: ChoiceOption,
  ) => {
    if (!onChange) return

    const newOptions = [...block.options]
    newOptions[index] = changedOption
    onChange({ ...block, options: newOptions })
  }

  const handleOptionDelete = (index: number) => () => {
    if (!onChange) return

    const newOptions = [...block.options]
    newOptions.splice(index, 1)
    onChange({ ...block, options: newOptions })
  }

  const handleAppendOption = () => {
    if (!onChange) return

    const newOptions = [...block.options, { ...defaultOption }]
    onChange({ ...block, options: newOptions })
  }

  return (
    <atoms.as>
      {block.options.map((option, index) => (
        <atoms.optionForm
          key={index}
          option={option}
          onChange={handleOptionChange(index)}
          onDelete={handleOptionDelete(index)}
        />
      ))}
      <atoms.appendOptionButton onClick={handleAppendOption} />
    </atoms.as>
  )
}
