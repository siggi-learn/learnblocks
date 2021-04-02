import { AnswerState } from "@learnblocks/types"
import { StoryGrid } from "@learnblocks/utils"
import * as React from "react"
import {
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
  const [result, setResult] = React.useState<AnswerState>({})

  return (
    <StoryGrid
      editor={<ShortTextAnswerEditor block={block} onChange={setBlock} />}
      presenter={
        <ShortTextAnswerPresenter block={block} onResult={setResult} />
      }
      result={result}
    />
  )
}
