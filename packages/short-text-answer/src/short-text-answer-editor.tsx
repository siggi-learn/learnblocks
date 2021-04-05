/**
 * 📝 Notes for Contributors:
 */

import { BlockEditor } from "@learnblocks/types"
import * as React from "react"
import { ShortTextAnswerBlock, ShortTextAnswerEditorAtoms } from "./types"

export const ShortTextAnswerEditor: BlockEditor<
  ShortTextAnswerEditorAtoms,
  ShortTextAnswerBlock
> = ({ atoms, block, onChange }) => {
  const handleChange = (correctAnswer: string) =>
    onChange && onChange({ ...block, correctAnswer })

  return (
    <atoms.as>
      <atoms.textinput
        onChange={handleChange}
        defaultValue={block.correctAnswer}
      />
    </atoms.as>
  )
}
