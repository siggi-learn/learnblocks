import * as React from "react"
import {
  ShortTextAnswerAnswerState,
  ShortTextAnswerBlock,
  ShortTextAnswerEditor,
  ShortTextAnswerPresenter,
} from ".."
import { StoryGrid } from "../../utils"
import {
  shortTextAnswerEditorAtoms,
  shortTextAnswerPresenterAtoms,
} from "../atoms"

export default {
  title: "ShortTextAnswer",
  decorators: [(story: Function) => <div>{story()}</div>],
}

export const Basic = () => {
  const [block, setBlock] = React.useState<ShortTextAnswerBlock>({
    type: "short-text-answer",
    correctAnswers: [],
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
    type: "short-text-answer",
    correctAnswers: ["42"],
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
