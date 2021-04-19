import * as React from "react"
import { Atoms, Block, PresenterState } from "../types"

/**
 * Data interfaces
 */
export interface ChoiceOption {
  content: string
  isCorrect: boolean
}

export interface ChoiceBlock extends Block {
  type: "choice"
  options: ChoiceOption[]
  hideCorrectCount?: boolean
}

export interface ChoicePresenterState extends PresenterState {
  selectedOptionIndices: readonly number[]
}

/**
 * Editor Atoms
 */
type OptionFormProps = {
  option: ChoiceOption
  onChange: (option: ChoiceOption) => void
  onDelete: () => void
}

type AppendButtonProps = {
  onClick: () => void
}

/**
 * Presenter Atoms
 */
type FormProps = { onSubmit: (event: any) => void }

type FeedbackAtomProps = {
  feedbackIsVisible: boolean
  isCorrect: boolean
  remainingSelections: number | null
}

type OptionAtomProps = {
  content: string
  isCorrect: boolean
  isSelected: boolean
  onClick: () => void
  feedbackIsVisible: boolean
}

type SubmitButtonProps = {
  disabled: boolean
  isCorrect: boolean
  status: PresenterState["status"]
  feedbackIsVisible: boolean
}

/**
 * Editor and Presenter Atom interfaces
 */
export interface ChoiceEditorAtoms extends Atoms {
  optionForm: React.ComponentType<OptionFormProps>
  appendOptionButton: React.ComponentType<AppendButtonProps>
}

export interface ChoicePresenterAtoms extends Atoms {
  form: React.ComponentType<FormProps>
  feedback?: React.ComponentType<FeedbackAtomProps>
  option: React.ComponentType<OptionAtomProps>
  submitButton: React.ComponentType<SubmitButtonProps>
}
