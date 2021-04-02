import { BlockEditor } from "@learnblocks/types"
import { withAtoms } from "@learnblocks/utils"
import * as React from "react"
import { TextBlock } from "./types"

const TextEditorComponent: BlockEditor<TextBlock> = ({
  atoms,
  block,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange && onChange({ ...block, text: e.currentTarget.value })

  return <atoms.textarea onChange={handleChange} defaultValue={block.text} />
}

export const TextEditor = withAtoms(TextEditorComponent)
