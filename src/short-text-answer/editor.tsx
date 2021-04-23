/**
 * 📝 Notes for Contributors:
 */

import * as React from "react"
import { BlockEditor } from "../types"
import { ShortTextAnswerBlock, ShortTextAnswerEditorAtoms } from "./types"

export const defaultShortTextAnswerBlock: ShortTextAnswerBlock = {
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

  const handleMinAnswerLengthChange = (distance: number) =>
    onChange && onChange({ ...block, minAnswerLength: distance })

  const handleTypoDistanceChange = (distance: number) =>
    onChange && onChange({ ...block, typoDistanceMax: distance })

  return (
    <atoms.as>
      <atoms.sampleSolutionInput
        onChange={handleSampleSolutionChange}
        defaultValue={serializeCorrectAnswers(block.correctAnswers)}
      />
      {atoms.minAnswerLengthInput && (
        <atoms.minAnswerLengthInput
          onChange={handleMinAnswerLengthChange}
          defaultValue={block.minAnswerLength || 0}
        />
      )}
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
