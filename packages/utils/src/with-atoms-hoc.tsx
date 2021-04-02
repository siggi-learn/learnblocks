/**
 * FIXME: Dynamic Atom import
 * - receive and cast atoms from global var
 * - remove all @learnblocks/atoms-... dependencies from package.json
 **/
import { atoms } from "@learnblocks/atoms-bootstrap"
import { AtomsInterface } from "@learnblocks/types"
import * as React from "react"

export function withAtoms<P>(
  Component: React.ComponentType<P & { atoms: AtomsInterface }>,
) {
  return (props: P) => <Component atoms={atoms} {...props} />
}
