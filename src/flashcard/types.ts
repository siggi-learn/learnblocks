import * as React from "react"
import { Atoms, Block, PresenterState } from "../types"

/**
 * Data interfaces
 */
export interface FlashcardBlock extends Block {
  type: "flashcard"
  contentFront: string
  contentBack: string
}

export interface FlashcardPresenterState extends PresenterState {
  isFlipped: boolean
  rating?: number
}

/**
 * Editor Atoms
 */
type InputFrontProps = {
  defaultValue: string
  onChange: (content: string) => void
}

type InputBackProps = {
  defaultValue: string
  onChange: (content: string) => void
}

/**
 * Presenter Atoms
 */
type CardProps = {
  contentFront: string
  contentBack: string
  isFlipped: boolean
  onFlip: () => void
}

type RateBarProps = {
  disabled: boolean
  rating?: number
  onRate: (rating: number) => void
}

type CommitButtonProps = {
  disabled: boolean
  isCorrect: boolean
  onClick: () => void
}

/**
 * Editor and Presenter Atom interfaces
 */
export interface FlashcardEditorAtoms extends Atoms {
  inputFront: React.ComponentType<InputFrontProps>
  inputBack: React.ComponentType<InputBackProps>
}

export interface FlashcardPresenterAtoms extends Atoms {
  card: React.ComponentType<CardProps>
  rateBar: React.ComponentType<RateBarProps>
  commitButton?: React.ComponentType<CommitButtonProps>
}
