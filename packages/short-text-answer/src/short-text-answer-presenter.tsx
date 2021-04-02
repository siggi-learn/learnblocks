/**
 * 📝 Notes for Contributors:
 */

import { BlockPresenter } from "@learnblocks/types"
import { withAtoms } from "@learnblocks/utils"
import * as React from "react"
import { ShortTextAnswerAnswerState, ShortTextAnswerBlock } from "./types"

export const ShortTextAnswerPresenterComponent: BlockPresenter<
  ShortTextAnswerBlock,
  ShortTextAnswerAnswerState
> = ({ atoms, block, onResult, defaultAnswerState, hideFeedback }) => {
  const [
    answerState,
    setAnswerState,
  ] = React.useState<ShortTextAnswerAnswerState>(
    defaultAnswerState || { givenAnswer: "" },
  )
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAnswerState({ ...answerState, givenAnswer: e.currentTarget.value })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isCorrect = block.correctAnswer === answerState.givenAnswer
    const newAnswerState = { ...answerState, isCorrect, isCompleted: true }
    setAnswerState(newAnswerState)
    if (onResult) onResult(newAnswerState)
  }

  return (
    <atoms.form onSubmit={handleSubmit}>
      <atoms.textinput
        defaultValue={answerState.givenAnswer}
        disabled={answerState.isCompleted}
        onChange={handleChange}
        placeholder="Deine Antwort"
      />
      <atoms.submitAnswerButton
        type="submit"
        disabled={answerState.isCompleted}
      />
      {!hideFeedback && answerState.isCompleted && (
        <atoms.correctDisplay isCorrect={answerState.isCorrect} />
      )}
    </atoms.form>
  )
}

export const ShortTextAnswerPresenter = withAtoms(
  ShortTextAnswerPresenterComponent,
)
