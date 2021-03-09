import React, { useEffect, useRef, useState } from "react"
import {
  ChooseArea,
  Content,
  GlobalStyle,
  Header,
  Item,
  List,
  ListContainer,
  OffsetContainer,
  Panel,
  Text,
  vpx,
} from "./styles"
import defaultData, { ICascadeData, IInCascadeData } from "@/data"

function px(x: number) {
  return Number(vpx(x).slice(0, -2))
}

function calibrateValue(min: number, x: number, max: number) {
  return Math.min(Math.max(min, x), max)
}

interface IPanelPicker {
  data?: ICascadeData[] | IInCascadeData[][]
  height?: number
  itemHeight?: number
  onStart?: () => void
  onMove?: () => void
  onEnd?: () => void
  cols?: number
  cascade?: boolean
  onChange?: () => void
}

interface IRecord {
  currentTop: number
  y: number
  lastDiff: number
}

function claimsSpeed(x: number) {
  return Math.min(Math.max(x, -0.25), 0.25)
}

function PanelPicker({
  data = defaultData,
  height = 600,
  itemHeight = 60,
  cols = 2,
  onChange,
  onEnd,
  onMove,
  onStart,
  cascade = true,
}: IPanelPicker) {
  const listDom = useRef<HTMLDivElement[]>([])
  const [curPosY, setCurPosY] = useState([0, 0, 0])

  const { current: record } = useRef<IRecord[]>([])
  const [selectedValues, setSelectedValues] = useState(() => {
    return new Array(cols).fill(0)
  })

  const midLineTop = 0

  function getMidLineBottom(idx: number) {
    let len: number
    if (cascade) {
      let tmp = data as ICascadeData[]
      for (let i = 0; i < idx; i++) {
        tmp = tmp[selectedValues[i]].children
      }
      len = tmp.length
    } else {
      len = (data[idx] as IInCascadeData[]).length
    }
    return px(-itemHeight * (len - 1))
  }

  const { current: animationId } = useRef<number[]>([])

  useEffect(() => {
    for (let i = 0; i < cols; i++) {
      record.push({ currentTop: 0, y: 0, lastDiff: 0 })
      animationId.push(0)
    }
    return () => {
      animationId.forEach(item => {
        cancelAnimationFrame(item)
      })
    }
  }, [cols])

  function changeCurPosY(idx: number, v: number) {
    setCurPosY(state => state.slice(0, idx).concat(v, state.slice(idx + 1)))
  }

  function changeSelectedValues(idx: number, v: number) {
    setSelectedValues(state =>
      state.slice(0, idx).concat(v, state.slice(idx + 1))
    )
  }

  function makeVInRange(idx: number) {
    if (record[idx].currentTop >= midLineTop) {
      record[idx].currentTop = midLineTop
    }
    const midLineBottom = getMidLineBottom(idx)
    if (record[idx].currentTop <= midLineBottom) {
      record[idx].currentTop = midLineBottom
    }
  }

  const handleTouchStart = function (
    e: React.TouchEvent<HTMLDivElement>,
    idx: number
  ) {
    const curRecord = record[idx]
    animationId[idx] && cancelAnimationFrame(animationId[idx])
    if (!curRecord.currentTop) {
      curRecord.currentTop = listDom.current![idx].offsetTop
    }
    curRecord.y = e.touches[0].clientY
    curRecord.lastDiff = 0
    onStart && onStart()
  }

  const handleTouchMove = function (
    e: React.TouchEvent<HTMLDivElement>,
    idx: number
  ) {
    const curRecord = record[idx]
    const curY = e.touches[0].clientY
    let diffY = curY - curRecord.y
    curRecord.y = curY
    curRecord.currentTop += diffY
    curRecord.lastDiff = claimsSpeed(diffY)
    makeVInRange(idx)
    changeCurPosY(idx, curRecord.currentTop)
    onMove && onMove()
  }

  function inertiaRun(i: number) {
    return new Promise<void>(resolve => {
      animationId[i] = requestAnimationFrame(run)
      let preTop: number
      const curRecord = record[i]

      function run() {
        animationId[i] = requestAnimationFrame(run)
        curRecord.lastDiff *= 0.85
        curRecord.currentTop += curRecord.lastDiff
        makeVInRange(i)
        changeCurPosY(i, curRecord.currentTop)
        onMove && onMove()

        if (
          Math.abs(curRecord.lastDiff) <= 0.5 ||
          preTop === curRecord.currentTop
        ) {
          cancelAnimationFrame(animationId[i])
          resolve()
          return
        }
        preTop = curRecord.currentTop
      }
    })
  }

  function calibrationRun(i: number) {
    const curRecord = record[i]

    const speed = 0.8
    const sign = Math.sign(curRecord.lastDiff)
    const dataLen = data.length
    let idx =
      (Math.abs(curRecord.currentTop) / px(dataLen * itemHeight)) * dataLen

    if (Math.abs(idx * 10 - parseInt(idx.toString()) * 10) > 5) {
      if (sign > 0) {
        idx = calibrateValue(0, parseInt(idx.toString()), dataLen - 1)
      } else {
        idx = calibrateValue(0, parseInt((idx - sign).toString()), dataLen - 1)
      }
    } else {
      idx = calibrateValue(0, parseInt(idx.toString()), dataLen - 1)
    }

    const disPos = px(-idx * itemHeight)

    return new Promise<number>(resolve => {
      function run() {
        let base
        if (curRecord.currentTop > disPos) {
          base = -1
        } else {
          base = 1
        }
        animationId[i] = requestAnimationFrame(run)
        curRecord.currentTop += base * speed
        if (Math.abs(curRecord.currentTop - disPos) <= px(1)) {
          curRecord.currentTop = disPos
          changeCurPosY(i, curRecord.currentTop)
          cancelAnimationFrame(animationId[i])
          resolve(idx)
          onMove && onMove()
          return
        }
        changeCurPosY(i, curRecord.currentTop)
        onMove && onMove()
      }

      animationId[i] = requestAnimationFrame(run)
    })
  }

  function resetCols(col: number) {
    changeSelectedValues(col, 0)
    changeCurPosY(col, 0)
    record[col].currentTop = 0
    record[col].lastDiff = 0
    record[col].y = 0
  }

  async function handleTouchEnd(
    e: React.TouchEvent<HTMLDivElement>,
    idx: number
  ) {
    await inertiaRun(idx)
    console.log("end")
    const selectedV = await calibrationRun(idx)
    for (let i = idx + 1; i < cols; i++) {
      resetCols(i)
    }
    changeSelectedValues(idx, selectedV)
    onEnd && onEnd()
  }

  function handleConfirm() {
    onChange && onChange()
  }

  function handleCancel() {}

  const columns = ((): JSX.Element[] => {
    let lists: JSX.Element[] = []
    if (!cascade) {
      for (let i = 0; i < cols; i++) {
        lists.push(
          genListContainer(data[i] as IInCascadeData[], i.toString(), i)
        )
      }
      return lists
    }
    lists.push(genListContainer(data as ICascadeData[], "0", 0))
    if (cascade) {
      let tmp = data as ICascadeData[]
      for (let i = 1; i < cols; i++) {
        tmp = (data[selectedValues[i - 1]] as ICascadeData).children
        lists.push(genListContainer(tmp, i.toString(), i))
      }
    }
    return lists
  })()

  function genListContainer(
    data: IInCascadeData[] | ICascadeData[],
    key: string | number,
    col: number
  ) {
    return (
      <ListContainer key={key}>
        <List
          onTouchStart={e => handleTouchStart(e, col)}
          onTouchMove={e => handleTouchMove(e, col)}
          onTouchEnd={e => handleTouchEnd(e, col)}
          style={{ transform: `translateY(${curPosY[col]}px)` }}
          ref={node => (listDom.current = listDom.current.concat(node!))}
        >
          {data.map((item: IInCascadeData | ICascadeData) => (
            <Item key={item.key} height={itemHeight}>
              <Text>{item.label}</Text>
            </Item>
          ))}
        </List>
      </ListContainer>
    )
  }

  return (
    <Panel height={height}>
      <Header>
        <Text onClick={handleCancel}>取消</Text>
        <Text onClick={handleConfirm}>确定</Text>
      </Header>
      <Content>
        <OffsetContainer height={height} itemHeight={itemHeight}>
          <ChooseArea height={itemHeight} />
          {columns}
        </OffsetContainer>
      </Content>
      <GlobalStyle />
    </Panel>
  )
}

export default PanelPicker
