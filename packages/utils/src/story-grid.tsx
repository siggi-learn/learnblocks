import * as React from "react"
import { AnswerState } from "./types/learnblocks"

interface StoryGridProps {
  editor: React.ReactElement
  presenter: React.ReactElement
  result: AnswerState
}

export const StoryGrid: React.FC<StoryGridProps> = ({
  editor,
  presenter,
  result,
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    }}
  >
    <div style={{ flexBasis: 0, flexGrow: 1 }}>{editor}</div>
    <div style={{ flexBasis: 0, flexGrow: 1 }}>{presenter}</div>
    <div style={{ flexBasis: 0, flexGrow: 1 }}>{JSON.stringify(result)}</div>
  </div>
)
