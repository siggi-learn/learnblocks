import { AnswerState } from "@learnblocks/utils"
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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div>
        <TextEditor block={block} onChange={setBlock} />
      </div>
      <div>
        <TextPresenter block={block} onResult={setResult} />
      </div>
      <div>{JSON.stringify(result)}</div>
    </div>
  )
}
