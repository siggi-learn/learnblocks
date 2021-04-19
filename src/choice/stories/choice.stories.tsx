import * as React from "react"
import {
  ChoiceBlock,
  ChoiceEditor,
  ChoicePresenter,
  ChoicePresenterState,
} from ".."
import { StoryGrid } from "../../utils"
import { choiceEditorAtoms, choicePresenterAtoms } from "../atoms"
import { defaultBlock } from "../editor"
import { defaultState } from "../presenter"

export default {
  title: "Choice",
  decorators: [(story: Function) => <div>{story()}</div>],
}

export const Basic = () => {
  const [block, setBlock] = React.useState<ChoiceBlock>(defaultBlock)
  const [state, setState] = React.useState<ChoicePresenterState>(defaultState)

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

export const HiddenCorrectCount = () => {
  const [block, setBlock] = React.useState<ChoiceBlock>({
    ...defaultBlock,
    hideCorrectCount: true,
  })
  const [state, setState] = React.useState<ChoicePresenterState>(defaultState)

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

// export const FeedbackDisabled = () => {
//   const [state, setState] = React.useState<ChoicePresenterState>(defaultState)
//   const [block, setBlock] = React.useState<ChoiceBlock>({
//     type: "short-text-answer",
//     correctAnswers: ["42"],
//   })

//   return (
//     <StoryGrid
//       block={block}
//       editor={
//         <ChoiceEditor
//           atoms={choiceEditorAtoms}
//           block={block}
//           onChange={setBlock}
//         />
//       }
//       presenter={
//         <ChoicePresenter
//           atoms={choicePresenterAtoms}
//           block={block}
//           onChange={setState}
//           feedbackDisabled
//         />
//       }
//       presenterState={state}
//     />
//   )
// }

// export const WithInitialState = () => {
//   const [block, setBlock] = React.useState<ChoiceBlock>({
//     type: "short-text-answer",
//     correctAnswers: ["42"],
//   })

//   const initialState: ChoicePresenterState = {
//     givenAnswer: "42",
//     isCorrect: true,
//     isSampleSolution: true,
//     status: "commited",
//   }

//   return (
//     <StoryGrid
//       block={block}
//       editor={
//         <ChoiceEditor
//           atoms={choiceEditorAtoms}
//           block={block}
//           onChange={setBlock}
//         />
//       }
//       presenter={
//         <ChoicePresenter
//           atoms={choicePresenterAtoms}
//           block={block}
//           initialState={initialState}
//         />
//       }
//       presenterState={initialState}
//     />
//   )
// }

// export const ExternalStageAndCommit = () => {
//   const stageRef = React.useRef<() => void>()
//   const commitRef = React.useRef<() => void>()
//   const [block, setBlock] = React.useState<ChoiceBlock>(defaultBlock)
//   const [state, setState] = React.useState<ChoicePresenterState>(defaultState)

//   const handleClick = () => {
//     if (stageRef.current) stageRef.current()
//     if (commitRef.current) commitRef.current()
//   }

//   const { button, ...atomsWithoutButton } = choicePresenterAtoms

//   return (
//     <StoryGrid
//       block={block}
//       editor={
//         <ChoiceEditor
//           atoms={choiceEditorAtoms}
//           block={block}
//           onChange={setBlock}
//         />
//       }
//       presenter={
//         <>
//           <ChoicePresenter
//             atoms={atomsWithoutButton}
//             block={block}
//             onChange={setState}
//             stageRef={stageRef}
//             commitRef={commitRef}
//           />
//           <button onClick={handleClick}>I'm on the outside</button>
//         </>
//       }
//       presenterState={state}
//     />
//   )
// }

// export const CustomFunctionality = () => {
//   const setStateRef = React.useRef<
//     (value: React.SetStateAction<ChoicePresenterState>) => void
//   >()
//   const [block, setBlock] = React.useState<ChoiceBlock>(defaultBlock)
//   const [state, setState] = React.useState<ChoicePresenterState>(defaultState)

//   const handleWasCorrectClick = () => {
//     if (setStateRef.current)
//       setStateRef.current((prev) => ({
//         ...prev,
//         isCorrect: true,
//       }))
//   }

//   return (
//     <StoryGrid
//       block={block}
//       editor={
//         <ChoiceEditor
//           atoms={choiceEditorAtoms}
//           block={block}
//           onChange={setBlock}
//         />
//       }
//       presenter={
//         <>
//           <ChoicePresenter
//             atoms={choicePresenterAtoms}
//             block={block}
//             onChange={setState}
//             setStateRef={setStateRef}
//           />
//           {state.status === "staged" && !state.isCorrect && (
//             <button onClick={handleWasCorrectClick}>
//               My Answer was correct
//             </button>
//           )}
//           {state.status === "initial" && "Answer me incorrectly!"}
//         </>
//       }
//       presenterState={state}
//     />
//   )
// }
