import * as React from "react"
import { Block, PresenterState } from "../types"

interface StoryGridProps {
  editor: React.ReactElement
  presenter: React.ReactElement
  block: Block
  presenterState?: PresenterState
}

export const StoryGrid: React.FC<StoryGridProps> = ({
  editor,
  presenter,
  block,
  presenterState,
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "50% | 50%",
      gridTemplateRows: "auto | auto",
      width: "100%",
    }}
  >
    <div style={{ margin: "0.5rem", gridColumn: 1, gridRow: 1 }}>
      <strong>Editor:</strong>
      <br />
      {editor}
    </div>
    <div style={{ margin: "0.5rem", gridColumn: 2, gridRow: 1 }}>
      <strong>Presenter:</strong>
      <br />
      {presenter}
    </div>
    <div style={{ margin: "0.5rem", gridColumn: 1, gridRow: 2 }}>
      <strong>Block: </strong>
      <br />
      <textarea
        readOnly
        rows={7}
        style={{ width: "100%" }}
        value={JSON.stringify(block, null, "  ")}
      />
    </div>
    {presenterState && (
      <div style={{ margin: "0.5rem", gridColumn: 2, gridRow: 2 }}>
        <strong>State: </strong>
        <br />
        <textarea
          readOnly
          rows={7}
          style={{ width: "100%" }}
          value={JSON.stringify(presenterState, null, "  ")}
        />
      </div>
    )}
  </div>
)
