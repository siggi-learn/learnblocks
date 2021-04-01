import { AnswerState } from "@learnblocks/utils"
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
        <ShortTextAnswerEditor block={block} onChange={setBlock} />
      </div>
      <div>
        <ShortTextAnswerPresenter block={block} onResult={setResult} />
      </div>
      <div>{JSON.stringify(result)}</div>
    </div>
  )
}
