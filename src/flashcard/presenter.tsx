/**
 * 📝 Notes for Contributors:
 *
 * Presenter Lifecycle:
 * (user is answering)       (show solution, state may be altered)    (interaction is completed)
 *    [interaction]       -->              [staged]               -->         [committed]
 *                        <--                 ⮠
 */

import * as React from "react"
import { BlockPresenter } from "../types"
import {
  FlashcardBlock,
  FlashcardPresenterAtoms,
  FlashcardPresenterState,
} from "./types"

export const defaultFlashcardState: FlashcardPresenterState = {
  status: "initial",
  isFlipped: false,
} as const

export const FlashcardPresenter: BlockPresenter<
  FlashcardPresenterAtoms,
  FlashcardBlock,
  FlashcardPresenterState,
  { correctnessThreshold?: number }
> = ({
  atoms,
  block,
  initialState,
  onChange,
  onStage,
  onCommit,
  stageRef,
  commitRef,
  setStateRef,
  correctnessThreshold = 60,
}) => {
  // TODO: use reducer to handle state
  const [state, setState] = React.useState<FlashcardPresenterState>(
    initialState || defaultFlashcardState,
  )

  React.useEffect(() => {
    if (onChange) onChange(state)
    if (onStage && state.status === "staged") onStage(state)
    if (onCommit && state.status === "committed") onCommit(state)
  }, [onChange, onStage, onCommit, state])

  const handleFlip = () => setState((p) => ({ ...p, isFlipped: !p.isFlipped }))

  const handleStage = React.useCallback(
    () => setState((prev) => ({ ...prev, status: "staged" })),
    [setState],
  )

  const handleCommit = React.useCallback(
    () => setState((prev) => ({ ...prev, status: "committed" })),
    [setState],
  )

  const handleRating = (rating: number) => {
    setState((p) => ({
      ...p,
      rating,
      isCorrect: rating >= correctnessThreshold,
    }))
    handleStage()
  }

  if (stageRef) stageRef.current = handleStage
  if (commitRef) commitRef.current = handleCommit
  if (setStateRef) setStateRef.current = setState

  return (
    <atoms.as>
      <atoms.card
        contentFront={block.contentFront}
        contentBack={block.contentBack}
        isFlipped={state.isFlipped}
        onFlip={handleFlip}
      />
      {state.status === "initial" ? (
        <atoms.rateBar
          onRate={handleRating}
          rating={state.rating}
          disabled={!state.isFlipped}
        />
      ) : (
        atoms.commitButton && (
          <atoms.commitButton
            disabled={state.status === "committed"}
            onClick={handleCommit}
            isCorrect={!!state.isCorrect}
          />
        )
      )}
    </atoms.as>
  )
}
