import * as React from "react"
// import { TextEditor, TextPresenter } from "../src";

export default {
  title: "Text",
  decorators: [(story: Function) => <div>{story()}</div>],
}

export const Basic = () => <h1>Hi Text</h1>
