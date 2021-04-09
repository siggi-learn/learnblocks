import * as React from "react"
import { Form } from "react-bootstrap"
import { ShortTextAnswerEditorAtoms } from "../types"

const SampleSolutionInputAtom: ShortTextAnswerEditorAtoms["sampleSolutionInput"] = ({
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.currentTarget.value)

  return (
    <Form.Control
      type="text"
      placeholder="Correct answer"
      onChange={handleChange}
      {...props}
    />
  )
}

const TypoDistanceInputAtom: ShortTextAnswerEditorAtoms["typoDistanceInput"] = ({
  onChange,
  defaultValue,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(parseInt(e.currentTarget.value, 10))

  return (
    <>
      <Form.Group>
        <Form.Label>
          How many typos are allowed (levenshtein distance)?
        </Form.Label>
        <Form.Control
          type="range"
          max={10}
          onChange={handleChange}
          defaultValue={defaultValue}
        />
      </Form.Group>
    </>
  )
}

export const shortTextAnswerEditorAtoms: ShortTextAnswerEditorAtoms = {
  as: "div",
  sampleSolutionInput: SampleSolutionInputAtom,
  typoDistanceInput: TypoDistanceInputAtom,
}
