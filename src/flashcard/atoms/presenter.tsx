import * as React from "react"
import { Button, ButtonGroup } from "react-bootstrap"
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
      className="cursor-pointer rounded-lg shadow-sm bg-light border d-block w-100"
      style={{ minHeight: "300px", fontSize: "2rem" }}
    >
      {isFlipped ? contentBack : contentFront}
    </button>
  )
}

const RateBar: FlashcardPresenterAtoms["rateBar"] = ({ disabled, onRate }) => (
  <div className="mt-4">
    <div className="font-italic">Rate your Answer</div>
    <ButtonGroup aria-label="Rate your answer" className="w-100">
      <Button disabled={disabled} variant="danger" onClick={() => onRate(0)}>
        Bad
      </Button>
      <Button disabled={disabled} variant="warning" onClick={() => onRate(70)}>
        Alright
      </Button>
      <Button disabled={disabled} variant="success" onClick={() => onRate(100)}>
        Perfect
      </Button>
    </ButtonGroup>
  </div>
)

const CommitButton: FlashcardPresenterAtoms["commitButton"] = ({
  disabled,
  isCorrect,
  onClick,
}) => (
  <Button
    className="mt-4 w-100"
    disabled={disabled}
    onClick={onClick}
    variant={isCorrect ? "success" : "danger"}
  >
    Commit
  </Button>
)

export const flashcardPresenterAtoms: FlashcardPresenterAtoms = {
  as: "div",
  card: Card,
  rateBar: RateBar,
  commitButton: CommitButton,
}
