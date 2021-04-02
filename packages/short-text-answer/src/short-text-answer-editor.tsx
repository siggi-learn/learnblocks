/**
 * 📝 Notes for Contributors:
 */

import { BlockEditor } from "@learnblocks/types"
import { withAtoms } from "@learnblocks/utils"
import * as React from "react"
import { ShortTextAnswerBlock } from "./types"

const ShortTextAnswerEditorComponent: BlockEditor<ShortTextAnswerBlock> = ({
  atoms,
  block,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange && onChange({ ...block, correctAnswer: e.currentTarget.value })

  return (
    <atoms.textinput
      placeholder="Richtige Antwort"
      onChange={handleChange}
      defaultValue={block.correctAnswer}
    />
  )
}

export const ShortTextAnswerEditor = withAtoms(ShortTextAnswerEditorComponent)
