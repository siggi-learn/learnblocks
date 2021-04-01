import { BlockPresenter } from "@learnblocks/utils"
import * as React from "react"
import { TextBlock } from "./types"

export const TextPresenter: BlockPresenter<TextBlock> = ({
  block,
  onResult,
}) => {
  React.useEffect(() => onResult && onResult({}), [onResult, block.text])

  return <div dangerouslySetInnerHTML={{ __html: block.text }} />
}
