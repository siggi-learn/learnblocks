export interface AtomsInterface {
  // TBD
  submitAnswerButton: (props: any) => React.ReactElement
  scoreDisplay: (props: {
    score?: number
    scoreMax?: number
  }) => React.ReactElement
  correctDisplay: (props: { isCorrect?: boolean }) => React.ReactElement
  form: (props: any) => React.ReactElement
  text: (props: any) => React.ReactElement
  textinput: (props: any) => React.ReactElement
  textarea: (props: any) => React.ReactElement
}
