/**
 * 📝 Notes for Contributors:
 *
 * Presenter Lifecycle:
 * (user is answering)       (show solution, state may be altered)    (interaction is completed)
 *    [interaction]       -->              [staged]               -->         [committed]
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
  // TODO: use reducer to handle state
  const [state, setState] = React.useState<ChoicePresenterState>(
    initialState || defaultChoiceState,
  )

  // Store the order in which the block.options are displayed.
  // Use the block.options indices to reliably map the selected options back to the block.options.
  const choiceIndices = React.useMemo(() => {
    const indices = Array.from(block.options.keys())
    if (randomizeOptions) return shuffle(indices)
    return indices
  }, [block.options, randomizeOptions])

  const correctOptionIndices = React.useMemo(
    () => getCorrectOptionIndices(block.options),
    [block.options],
  )

  // Memoize all option ClickHandlers to reduce rerendering
  const optionClickHandlers = React.useMemo(() => {
    const handlers = {}
    for (const index of choiceIndices) {
      handlers[index] = () =>
        setState((prev) => ({
          ...prev,
          selectedOptionIndices: toggleOption(
            index,
            prev.selectedOptionIndices,
          ),
        }))
    }

    return handlers
  }, [setState, choiceIndices])

  // Handle callbacks
  React.useEffect(() => {
    if (onChange) onChange(state)
    if (onStage && state.status === "staged") onStage(state)
    if (onCommit && state.status === "committed") onCommit(state)
  }, [onChange, onStage, onCommit, state])

  const handleStage = React.useCallback(
    () =>
      setState((prev) => ({
        ...prev,
        status: "staged",
        isCorrect: calcCorrect(
          prev.selectedOptionIndices,
          correctOptionIndices,
        ),
      })),
    [setState, correctOptionIndices],
  )

  const handleCommit = React.useCallback(
    () => setState((prev) => ({ ...prev, status: "committed" })),
    [setState],
  )

  const handleSubmit = (event: any) => {
    event?.preventDefault()
    if (state.status === "initial") handleStage()
    if (state.status === "staged") handleCommit()
  }

  if (stageRef) stageRef.current = handleStage
  if (commitRef) commitRef.current = handleCommit
  if (setStateRef) setStateRef.current = setState

  const feedbackIsVisible = state.status !== "initial" && !feedbackDisabled

  let totalCorrectSelections = null
  let remainingSelections = null
  if (!block.hideCorrectCount) {
    totalCorrectSelections = correctOptionIndices.length
    remainingSelections =
      totalCorrectSelections - state.selectedOptionIndices.length
  }

  return (
    <atoms.as>
      {atoms.feedback && (
        <atoms.feedback
          feedbackIsVisible={feedbackIsVisible}
          isCorrect={!!state.isCorrect}
          totalCorrectSelections={totalCorrectSelections}
          remainingSelections={remainingSelections}
        />
      )}
      <atoms.form onSubmit={handleSubmit}>
        {choiceIndices.map((index) => (
          <atoms.option
            key={index}
            disabled={state.status !== "initial"}
            feedbackIsVisible={feedbackIsVisible}
            isSelected={state.selectedOptionIndices.includes(index)}
            onClick={optionClickHandlers[index]}
            {...block.options[index]}
          />
        ))}
        {atoms.stageButton && state.status === "initial" && (
          <atoms.stageButton disabled={!!remainingSelections} />
        )}
        {atoms.commitButton && state.status !== "initial" && (
          <atoms.commitButton
            disabled={state.status === "committed"}
            feedbackIsVisible={feedbackIsVisible}
            isCorrect={!!state.isCorrect}
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
