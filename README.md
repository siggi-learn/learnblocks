# What's this?

Composable react components for the creation and display of digital learing content.

# Entities (naming)

## Block (Data)

The whole concept of this library revolves around _Blocks_.
A _Block_ is described by its type and an instance of a block is represented by a datastructure
of that type. Example:

```typescript
interface IBlock {
  type: string;
}

interface IQuestionBlock extends IBlock {
  question: string;
  modelAnswer: string;
}

const question: IQuestionBlock = {
  type: "question",
  question: "3 + 4 =",
  answer: "7",
};
```

## Atom

An _Atom_ is a react component that is used to compose the editor and presenter components
(see below). The idea is, that you can simply swap the atoms without touching the actual editor
and presenter. This:

- makes learnblocks UI-Component agnostic (use components of your choice e.g. Material UI, Chakra UI, ...).
- allows to customize behaviour (swap plain-text-inputs with custom-inputs. Enable Richtext, Latex etc.)

This is a sketch of a possibilty to inject UI-Components as a dependency.
[Good Idea?](https://stackoverflow.com/questions/66693915/is-it-a-good-idea-to-use-react-context-to-inject-ui-components)

```typescript
import { createContext, FC, useContext } from "react";
import "./styles.css";

// Button Atom
const Button: FC = ({ children }) => <button>{children}</button>;

const atoms = { button: Button };
const AtomContext = createContext(atoms);

// "higher" component
const HigherComponent: FC = () => {
  const atoms = useContext(AtomContext);

  return <atoms.button>click me</atoms.button>;
};

export default function App() {
  return (
    <AtomContext.Provider value={atoms}>
      <HigherComponent />
    </AtomContext.Provider>
  );
}
```

## Editor

An _Editor_ is a react component that takes a block of a certain type as an input and renders a
Userinterface which allows the modification of the block. It must be composed of atoms.

```typescript
const QuestionEditor: IBlockEditor<"question"> = ({ block, onChange }) => {
  const atoms = useContext(AtomContext);
  const handleQuestionChange = (question: string): void =>
    onChange && onChange({ ...block, question });
  const handleAnswerChange = (answer: string): void =>
    onChange && onChange({ ...block, answer });

  return (
    <>
      <atoms.TextArea
        defaultValue={block.question}
        onChange={handleQuestionChange}
      />
      <atoms.TextArea
        defaultValue={block.answer}
        onChange={handleAnswerChange}
      />
    </>
  );
};
```

## Presenter

An Presenter is a react component that takes a block of a certain type as an input and renders a
Userinterface which allows the interaction with the block. The Presenter has two callbacks:
`onChange` and `onSubmit`. Both callbacks take the presenter state as an argument. The presenter
state contains all the information to reinitialize the presenter and to determine if an interaction
is completed (result).

```typescript
const QuestionPresenter: IBlockPresenter<"question"> = ({
  block,
  defaultState,
  onChange,
  onSubmit,
}) => {
  const atoms = useContext(AtomContext);
  const [state, setState] = useState(defaultState);
  const handleAnswerChange = (givenAnswer: string) => {
    const newState = { ...state, givenAnswer };
    setState(newState);
    onChange && onChange(newState);
  };

  const handleSubmit = () => {
    const isCorrect = block.answer === givenAnswer;
    const newState = {
      ...state,
      answerPerformance: isCorrect ? 100 : 0,
      isCorrect,
      isSubmitted: true,
    };
    setState(newState);
    onSubmit && onSubmit(newState);
  };

  return (
    <>
      <atoms.Text>{block.question}</atoms.Text>
      <atoms.TextArea
        defaultValue={state.givenAnswer}
        onChange={handleAnswerChange}
        placeholder="Enter your answer"
      />
      <atoms.Button onClick={handleSubmit}>Submit</atoms.Button>
    </>
  );
};
```
