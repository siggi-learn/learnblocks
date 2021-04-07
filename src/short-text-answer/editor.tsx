/**
 * 📝 Notes for Contributors:
 */

import * as React from "react"
import { BlockEditor } from "../types"
import { ShortTextAnswerBlock, ShortTextAnswerEditorAtoms } from "./types"

export const ShortTextAnswerEditor: BlockEditor<
  ShortTextAnswerEditorAtoms,
  ShortTextAnswerBlock
> = ({ atoms, block, onChange }) => {
  const handleChange = (correctAnswer: string) =>
    onChange &&
    onChange({ ...block, correctAnswers: correctAnswer.split(/\s*,\s*/) })

  return (
    <atoms.as>
      <atoms.textinput
        onChange={handleChange}
        defaultValue={correctAnswerString(block.correctAnswers)}
      />
    </atoms.as>
  )
}

function correctAnswerString(val: string | string[]) {
  if (Array.isArray(val)) return val.join(", ")
  return val
}
