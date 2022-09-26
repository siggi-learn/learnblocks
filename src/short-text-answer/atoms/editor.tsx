import * as React from "react"
import { ShortTextAnswerEditorAtoms } from "../types"

const SampleSolutionInputAtom: ShortTextAnswerEditorAtoms["sampleSolutionInput"] = ({
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.currentTarget.value)

  return (
    <input
      type="text"
      placeholder="Correct answer"
      onChange={handleChange}
      className="mb-2"
      {...props}
    />
  )
}

const MinAnswerLengthInput: ShortTextAnswerEditorAtoms["minAnswerLengthInput"] = ({
  onChange,
  defaultValue,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(parseInt(e.currentTarget.value, 10))

  return (
    <div>
      <label htmlFor="minimalAnswerLength">
        Minimal answer length?
        <input
          type="range"
          id="minimalAnswerLength"
          max={10}
          onChange={handleChange}
          defaultValue={defaultValue}
        />
      </label>
    </div>
  )
}

const TypoDistanceInputAtom: ShortTextAnswerEditorAtoms["typoDistanceInput"] = ({
  onChange,
  defaultValue,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(parseInt(e.currentTarget.value, 10))

  return (
    <div>
      <label htmlFor="typos">
        How many typos are allowed (levenshtein distance)?
        <input
          id="typos"
          type="range"
          max={10}
          onChange={handleChange}
          defaultValue={defaultValue}
        />
      </label>
    </div>
  )
}

export const shortTextAnswerEditorAtoms: ShortTextAnswerEditorAtoms = {
  as: "div",
  sampleSolutionInput: SampleSolutionInputAtom,
  minAnswerLengthInput: MinAnswerLengthInput,
  typoDistanceInput: TypoDistanceInputAtom,
}
