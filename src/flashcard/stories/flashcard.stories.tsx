import * as React from "react"
import {
  FlashcardBlock,
  FlashcardEditor,
  FlashcardPresenter,
  FlashcardPresenterState,
} from ".."
import { StoryGrid } from "../../utils"
import { flashcardEditorAtoms, flashcardPresenterAtoms } from "../atoms"
import { defaultFlashcardBlock } from "../editor"
import { defaultFlashcardState } from "../presenter"

export default {
  title: "Flashcard",
  decorators: [(story: Function) => <div>{story()}</div>],
}

export const Basic = () => {
  const [block, setBlock] = React.useState<FlashcardBlock>(
    defaultFlashcardBlock,
  )
  const [state, setState] = React.useState<FlashcardPresenterState>(
    defaultFlashcardState,
  )

  return (
    <StoryGrid
      block={block}
      editor={
        <FlashcardEditor
          atoms={flashcardEditorAtoms}
          block={block}
          onChange={setBlock}
        />
      }
      presenter={
        <FlashcardPresenter
          atoms={flashcardPresenterAtoms}
          block={block}
          onChange={setState}
        />
      }
      presenterState={state}
    />
  )
}
