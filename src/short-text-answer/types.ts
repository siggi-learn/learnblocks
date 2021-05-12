import * as React from "react"
import { Atoms, Block, PresenterState } from "../types"

/**
 * Data interfaces
 */
export interface ShortTextAnswerBlock extends Block {
  type: "short-text-answer"
  correctAnswers: string[]
  minAnswerLength?: number
  typoDistanceMax?: number
}

export interface ShortTextAnswerPresenterState extends PresenterState {
  givenAnswer: string
  manuallyCorrected?: boolean
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

type RangeInputProps = {
  defaultValue: number
  onChange: (value: number) => void
}

/**
 * Presenter Atoms
 */
type FormProps = { onSubmit: (event: any) => void }

type TextInputProps = {
  defaultValue: string
  dontKnowEnabled: boolean
  handleDontKnow: () => void
  manualCorrectEnabled: boolean
  handleManualCorrect: () => void
  onChange: (value: string) => void
  status: PresenterState["status"]
}

type FeedbackProps = {
  block: ShortTextAnswerBlock
  state: ShortTextAnswerPresenterState
}

type StageButtonProps = {
  disabled: boolean
}

type CommitButtonProps = {
  disabled: boolean
  feedbackIsVisible: boolean
  isCorrect: boolean
}

/**
 * Editor and Presenter Atom interfaces
 */
export interface ShortTextAnswerEditorAtoms extends Atoms {
  sampleSolutionInput: React.ComponentType<SampleSolutionInputProps>
  minAnswerLengthInput?: React.ComponentType<RangeInputProps>
  typoDistanceInput?: React.ComponentType<RangeInputProps>
}

export interface ShortTextAnswerPresenterAtoms extends Atoms {
  form: React.ComponentType<FormProps>
  textInput: React.ComponentType<TextInputProps>
  feedback: React.ComponentType<FeedbackProps>
  stageButton?: React.ComponentType<StageButtonProps>
  commitButton?: React.ComponentType<CommitButtonProps>
}
