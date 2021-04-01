import { AnswerState, Block } from "@learnblocks/utils"

export interface ShortTextAnswerBlock extends Block {
  correctAnswer: string
}

export interface ShortTextAnswerAnswerState extends AnswerState {
  givenAnswer: string
}
