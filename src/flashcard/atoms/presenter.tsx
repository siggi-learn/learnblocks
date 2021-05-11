import * as React from "react"
import { Button, ButtonGroup } from "react-bootstrap"
import { FlashcardPresenterAtoms } from "../types"

const CardSide: FlashcardPresenterAtoms["front"] = ({
  content,
  onFlip,
  visible,
}) => {
  if (!visible) return null

  return (
    <button
      onClick={onFlip}
      className="cursor-pointer rounded-lg shadow-sm bg-light border d-block w-100"
      style={{ minHeight: "300px", fontSize: "2rem" }}
    >
      {content}
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
      <Button disabled={disabled} variant="warning" onClick={() => onRate(60)}>
        Alright
      </Button>
      <Button disabled={disabled} variant="success" onClick={() => onRate(100)}>
        Perfect
      </Button>
    </ButtonGroup>
  </div>
)

const CommitButton: FlashcardPresenterAtoms["commitButton"] = ({
  isCorrect,
  onClick,
}) => (
  <Button
    variant={isCorrect ? "success" : "danger"}
    onClick={onClick}
    className="mt-4 w-100"
  >
    Commit
  </Button>
)

export const flashcardPresenterAtoms: FlashcardPresenterAtoms = {
  as: "div",
  back: CardSide,
  front: CardSide,
  rateBar: RateBar,
  commitButton: CommitButton,
}
