import { AtomsInterface } from "./atoms"
import { Block } from "./data"

export type BlockEditorProps<T extends Block> = {
  atoms: AtomsInterface
  block: T
  onChange?: (block: T) => void
}

export type BlockEditor<T extends Block> = (
  props: BlockEditorProps<T>,
) => React.ReactElement
