import { AnswerState } from "@learnblocks/types"
import { StoryGrid } from "@learnblocks/utils"
import * as React from "react"
import { TextBlock, TextEditor, TextPresenter } from "../src"

export default {
  title: "Text",
  decorators: [(story: Function) => <div>{story()}</div>],
}

export const Basic = () => {
  const [block, setBlock] = React.useState<TextBlock>({
    type: "text",
    text: "hi there",
  })
  const [result, setResult] = React.useState<AnswerState>({})

  return (
    <StoryGrid
      editor={<TextEditor block={block} onChange={setBlock} />}
      presenter={<TextPresenter block={block} onResult={setResult} />}
      result={result}
    />
  )
}
