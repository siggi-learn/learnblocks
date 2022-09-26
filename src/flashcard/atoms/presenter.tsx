import * as React from "react"
import { FlashcardPresenterAtoms } from "../types"

const Card: FlashcardPresenterAtoms["card"] = ({
  contentFront,
  contentBack,
  isFlipped,
  onFlip,
}) => {
  return (
    <button
      onClick={onFlip}
      style={{
        cursor: "pointer",
        borderRadius: "10px",
        background: "#ddd",
        width: "100%",
        minHeight: "300px",
        fontSize: "2rem",
      }}
    >
      {isFlipped ? contentBack : contentFront}
    </button>
  )
}

const RateBar: FlashcardPresenterAtoms["rateBar"] = ({ disabled, onRate }) => (
  <div className="mt-4">
    <div className="font-italic">Rate your Answer</div>
    <div aria-label="Rate your answer" className="w-100">
      <button disabled={disabled} onClick={() => onRate(0)}>
        Bad
      </button>
      <button disabled={disabled} onClick={() => onRate(70)}>
        Alright
      </button>
      <button disabled={disabled} onClick={() => onRate(100)}>
        Perfect
      </button>
    </div>
  </div>
)

const CommitButton: FlashcardPresenterAtoms["commitButton"] = ({
  disabled,
  isCorrect,
  onClick,
}) => (
  <button disabled={disabled} onClick={onClick}>
    {isCorrect ? "Nice" : "Commit"}
  </button>
)

export const flashcardPresenterAtoms: FlashcardPresenterAtoms = {
  as: "div",
  card: Card,
  rateBar: RateBar,
  commitButton: CommitButton,
}
