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
  <div style={{ display: "flex", width: "100%" }}>
    <div style={{ width: "50%", padding: "0.5rem" }}>
      <div>
        <strong>Editor:</strong>
        <br />
        {editor}
      </div>
      <hr />
      <div>
        <strong>Block: </strong>
        <br />
        <textarea
          readOnly
          rows={7}
          style={{ width: "100%" }}
          value={JSON.stringify(block, null, "  ")}
        />
      </div>
    </div>
    <div style={{ width: "50%", padding: "0.5rem" }}>
      <div>
        <strong>Presenter:</strong>
        <br />
        {presenter}
      </div>

      {presenterState && (
        <>
          <hr />
          <div>
            <strong>State: </strong>
            <br />
            <textarea
              readOnly
              rows={7}
              style={{ width: "100%" }}
              value={JSON.stringify(presenterState, null, "  ")}
            />
          </div>
        </>
      )}
    </div>
  </div>
)
