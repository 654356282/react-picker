const words = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
]

export type IInCascadeData = {
  key: number | string
  data: string
  label: string
}

export type ICascadeData = {
  key: number | string
  data: any
  children: ICascadeData[]
  label: string | number
}
const cascadeData: ICascadeData[] = []
words.forEach((item, idx) => {
  cascadeData.push({
    key: idx,
    data: item,
    children: [],
    label: item,
  })
  let tmp: ICascadeData[] = []
  for (let i = 0; i < 6; i++) {
    let tmpData: ICascadeData = {
      key: i,
      data: item + i,
      children: [
        {
          key: 0,
          data: item + i + "-" + 0,
          children: [],
          label: item + i + "-" + 0,
        },
        {
          key: 1,
          data: item + i + "-" + 1,
          children: [],
          label: item + i + "-" + 1,
        },
      ],
      label: item + i,
    }
    tmp.push(tmpData)
  }
  cascadeData[idx].children = tmp
})

const inCascadeData: IInCascadeData[][] = []
inCascadeData.push(
  words.map((item, idx) => {
    return {
      key: idx,
      data: item,
      label: item,
    }
  })
)
inCascadeData.push(
  words.map((item, idx) => {
    return {
      key: idx + "-1",
      data: item + "-1",
      label: item + "-1",
    }
  })
)
inCascadeData.push(
  words.map((item, idx) => {
    return {
      key: idx + "-2",
      data: item + "-2",
      label: item + "-2",
    }
  })
)

export { cascadeData, inCascadeData }
