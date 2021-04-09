import * as React from "react"
import { Atoms, Block, PresenterState } from "../types"

/**
 * Data interfaces
 */
export interface ShortTextAnswerBlock extends Block {
  type: "short-text-answer"
  correctAnswers: string[]
  typoDistanceMax?: number
}

export interface ShortTextAnswerPresenterState extends PresenterState {
  givenAnswer: string
  matchedAnswer?: string
  isSampleSolution?: boolean
  withTypo?: boolean
}

/**
 * Editor Atoms
 */
type SampleSolutionInputProps = {
  defaultValue: string
  onChange: (value: string) => void
}

type TypoDistanceInputProps = {
  defaultValue: number
  onChange: (value: number) => void
}

/**
 * Presenter Atoms
 */
type ButtonProps = { status: PresenterState["status"] }

type FormProps = { onSubmit: (event: any) => void }

type PresenterInputProps = {
  defaultValue: string
  onChange: (value: string) => void
  status: PresenterState["status"]
}

type FeedbackProps = {
  block: ShortTextAnswerBlock
  state: ShortTextAnswerPresenterState
}

/**
 * Editor and Presenter Atom interfaces
 */
export interface ShortTextAnswerEditorAtoms extends Atoms {
  sampleSolutionInput: React.ComponentType<SampleSolutionInputProps>
  typoDistanceInput?: React.ComponentType<TypoDistanceInputProps>
}

export interface ShortTextAnswerPresenterAtoms extends Atoms {
  button?: React.ComponentType<ButtonProps>
  form: React.ComponentType<FormProps>
  textInput: React.ComponentType<PresenterInputProps>
  feedback: React.ComponentType<FeedbackProps>
}
