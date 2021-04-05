/**
 * 📝 Notes for Contributors:
 */

import { BlockPresenter } from "@learnblocks/types"
import * as React from "react"
import {
  ShortTextAnswerAnswerState,
  ShortTextAnswerBlock,
  ShortTextAnswerPresenterAtoms,
} from "./types"

export const ShortTextAnswerPresenter: BlockPresenter<
  ShortTextAnswerPresenterAtoms,
  ShortTextAnswerBlock,
  ShortTextAnswerAnswerState
> = ({ atoms, block, defaultAnswerState, hideFeedback, onResult }) => {
  const [
    answerState,
    setAnswerState,
  ] = React.useState<ShortTextAnswerAnswerState>(
    defaultAnswerState || { givenAnswer: "" },
  )
  const handleChange = (givenAnswer: string) =>
    setAnswerState({ ...answerState, givenAnswer })

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const isCorrect = block.correctAnswer === answerState.givenAnswer
    const newAnswerState = { ...answerState, isCorrect, isCompleted: true }
    setAnswerState(newAnswerState)
    if (onResult) onResult(newAnswerState)
  }

  return (
    <atoms.as>
      <atoms.form onSubmit={handleSubmit}>
        <atoms.textinput
          defaultValue={answerState.givenAnswer}
          disabled={answerState.isCompleted}
          onChange={handleChange}
        />
        <atoms.button disabled={answerState.isCompleted} />
      </atoms.form>
      <atoms.result
        isCorrect={answerState.isCorrect}
        isVisible={!hideFeedback && answerState.isCompleted}
      />
    </atoms.as>
  )
}
