import { MutableRefObject } from "react"
import { Block, PresenterState } from "./data"

export interface Atoms {
  as: React.ComponentType<any> | string
  [key: string]: React.ComponentType<any> | string | undefined
}

export type BlockEditorProps<A extends Atoms, B extends Block> = {
  atoms: A
  block: B
  onChange?: (block: B) => void
}

export type BlockEditor<
  A extends Atoms,
  B extends Block,
  P = unknown
> = React.ComponentType<BlockEditorProps<A, B> & P>

export interface BlockPresenterProps<
  A extends Atoms,
  B extends Block,
  S extends PresenterState = PresenterState
> {
  atoms: A
  block: B
  feedbackDisabled?: boolean
  initialState?: S
  onChange?: (presenterState: S) => void
  onStage?: (presenterState: S) => void
  onCommit?: (presenterState: S) => void
  stageRef?: MutableRefObject<(() => void) | undefined>
  commitRef?: MutableRefObject<(() => void) | undefined>
  setStateRef?: MutableRefObject<
    ((value: React.SetStateAction<S>) => void) | undefined
  >
}

export type BlockPresenter<
  A extends Atoms,
  B extends Block,
  S extends PresenterState = PresenterState,
  P = unknown
> = React.ComponentType<BlockPresenterProps<A, B, S> & P>
