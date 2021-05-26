/**
 * Interfaces for data created, updated or modified by presenters and editors
 */

export interface PresenterState {
  status: "initial" | "staged" | "committed"
  isCorrect?: boolean
  msToCommit?: number
}

export interface Block {
  type: string
}
