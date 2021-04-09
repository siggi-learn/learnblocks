/**
 * 📝 Notes for Contributors:
 *
 * Presenter Lifecycle:
 * (user is answering)       (show solution, state may be altered)    (interaction is completed)
 *    [interaction]       -->              [staged]               -->         [commited]
 *                        <--                 ⮠
 */

import levenshtein from "js-levenshtein"
import * as React from "react"
import { BlockPresenter } from "../types"
import {
  ShortTextAnswerBlock,
  ShortTextAnswerPresenterAtoms,
  ShortTextAnswerPresenterState,
} from "./types"

export const defaultState: ShortTextAnswerPresenterState = {
  givenAnswer: "",
  status: "initial",
} as const

export const ShortTextAnswerPresenter: BlockPresenter<
  ShortTextAnswerPresenterAtoms,
  ShortTextAnswerBlock,
  ShortTextAnswerPresenterState
> = ({
  atoms,
  block,
  initialState,
  hideFeedback,
  onChange,
  onStage,
  onCommit,
  stageRef,
  commitRef,
  setStateRef,
}) => {
  // TODO: use reducer to handle state
  const [state, setState] = React.useState<ShortTextAnswerPresenterState>(
    initialState || defaultState,
  )

  React.useEffect(() => onChange && onChange(state), [onChange, state])

  const handleAnswerChange = (givenAnswer: string) =>
    setState((prev) => ({ ...prev, givenAnswer }))

  const handleStage = () => {
    setState((prev) => {
      const result = compareAnswers(
        block.correctAnswers,
        state.givenAnswer,
        block.typoDistanceMax,
      )
      const newState: ShortTextAnswerPresenterState = {
        ...prev,
        ...result,
        status: "staged",
      }
      if (onStage) onStage(newState)

      return newState
    })
  }

  const handleCommit = () => {
    setState((prev) => {
      const newState: ShortTextAnswerPresenterState = {
        ...prev,
        status: "commited",
      }
      if (onCommit) onCommit(newState)

      return newState
    })
  }

  const handleSubmit = (event: any) => {
    event?.preventDefault()
    if (state.status === "initial") handleStage()
    if (state.status === "staged") handleCommit()
  }

  if (stageRef) stageRef.current = handleStage
  if (commitRef) commitRef.current = handleCommit
  if (setStateRef) setStateRef.current = setState

  return (
    <atoms.as>
      <atoms.form onSubmit={handleSubmit}>
        <atoms.textInput
          defaultValue={state.givenAnswer}
          onChange={handleAnswerChange}
          status={state.status}
        />
        {atoms.button && <atoms.button status={state.status} />}
      </atoms.form>
      {!hideFeedback && <atoms.feedback state={state} block={block} />}
    </atoms.as>
  )
}

function compareAnswers(
  correctAnswers: string[],
  givenAnswer: string,
  distanceMax?: number,
) {
  let [isCorrect, withTypo, matchedAnswer] = [false, false, ""]

  for (const correctAnswerwerStr of correctAnswers) {
    ;[isCorrect, withTypo] = compareAnswer(
      correctAnswerwerStr,
      givenAnswer,
      distanceMax,
    )
    if (isCorrect) {
      matchedAnswer = correctAnswerwerStr
      break
    }
  }

  // First answers in correctAnswers is considered sampleSuolution
  const isSampleSolution = matchedAnswer === correctAnswers[0]

  return { givenAnswer, isCorrect, isSampleSolution, matchedAnswer, withTypo }
}

function compareAnswer(
  correct: string,
  given: string,
  distanceMax?: number,
): [boolean, boolean] {
  const correctSanit = makeComparable(correct)
  const givenSanit = makeComparable(given)

  if (distanceMax) {
    const d = levenshtein(correctSanit, givenSanit)
    console.log(d, distanceMax)
    if (d <= distanceMax) {
      if (d === 0) return [true, false]
      return [true, true]
    }
    return [false, false]
  }

  return [givenSanit === correctSanit, false]
}

function makeComparable(answer: string) {
  return answer.toLowerCase().replace(/[^a-z0-9äöüß]/gi, "")
}
