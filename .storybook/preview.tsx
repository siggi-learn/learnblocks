import { StoryContext } from "@storybook/react"
import * as React from "react"
import { withPerformance } from "storybook-addon-performance"

const main = (StoryFn: Function, context: StoryContext) => {
  return (
    <>
      {/* FIXME: import styles depending on selected atoms */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
        crossOrigin="anonymous"
      />
      <StoryFn />
    </>
  )
}

export const decorators = [main, withPerformance]
