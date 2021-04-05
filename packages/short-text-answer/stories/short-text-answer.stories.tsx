import {
  shortTextAnswerEditorAtoms,
  shortTextAnswerPresenterAtoms,
} from "@learnblocks/atoms-bootstrap"
import { StoryGrid } from "@learnblocks/utils"
import * as React from "react"
import {
  ShortTextAnswerAnswerState,
  ShortTextAnswerBlock,
  ShortTextAnswerEditor,
  ShortTextAnswerPresenter,
} from "../src"

export default {
  title: "ShortTextAnswer",
  decorators: [(story: Function) => <div>{story()}</div>],
}

export const Basic = () => {
  const [block, setBlock] = React.useState<ShortTextAnswerBlock>({
    type: "text",
    correctAnswer: "",
  })
  const [result, setResult] = React.useState<ShortTextAnswerAnswerState>({
    givenAnswer: "",
  })

  return (
    <StoryGrid
      block={block}
      editor={
        <ShortTextAnswerEditor
          atoms={shortTextAnswerEditorAtoms}
          block={block}
          onChange={setBlock}
        />
      }
      presenter={
        <ShortTextAnswerPresenter
          atoms={shortTextAnswerPresenterAtoms}
          block={block}
          onResult={setResult}
        />
      }
      result={result}
    />
  )
}

export const WithDefaultState = () => {
  const [block, setBlock] = React.useState<ShortTextAnswerBlock>({
    type: "text",
    correctAnswer: "42",
  })

  return (
    <StoryGrid
      block={block}
      editor={
        <ShortTextAnswerEditor
          atoms={shortTextAnswerEditorAtoms}
          block={block}
          onChange={setBlock}
        />
      }
      presenter={
        <ShortTextAnswerPresenter
          atoms={shortTextAnswerPresenterAtoms}
          block={block}
          defaultAnswerState={{
            givenAnswer: "42",
            isCorrect: true,
            isCompleted: true,
          }}
        />
      }
    />
  )
}
