/**
 * 📝 Notes for Contributors:
 */

import { BlockPresenter } from "@learnblocks/utils"
import * as React from "react"
import { ShortTextAnswerAnswerState, ShortTextAnswerBlock } from "./types"

export const ShortTextAnswerPresenter: BlockPresenter<
  ShortTextAnswerBlock,
  ShortTextAnswerAnswerState
> = ({ block, onResult, defaultAnswerState }) => {
  const [
    answerState,
    setAnswerState,
  ] = React.useState<ShortTextAnswerAnswerState>(
    defaultAnswerState || { givenAnswer: "" },
  )
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAnswerState({ ...answerState, givenAnswer: e.currentTarget.value })

  const handleSubmit = () => {
    const isCorrect = block.correctAnswer === answerState.givenAnswer
    setAnswerState((prev) => {
      const newAnswerState = { ...prev, isCorrect, isCompleted: true }
      if (onResult) onResult(newAnswerState)
      return newAnswerState
    })
  }

  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        defaultValue={answerState.givenAnswer}
      />
      <button onClick={handleSubmit}>Abschicken</button>
    </div>
  )
}
