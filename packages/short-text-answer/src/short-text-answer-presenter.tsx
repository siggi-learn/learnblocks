/**
 * 📝 Notes for Contributors:
 */

import { BlockPresenter } from "@learnblocks/utils"
import * as React from "react"
import { ShortTextAnswerBlock } from "./types"

export const ShortTextAnswerPresenter: BlockPresenter<ShortTextAnswerBlock> = ({
  block,
  onResult,
}) => {
  React.useEffect(() => onResult && onResult({}), [onResult, block.text])

  return <div>{block.text}</div>
}
