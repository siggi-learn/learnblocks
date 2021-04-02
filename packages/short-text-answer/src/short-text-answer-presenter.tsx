/**
 * 📝 Notes for Contributors:
 */

import { BlockPresenter } from "@learnblocks/utils"
import * as React from "react"
import { ShortTextAnswerAnswerState, ShortTextAnswerBlock } from "./types"

export const ShortTextAnswerPresenter: BlockPresenter<
  ShortTextAnswerBlock,
  ShortTextAnswerAnswerState
> = ({ block, onResult, defaultAnswerState, hideFeedback }) => {
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
    setAnswerState((prev) => {
      const newAnswerState = { ...prev, isCorrect, isCompleted: true }
      if (onResult) onResult(newAnswerState)
      return newAnswerState
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        defaultValue={answerState.givenAnswer}
        disabled={answerState.isCompleted}
        onChange={handleChange}
        placeholder="Deine Antwort"
      />
      <input type="submit" disabled={answerState.isCompleted} />
      {!hideFeedback && <Feedback {...answerState} />}
    </form>
  )
}

const Feedback: React.FC<ShortTextAnswerAnswerState> = ({
  isCompleted,
  isCorrect,
}) => {
  if (!isCompleted) return null

  return <>{isCorrect ? "Richtig!" : "Leider falsch."}</>
}
