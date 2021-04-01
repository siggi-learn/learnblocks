import { StoryContext } from "@storybook/react"
import * as React from "react"
import { withPerformance } from "storybook-addon-performance"

const main = (StoryFn: Function, context: StoryContext) => {
  return <StoryFn />
}

export const decorators = [main, withPerformance]
