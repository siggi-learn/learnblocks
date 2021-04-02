/**
 * 📝 Notes for Contributors:
 */

import { BlockEditor } from "@learnblocks/utils"
import * as React from "react"
import { ShortTextAnswerBlock } from "./types"

export const ShortTextAnswerEditor: BlockEditor<ShortTextAnswerBlock> = ({
  block,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange && onChange({ ...block, correctAnswer: e.currentTarget.value })

  return (
    <input
      type="text"
      placeholder="Richtige Antwort"
      onChange={handleChange}
      defaultValue={block.correctAnswer}
    />
  )
}
