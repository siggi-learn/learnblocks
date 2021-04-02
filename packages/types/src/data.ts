/**
 * Shared interface for Blocks, Editors and Presenters
 */

export interface AnswerState {
  isCompleted?: boolean
  isCorrect?: boolean
  score?: number
}

export interface Block {
  type: string
  scoreMax?: number
}
