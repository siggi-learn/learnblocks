import * as React from "react"
import {
  ChoiceBlock,
  ChoiceEditor,
  ChoicePresenter,
  ChoicePresenterState,
} from ".."
import { StoryGrid } from "../../utils"
import { choiceEditorAtoms, choicePresenterAtoms } from "../atoms"
import { defaultChoiceBlock } from "../editor"
import { defaultChoiceState } from "../presenter"

export default {
  title: "Choice",
  decorators: [(story: Function) => <div>{story()}</div>],
}

export const Basic = () => {
  const [block, setBlock] = React.useState<ChoiceBlock>(defaultChoiceBlock)
  const [state, setState] = React.useState<ChoicePresenterState>(
    defaultChoiceState,
  )

  return (
    <StoryGrid
      block={block}
      editor={
        <ChoiceEditor
          atoms={choiceEditorAtoms}
          block={block}
          onChange={setBlock}
        />
      }
      presenter={
        <ChoicePresenter
          atoms={choicePresenterAtoms}
          block={block}
          onChange={setState}
        />
      }
      presenterState={state}
    />
  )
}

export const Callbacks = () => {
  const [block, setBlock] = React.useState<ChoiceBlock>(defaultChoiceBlock)
  const [state, setState] = React.useState<ChoicePresenterState>(
    defaultChoiceState,
  )

  const handleStage = React.useCallback(
    (result: ChoicePresenterState) =>
      alert(`staged with: ${JSON.stringify(result)}`),
    [],
  )
  const handleCommit = React.useCallback(
    (result: ChoicePresenterState) =>
      alert(`commited with: ${JSON.stringify(result)}`),
    [],
  )

  return (
    <StoryGrid
      block={block}
      editor={
        <ChoiceEditor
          atoms={choiceEditorAtoms}
          block={block}
          onChange={setBlock}
        />
      }
      presenter={
        <ChoicePresenter
          atoms={choicePresenterAtoms}
          block={block}
          onChange={setState}
          onStage={handleStage}
          onCommit={handleCommit}
        />
      }
      presenterState={state}
    />
  )
}

export const HiddenCorrectCount = () => {
  const [block, setBlock] = React.useState<ChoiceBlock>({
    ...defaultChoiceBlock,
    hideCorrectCount: true,
  })
  const [state, setState] = React.useState<ChoicePresenterState>(
    defaultChoiceState,
  )

  return (
    <StoryGrid
      block={block}
      editor={
        <ChoiceEditor
          atoms={choiceEditorAtoms}
          block={block}
          onChange={setBlock}
        />
      }
      presenter={
        <ChoicePresenter
          atoms={choicePresenterAtoms}
          block={block}
          onChange={setState}
        />
      }
      presenterState={state}
    />
  )
}

export const FeedbackDisabled = () => {
  const [block, setBlock] = React.useState<ChoiceBlock>({
    ...defaultChoiceBlock,
  })
  const [state, setState] = React.useState<ChoicePresenterState>(
    defaultChoiceState,
  )

  return (
    <StoryGrid
      block={block}
      editor={
        <ChoiceEditor
          atoms={choiceEditorAtoms}
          block={block}
          onChange={setBlock}
        />
      }
      presenter={
        <ChoicePresenter
          atoms={choicePresenterAtoms}
          block={block}
          onChange={setState}
          feedbackDisabled
        />
      }
      presenterState={state}
    />
  )
}

export const RandomizeOptions = () => {
  const [block, setBlock] = React.useState<ChoiceBlock>({
    ...defaultChoiceBlock,
  })
  const [state, setState] = React.useState<ChoicePresenterState>(
    defaultChoiceState,
  )

  return (
    <StoryGrid
      block={block}
      editor={
        <ChoiceEditor
          atoms={choiceEditorAtoms}
          block={block}
          onChange={setBlock}
        />
      }
      presenter={
        <ChoicePresenter
          atoms={choicePresenterAtoms}
          block={block}
          onChange={setState}
          randomizeOptions
        />
      }
      presenterState={state}
    />
  )
}

export const WithInitialState = () => {
  const initialState: ChoicePresenterState = {
    status: "initial",
    selectedOptionIndices: [0, 1],
  }

  const [block, setBlock] = React.useState<ChoiceBlock>({
    ...defaultChoiceBlock,
  })
  const [state, setState] = React.useState<ChoicePresenterState>(
    defaultChoiceState,
  )

  return (
    <StoryGrid
      block={block}
      editor={
        <ChoiceEditor
          atoms={choiceEditorAtoms}
          block={block}
          onChange={setBlock}
        />
      }
      presenter={
        <ChoicePresenter
          atoms={choicePresenterAtoms}
          block={block}
          initialState={initialState}
          onChange={setState}
          randomizeOptions
        />
      }
      presenterState={state}
    />
  )
}
