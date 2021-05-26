# Learnblocks

Composable react components for the creation and display of digital learing
content.

# Goals

- simplify and accelerate the development of learning applications and authoring
  tools
- provide accessible, customizable and easy to use components
- provide a concept/framework for building further components
- provide great UX and DX

# Installation

**Currently the project is in alpha. API changes are extremly likely.**

```sh
$ yarn add @learnblocks/core
# or
$ npm i @learnblocks/core
```

# Example

- [Multiple Choice Presenter](https://codesandbox.io/s/learnblocks-choice-presenter-pgknv?file=/src/index.tsx)
- [Multiple Choice Presenter with Custom Atoms](https://codesandbox.io/s/learnblocks-choice-presenter-custom-atoms-vvizo?file=/src/index.tsx)
- Editor / Presenter Example (TODO)
- Example for custom Atoms which add functionality (e.g. richtext)

# Concept

## Entities (naming)

### Block (Data)

The whole concept of this library revolves around _Blocks_. A _Block_ is a
datastructure which describes an element.

Example:

```JSON
{
  "type": "choice",
  "hideCorrectCount": false,
  "options": [
    { "content": "yes", "isCorrect": true },
    { "content": "no", "isCorrect": true },
    { "content": "maybe", "isCorrect": false },
  ],
}
```

### Editor

An _Editor_ is a react component that takes a block of a certain type as an
input and renders a UI which allows a user to modify the block.

### Presenter

An Presenter is a react component that takes a block of a certain type as an
input and renders a UI that allows to interact with the Block (e.g. answering a
multiple-choice question).

```
 * (user is answering)       (show solution, state may be altered)    (interaction is completed)
 *    [interaction]       -->              [staged]               -->         [committed]
 *                        <--                 ⮠
```

A Presenter has three callbacks: `onChange`, `onStage` and `onCommit`. Each take
the presenter state as an argument. The presenter state contains all the
information to reinitialize the presenter and to determine if an interaction is
completed (committed).

# How to contribute

- Fix Bugs
- Fix `TODO`s and `FIXME`s (see Code)
- Write tests
- Implement more Blocks
  - Fill in the Blanks
  - Feedback
  - (static) Blocks like Text, Images, Video, Embeds
  - What do **YOU** need? Be createive or draw inspiration from
    [H5P](https://h5p.org/)
- Improve default Atoms
- Create new atoms (Maybe with Tailwind?)

# Start Developing

Run `yarn start` to open a storybook containing the currently implemented
learnblocks.

## Add a new component

---

## FIXME: Template is not up-to-date. Do not use.

Run `yarn gen:pkg` and enter a name (lowercase) and a description for the
component you'd like to implement. Run `yarn start` to start if it was not
already started storybook. You should see your component in the storybook. Edit
the files generated at `packages/{{componentName}}/src` to implement your
component.

# Attribution

Parts of this repositories structure are inspired by the
[chakra-ui](https://github.com/chakra-ui/chakra-ui/) project.
