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
  key: number
  data: string
  label: string
}

export type ICascadeData = {
  key: number
  data: string
  children: ICascadeData[]
  label: string
}
const defaultData: ICascadeData[] = []
words.forEach((item, idx) => {
  defaultData.push({
    key: idx,
    data: item,
    children: [],
    label: item,
  })
  let tmp: ICascadeData[] = []
  for (let i = 0; i < 6; i++) {
    tmp.push({
      key: i,
      data: item + i,
      children: [],
      label: item + i,
    })
  }
  defaultData[idx].children = tmp
})

export default defaultData
