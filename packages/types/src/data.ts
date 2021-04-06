/**
 * Shared interface for Blocks, Editors and Presenters
 */

export interface AnswerState {
  isCompleted?: boolean
  isCorrect?: boolean
  msToComplete?: number
}

export interface Block {
  type: string
  scoreMax?: number
}
