/**
 * 📝 Notes for Contributors:
 */

import * as React from "react"
import { BlockEditor } from "../types"
import { ShortTextAnswerBlock, ShortTextAnswerEditorAtoms } from "./types"

export const defaultBlock: ShortTextAnswerBlock = {
  type: "short-text-answer",
  correctAnswers: [""],
}

export const ShortTextAnswerEditor: BlockEditor<
  ShortTextAnswerEditorAtoms,
  ShortTextAnswerBlock
> = ({ atoms, block, onChange }) => {
  const handleSampleSolutionChange = (input: string) =>
    onChange &&
    onChange({ ...block, correctAnswers: parseCorrectAnswers(input) })

  const handleTypoDistanceChange = (distance: number) =>
    onChange && onChange({ ...block, typoDistanceMax: distance })

  return (
    <atoms.as>
      <atoms.sampleSolutionInput
        onChange={handleSampleSolutionChange}
        defaultValue={serializeCorrectAnswers(block.correctAnswers)}
      />
      {atoms.typoDistanceInput && (
        <atoms.typoDistanceInput
          onChange={handleTypoDistanceChange}
          defaultValue={block.typoDistanceMax || 0}
        />
      )}
    </atoms.as>
  )
}

function parseCorrectAnswers(val: string) {
  const correctAnswers = val.split(/\s*,\s*/)
  return correctAnswers.filter((e) => !e.match(/^\s*$/))
}

function serializeCorrectAnswers(val: string[]) {
  return val.join(", ")
}
