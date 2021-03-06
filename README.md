# @654356282/react-picker

### how to install?
```bash
npm install @654356282/react-picker
```

### example
```tsx
import React, { useState } from "react"
import PanelPicker from "@654356282/react-picker"

const inCascadeData:IInCascadeData[][] = [
    [
        {
            key: 'a1',
            data: 'a1',
            label: 'a1'
        },
        {
            key: 'a2',
            data: 'a2',
            label: 'a2'
        }
    ],
    [
        {
            key: 'b1',
            data: 'b1',
            label: 'b1'
        },
        {
            key: 'b2',
            data: 'b2',
            label: 'b2'
        }
    ],
]

const cascadeData:ICascadeData[] = [
    {
        key: 'a',
        data: 'a',
        lable: 'a',
        children: [
            {
                key: 'a1',
                data: 'a1',
                label: 'a1',
                children: []
            },
            {
                key: 'a2',
                data: 'a2',
                label: 'a2',
                children: []
            }
        ]
    },
    {
        key: 'b',
        data: 'b',
        lable: 'b',
        children: [
            {
                key: 'b1',
                data: 'b1',
                label: 'b1',
                children: []
            },
            {
                key: 'b2',
                data: 'b2',
                label: 'b2',
                children: []
            }
        ]
    }    
]

const App = () => {
  const [open, setOpen] = useState(false)
  function handleChange(values: number[]) {
    console.log(values)
  }
  return (
    <>
      <PanelPicker
        onChange={handleChange}
        cols={2}
        data={inCascadeData}
        cascade={false}
        height={400}
        itemHeight={100}
        open={open}
        onCancel={() => {
          setOpen(false)
        }}
      />
      <button onClick={() => setOpen(true)}>打开</button>
    </>
  )
}

export default hot(App)

```

### demo
```bash
yarn start
```

