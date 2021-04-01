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
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange && onChange({ ...block, text: e.currentTarget.value })

  return <textarea onChange={handleChange} defaultValue={block.text} />
}
