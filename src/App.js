import React, {useEffect, useRef, useState} from 'react'
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
} from "./styles";
import defaultData from "./data";


function px(x) {
    return Number(vpx(x).slice(0, -2))
}

function calibrateValue(min, x, max) {
    return Math.min(Math.max(min, x), max)
}

function PanelPicker({
                         data = defaultData, height = 600, itemHeight = 60, onStart = () => {
        console.log("start")
    }, onMove = () => {
        console.log("move")
    }, onEnd = () => {
        console.log("end")
    },
    columns=2
                     }) {
    const midLineTop = 0
    const midLineBottom = px(-itemHeight * (data.length - 1))

    const listDom = useRef(null)
    const parentDom = useRef(null)
    const [curPosY, setCurPosY] = useState(0)

    const {current: record} = useRef({currentTop: 0, y: 0, lastDiff: 0})


    function makeVInRange() {
        if (record.currentTop >= midLineTop) {
            record.currentTop = midLineTop
        }
        if (record.currentTop <= midLineBottom) {
            record.currentTop = midLineBottom
        }
    }

    const animationId = useRef(0)

    function handleTouchStart(e) {
        animationId.current && cancelAnimationFrame(animationId.current)
        if (!record.currentTop) {
            record.currentTop = listDom.current.offsetTop
        }
        record.y = e.touches[0].clientY
        onStart()
    }

    function handleTouchMove(e) {
        const curY = e.touches[0].clientY
        const diffY = curY - record.y
        record.y = curY
        record.currentTop += diffY
        record.lastDiff = diffY
        makeVInRange()
        setCurPosY(state => {
            return record.currentTop
        })
        onMove()
    }


    function inertiaRun() {
        return new Promise(resolve => {
            animationId.current = requestAnimationFrame(run)
            let preTop

            function run() {
                animationId.current = requestAnimationFrame(run)
                record.lastDiff *= 0.9
                record.currentTop += record.lastDiff
                makeVInRange()
                setCurPosY(record.currentTop)
                onMove()

                if (Math.abs(record.lastDiff) <= 1 || preTop === record.currentTop) {
                    cancelAnimationFrame(animationId.current)
                    resolve()
                    return
                }
                preTop = record.currentTop
            }
        })
    }

    function calibrationRun() {
        const speed = 1
        const sign = Math.sign(record.lastDiff)
        const dataLen = data.length
        let idx = Math.abs(record.currentTop) / px(dataLen * itemHeight) * dataLen

        if (Math.abs(idx * 10 - parseInt(idx.toString()) * 10) > 5) {
            idx = calibrateValue(0, parseInt((idx - sign).toString()), dataLen-1)
        } else {
            idx = calibrateValue(0, parseInt(idx.toString()), dataLen-1)
        }


        const disPos = px(-idx * itemHeight)

        return new Promise(resolve => {
            function run() {
                let base
                if (record.currentTop > disPos) {
                    base = -1
                } else {
                    base = 1
                }
                animationId.current = requestAnimationFrame(run)
                record.currentTop += base * speed
                if (Math.abs(record.currentTop - disPos) <= 1) {
                    record.currentTop = disPos
                    setCurPosY(record.currentTop)
                    cancelAnimationFrame(animationId.current)
                    resolve()
                    onMove()
                    return
                }
                setCurPosY(record.currentTop)
                onMove()
            }

            animationId.current = requestAnimationFrame(run)
        })
    }

    useEffect(() => {
        return () => {
            animationId.current && cancelAnimationFrame(animationId.current)
        }
    }, [])

    async function handleTouchEnd() {
        await inertiaRun()
        await calibrationRun()
        onEnd()
    }

    return (
        <Panel height={height}>
            <Header>
                <Text>取消</Text>
                <Text>确定</Text>
            </Header>
            <Content ref={parentDom}>
                <OffsetContainer height={height} itemHeight={itemHeight}>
                    <ChooseArea height={itemHeight}/>
                    <ListContainer>
                        <List
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            style={{transform: `translateY(${curPosY}px)`}}
                            ref={listDom}
                        >
                            {data.map(item => (
                                <Item
                                    key={item.key}
                                    height={itemHeight}
                                >
                                    <Text>{item.data}</Text>
                                </Item>)
                            )}
                        </List>
                    </ListContainer>
                    <ListContainer>
                        <List
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            style={{transform: `translateY(${curPosY}px)`}}
                            ref={listDom}
                        >
                            {data.map(item => (
                                <Item
                                    key={item.key}
                                    height={itemHeight}
                                >
                                    <Text>{item.data}</Text>
                                </Item>)
                            )}
                        </List>
                    </ListContainer>
                </OffsetContainer>
            </Content>
            <GlobalStyle/>
        </Panel>
    )
}

export default PanelPicker;
