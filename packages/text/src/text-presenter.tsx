import { BlockPresenter } from "@learnblocks/types"
import { withAtoms } from "@learnblocks/utils"
import * as React from "react"
import { TextBlock } from "./types"

const TextPresenterComponent: BlockPresenter<TextBlock> = ({
  atoms,
  block,
  onResult,
}) => {
  React.useEffect(() => onResult && onResult({}), [onResult, block.text])

  return <atoms.text dangerouslySetInnerHTML={{ __html: block.text }} />
}

export const TextPresenter = withAtoms(TextPresenterComponent)
