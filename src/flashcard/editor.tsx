/**
 * 📝 Notes for Contributors:
 */

import * as React from "react"
import { BlockEditor } from "../types"
import { FlashcardBlock, FlashcardEditorAtoms } from "./types"

export const defaultFlashcardBlock: FlashcardBlock = {
  type: "flashcard",
  contentFront: "What color has a banana?",
  contentBack: "A banana is yellow.",
}

export const FlashcardEditor: BlockEditor<
  FlashcardEditorAtoms,
  FlashcardBlock
> = ({ atoms, block, onChange }) => {
  const handleFrontChange = (contentFront: string) =>
    onChange && onChange({ ...block, contentFront })

  const handleBackChange = (contentBack: string) =>
    onChange && onChange({ ...block, contentBack })

  return (
    <atoms.as>
      <atoms.inputFront
        onChange={handleFrontChange}
        defaultValue={block.contentFront}
      />
      <atoms.inputBack
        onChange={handleBackChange}
        defaultValue={block.contentBack}
      />
    </atoms.as>
  )
}
