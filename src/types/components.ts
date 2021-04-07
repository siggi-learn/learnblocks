import { AnswerState, Block } from "./data"

export interface Atoms {
  as: React.ComponentType<any> | string
  [key: string]: React.ComponentType<any> | string
}

export type BlockEditorProps<A extends Atoms, B extends Block> = {
  atoms: A
  block: B
  onChange?: (block: B) => void
}

export type BlockEditor<A extends Atoms, B extends Block> = React.ComponentType<
  BlockEditorProps<A, B>
>

export interface BlockPresenterProps<
  A extends Atoms,
  B extends Block,
  S extends AnswerState = AnswerState
> {
  atoms: A
  block: B
  defaultAnswerState?: S
  hideFeedback?: boolean
  onResult?: (result: S) => void
}

export type BlockPresenter<
  A extends Atoms,
  B extends Block,
  S extends AnswerState = AnswerState
> = React.ComponentType<BlockPresenterProps<A, B, S>>
