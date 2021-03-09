import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "@/App"

document.body.addEventListener(
  "touchmove",
  function (e) {
    e.preventDefault()
  },
  { passive: false }
)

ReactDOM.render(<App />, document.getElementById("root"))
