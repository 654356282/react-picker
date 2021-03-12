import { hot } from "react-hot-loader/root"
import PanelPicker from "../src/Picker"
import React, { useState } from "react"
import { cascadeData, inCascadeData } from "../src/data"

const App = () => {
  const [open, setOpen] = useState(false)
  function handleChange(values: number[]) {
    console.log(values)
  }
  return (
    <>
      <PanelPicker
        onChange={handleChange}
        cols={3}
        data={inCascadeData}
        cascade={false}
        height={400}
        itemHeight={100}
        open={open}
        onCancel={() => {
          console.log(1)
          setOpen(false)
        }}
      />
      <button onClick={() => setOpen(true)}>打开</button>
    </>
  )
}

export default hot(App)
