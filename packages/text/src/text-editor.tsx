import * as React from "react"

interface TextBlock extends Learnblocks.Block {}

const TextPresenter: Learnblocks.BlockPresenter<"text"> = ({ block }) => {
  return <div dangerouslySetInnerHTML={{ __html: block.text }}></div>
}
