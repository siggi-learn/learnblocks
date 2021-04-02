import { AtomsInterface } from "@learnblocks/types"
import * as React from "react"
import { Button, Form } from "react-bootstrap"

export const SubmitAnswerButtonAtom = (props: any) => (
  <Button {...props}>Abschicken</Button>
)
export const FormAtom = (props: any) => <Form {...props} />
export const TextinputAtom = (props: any) => (
  <Form.Control type="text" {...props} />
)
export const TextAtom = (props: any) => <p {...props} />
export const TextAreaAtom = (props: any) => (
  <Form.Control as="textarea" {...props} />
)

export const CorrectDisplay: AtomsInterface["correctDisplay"] = ({
  isCorrect,
}) => <>{isCorrect ? "Richtig 🎉" : "Falsch 🙁"}</>

export const ScoreDisplay: AtomsInterface["scoreDisplay"] = ({
  score,
  scoreMax,
}) => (
  <>
    {score} / {scoreMax} Punkten
  </>
)

export const atoms: AtomsInterface = {
  submitAnswerButton: SubmitAnswerButtonAtom,
  scoreDisplay: ScoreDisplay,
  correctDisplay: CorrectDisplay,
  form: FormAtom,
  text: TextAtom,
  textinput: TextinputAtom,
  textarea: TextAreaAtom,
}
