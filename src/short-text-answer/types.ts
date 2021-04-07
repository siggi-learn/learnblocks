import * as React from "react"
import { AnswerState, Atoms, Block } from "../types"

type ButtonProps = { disabled?: boolean }

type FormProps = { onSubmit: (event: any) => void }

type TextInputProps = {
  defaultValue: string
  disabled?: boolean
  onChange: (value: string) => void
}

type FeedbackProps = {
  answerState: ShortTextAnswerAnswerState
  block: ShortTextAnswerBlock
}

export interface ShortTextAnswerEditorAtoms extends Atoms {
  textinput: React.ComponentType<TextInputProps>
}

export interface ShortTextAnswerPresenterAtoms extends Atoms {
  button: React.ComponentType<ButtonProps>
  form: React.ComponentType<FormProps>
  textinput: React.ComponentType<TextInputProps>
  feedback: React.ComponentType<FeedbackProps>
}

export interface ShortTextAnswerBlock extends Block {
  type: "short-text-answer"
  correctAnswers: string[]
}

export interface ShortTextAnswerAnswerState extends AnswerState {
  givenAnswer: string
  matchedAnswer?: string
  isSampleSolution?: boolean
  withTypo?: boolean
}
