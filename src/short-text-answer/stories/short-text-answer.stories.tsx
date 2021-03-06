import * as React from "react"
import {
  ShortTextAnswerBlock,
  ShortTextAnswerEditor,
  ShortTextAnswerPresenter,
  ShortTextAnswerPresenterState,
} from ".."
import { StoryGrid } from "../../utils"
import {
  shortTextAnswerEditorAtoms,
  shortTextAnswerPresenterAtoms,
} from "../atoms"
import { defaultShortTextAnswerBlock } from "../editor"
import { defaultShortTextAnswerState } from "../presenter"

export default {
  title: "ShortTextAnswer",
  decorators: [(story: Function) => <div>{story()}</div>],
}

export const Basic = () => {
  const [block, setBlock] = React.useState<ShortTextAnswerBlock>(
    defaultShortTextAnswerBlock,
  )
  const [state, setState] = React.useState<ShortTextAnswerPresenterState>(
    defaultShortTextAnswerState,
  )

  return (
    <StoryGrid
      block={block}
      editor={
        <ShortTextAnswerEditor
          atoms={shortTextAnswerEditorAtoms}
          block={block}
          onChange={setBlock}
        />
      }
      presenter={
        <ShortTextAnswerPresenter
          atoms={shortTextAnswerPresenterAtoms}
          block={block}
          onChange={setState}
        />
      }
      presenterState={state}
    />
  )
}

export const Callbacks = () => {
  const [block, setBlock] = React.useState<ShortTextAnswerBlock>(
    defaultShortTextAnswerBlock,
  )
  const [state, setState] = React.useState<ShortTextAnswerPresenterState>(
    defaultShortTextAnswerState,
  )

  const handleStage = React.useCallback(
    (result: ShortTextAnswerPresenterState) =>
      alert(`staged with: ${JSON.stringify(result)}`),
    [],
  )
  const handleCommit = React.useCallback(
    (result: ShortTextAnswerPresenterState) =>
      alert(`commited with: ${JSON.stringify(result)}`),
    [],
  )

  return (
    <StoryGrid
      block={block}
      editor={
        <ShortTextAnswerEditor
          atoms={shortTextAnswerEditorAtoms}
          block={block}
          onChange={setBlock}
        />
      }
      presenter={
        <ShortTextAnswerPresenter
          atoms={shortTextAnswerPresenterAtoms}
          block={block}
          onStage={handleStage}
          onCommit={handleCommit}
          onChange={setState}
        />
      }
      presenterState={state}
    />
  )
}

export const FeedbackDisabled = () => {
  const [state, setState] = React.useState<ShortTextAnswerPresenterState>(
    defaultShortTextAnswerState,
  )
  const [block, setBlock] = React.useState<ShortTextAnswerBlock>({
    type: "short-text-answer",
    correctAnswers: ["42"],
  })

  return (
    <StoryGrid
      block={block}
      editor={
        <ShortTextAnswerEditor
          atoms={shortTextAnswerEditorAtoms}
          block={block}
          onChange={setBlock}
        />
      }
      presenter={
        <ShortTextAnswerPresenter
          atoms={shortTextAnswerPresenterAtoms}
          block={block}
          onChange={setState}
          feedbackDisabled
        />
      }
      presenterState={state}
    />
  )
}

export const WithInitialState = () => {
  const [block, setBlock] = React.useState<ShortTextAnswerBlock>({
    type: "short-text-answer",
    correctAnswers: ["42"],
  })

  const initialState: ShortTextAnswerPresenterState = {
    givenAnswer: "42",
    isCorrect: true,
    isSampleSolution: true,
    status: "committed",
  }

  return (
    <StoryGrid
      block={block}
      editor={
        <ShortTextAnswerEditor
          atoms={shortTextAnswerEditorAtoms}
          block={block}
          onChange={setBlock}
        />
      }
      presenter={
        <ShortTextAnswerPresenter
          atoms={shortTextAnswerPresenterAtoms}
          block={block}
          initialState={initialState}
        />
      }
      presenterState={initialState}
    />
  )
}

export const ExternalStageAndCommit = () => {
  const stageRef = React.useRef<() => void>()
  const commitRef = React.useRef<() => void>()
  const [block, setBlock] = React.useState<ShortTextAnswerBlock>(
    defaultShortTextAnswerBlock,
  )
  const [state, setState] = React.useState<ShortTextAnswerPresenterState>(
    defaultShortTextAnswerState,
  )

  const handleClick = () => {
    if (stageRef.current) stageRef.current()
    if (commitRef.current) commitRef.current()
  }

  const { button, ...atomsWithoutButton } = shortTextAnswerPresenterAtoms

  return (
    <StoryGrid
      block={block}
      editor={
        <ShortTextAnswerEditor
          atoms={shortTextAnswerEditorAtoms}
          block={block}
          onChange={setBlock}
        />
      }
      presenter={
        <>
          <ShortTextAnswerPresenter
            atoms={atomsWithoutButton}
            block={block}
            onChange={setState}
            stageRef={stageRef}
            commitRef={commitRef}
          />
          <button onClick={handleClick}>I'm on the outside</button>
        </>
      }
      presenterState={state}
    />
  )
}

export const CustomFunctionality = () => {
  const setStateRef = React.useRef<
    (value: React.SetStateAction<ShortTextAnswerPresenterState>) => void
  >()
  const [block, setBlock] = React.useState<ShortTextAnswerBlock>(
    defaultShortTextAnswerBlock,
  )
  const [state, setState] = React.useState<ShortTextAnswerPresenterState>(
    defaultShortTextAnswerState,
  )

  const handleWasCorrectClick = () => {
    if (setStateRef.current)
      setStateRef.current((prev) => ({
        ...prev,
        isCorrect: true,
      }))
  }

  return (
    <StoryGrid
      block={block}
      editor={
        <ShortTextAnswerEditor
          atoms={shortTextAnswerEditorAtoms}
          block={block}
          onChange={setBlock}
        />
      }
      presenter={
        <>
          <ShortTextAnswerPresenter
            atoms={shortTextAnswerPresenterAtoms}
            block={block}
            onChange={setState}
            setStateRef={setStateRef}
          />
          {state.status === "staged" && !state.isCorrect && (
            <button onClick={handleWasCorrectClick}>
              My Answer was correct
            </button>
          )}
          {state.status === "initial" && "Answer me incorrectly!"}
        </>
      }
      presenterState={state}
    />
  )
}
