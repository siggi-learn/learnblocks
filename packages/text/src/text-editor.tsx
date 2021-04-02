import { BlockEditor } from "@learnblocks/types"
import * as React from "react"
import { TextBlock } from "./types"

export const TextEditor: BlockEditor<TextBlock> = ({ block, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange && onChange({ ...block, text: e.currentTarget.value })

  return <textarea onChange={handleChange} defaultValue={block.text} />
}
