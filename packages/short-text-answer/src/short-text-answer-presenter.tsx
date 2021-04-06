/**
 * 📝 Notes for Contributors:
 */

import { BlockPresenter } from "@learnblocks/types"
import levenshtein from "js-levenshtein"
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
    const { isCorrect } = calcCorrect(
      block.correctAnswers,
      answerState.givenAnswer,
    )
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
      {!hideFeedback && (
        <atoms.feedback answerState={answerState} block={block} />
      )}
    </atoms.as>
  )
}

function calcCorrect(correctAnswers: string[], givenAnswer: string) {
  let [isCorrect, typo, matchedAnswer] = [false, false, ""]
  const [modelAnswer, ...altAnswers] = correctAnswers

  for (const correctAnswerwerStr of [modelAnswer, ...altAnswers]) {
    ;[isCorrect, typo] = calcCorrectLevenshtein(
      correctAnswerwerStr,
      givenAnswer,
    )
    if (isCorrect) {
      matchedAnswer = correctAnswerwerStr
      break
    }
  }

  return { isCorrect, typo, modelAnswer, altAnswers, matchedAnswer }
}

function calcCorrectLevenshtein(
  correctAnswer: string,
  givenAnswer: string,
): [boolean, boolean] {
  const compCorrectAnswer = makeComparable(correctAnswer)
  const compGivenAnswer = makeComparable(givenAnswer)
  const d = levenshtein(compCorrectAnswer, compGivenAnswer)

  if (d <= 2) {
    if (d === 0) return [true, false]
    return [true, true]
  }

  return [false, false]
}

function makeComparable(answer: string) {
  return answer.toLowerCase().replace(/[^a-z0-9äöüß]/gi, "")
}
