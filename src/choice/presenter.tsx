/**
 * 📝 Notes for Contributors:
 *
 * Presenter Lifecycle:
 * (user is answering)       (show solution, state may be altered)    (interaction is completed)
 *    [interaction]       -->              [staged]               -->         [commited]
 *                        <--                 ⮠
 */

import { isEqual, shuffle } from "lodash"
import * as React from "react"
import { BlockPresenter } from "../types"
import {
  ChoiceBlock,
  ChoicePresenterAtoms,
  ChoicePresenterState,
} from "./types"

export const defaultChoiceState: ChoicePresenterState = {
  status: "initial",
  selectedOptionIndices: [],
} as const

export const ChoicePresenter: BlockPresenter<
  ChoicePresenterAtoms,
  ChoiceBlock,
  ChoicePresenterState,
  { randomizeOptions?: boolean }
> = ({
  atoms,
  block,
  initialState,
  feedbackDisabled,
  onChange,
  onStage,
  onCommit,
  stageRef,
  commitRef,
  setStateRef,
  randomizeOptions = false,
}) => {
  const choiceOptions = React.useMemo(() => {
    if (randomizeOptions) return shuffle(block.options)
    return block.options
  }, [block.options, randomizeOptions])

  const correctOptionIndices = React.useMemo(
    () => getCorrectOptionIndices(choiceOptions),
    [choiceOptions],
  )

  // TODO: use reducer to handle state
  const [state, setState] = React.useState<ChoicePresenterState>(
    initialState || defaultChoiceState,
  )

  React.useEffect(() => onChange && onChange(state), [onChange, state])

  const handleOptionClick = React.useCallback(
    (index: number) =>
      setState((prev) => ({
        ...prev,
        selectedOptionIndices: toggleOption(index, prev.selectedOptionIndices),
      })),
    [],
  )

  const handleStage = React.useCallback(() => {
    setState((prev) => {
      const newState: ChoicePresenterState = {
        ...prev,
        status: "staged",
        isCorrect: calcCorrect(
          prev.selectedOptionIndices,
          correctOptionIndices,
        ),
      }
      if (onStage) onStage(newState)

      return newState
    })
  }, [onStage, correctOptionIndices])

  const handleCommit = React.useCallback(() => {
    setState((prev) => {
      const newState: ChoicePresenterState = {
        ...prev,
        status: "commited",
      }
      if (onCommit) onCommit(newState)

      return newState
    })
  }, [onCommit])

  const handleSubmit = (event: any) => {
    event?.preventDefault()
    if (state.status === "initial") handleStage()
    if (state.status === "staged") handleCommit()
  }

  if (stageRef) stageRef.current = handleStage
  if (commitRef) commitRef.current = handleCommit
  if (setStateRef) setStateRef.current = setState

  const feedbackIsVisible = state.status !== "initial" && !feedbackDisabled
  const remainingSelections = block.hideCorrectCount
    ? null
    : correctOptionIndices.length - state.selectedOptionIndices.length

  return (
    <atoms.as>
      {atoms.feedback && (
        <atoms.feedback
          feedbackIsVisible={feedbackIsVisible}
          isCorrect={!!state.isCorrect}
          remainingSelections={remainingSelections}
        />
      )}
      <atoms.form onSubmit={handleSubmit}>
        {choiceOptions.map((option, index) => (
          <atoms.option
            key={index}
            feedbackIsVisible={feedbackIsVisible}
            isSelected={state.selectedOptionIndices.includes(index)}
            onClick={() => handleOptionClick(index)}
            {...option}
          />
        ))}
        {atoms.submitButton && (
          <atoms.submitButton
            disabled={!!remainingSelections}
            feedbackIsVisible={feedbackIsVisible}
            isCorrect={!!state.isCorrect}
            status={state.status}
          />
        )}
      </atoms.form>
    </atoms.as>
  )
}

function toggleOption(index: number, selectedOptionIndices: readonly number[]) {
  if (!selectedOptionIndices.includes(index))
    return [...selectedOptionIndices, index]
  return selectedOptionIndices.filter((currIndex) => index !== currIndex)
}

function getCorrectOptionIndices(options: ChoiceBlock["options"]) {
  return options.reduce(
    (indices, option, index) =>
      option.isCorrect ? [...indices, index] : indices,
    [] as number[],
  )
}

function calcCorrect(
  correctIndices: readonly number[],
  selectedIndices: readonly number[],
) {
  return isEqual([...correctIndices].sort(), [...selectedIndices].sort())
}
