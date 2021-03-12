import styled from "styled-components"
import { createGlobalStyle } from "styled-components"

const winW = window.innerWidth

export function vw(x: number) {
  return `${(x * 100) / 750}vw`
}

export function vpx(x: number) {
  return `${px(x)}px`
}

export function px(x: number) {
  return (x / 750) * winW
}

export const Panel = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background-color: white;
  height: ${(p: { height: number }) => vpx(p.height)};
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 10%;
  background-color: white;
`

export const GlobalStyle = createGlobalStyle`
html, body {
  height: 100vh;
  width: 100vw;
  margin: 0;
}
.slide-in-appear {
transform: translateY(100%);
}
.slide-in-appear-active, .slide-in-appear-done {
transform: translateY(0);
transition: transform 300ms;
}
.slide-in-enter {
transform: translateY(100%);
}
.slide-in-enter-active, .slide-in-enter-done {
transform: translateY(0);
transition: transform 300ms;
}
.slide-in-exit {
transform: translateY(0);
}
.slide-in-exit-active, .slide-in-exit-done {
transform: translateY(100%);
transition: transform 300ms;
}
.slide-in-exit-done {
visibility: hidden;
}
`

export const Content = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 90%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  overflow: hidden;
`

export const LinearBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  background: linear-gradient(
        0deg,
        hsla(0, 0%, 100%, 0.4),
        hsla(0, 0%, 100%, 0.9)
      )
      no-repeat top/100%
      ${(p: { height: number; itemHeight: number }) =>
        vpx((p.height * 0.9) / 2 - p.itemHeight / 2)},
    linear-gradient(180deg, hsla(0, 0%, 100%, 0.4), hsla(0, 0%, 100%, 0.9))
      no-repeat bottom center/ 100%
      ${(p: { height: number; itemHeight: number }) =>
        vpx((p.height * 0.9) / 2 - p.itemHeight / 2)};
`

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`

interface IItemProps {
  height: number
}

export const Item = styled.div`
  height: ${(p: IItemProps) => vpx(p.height)};
  text-align: center;
`

interface ITextProps {
  size?: number
}

export const Text = styled.div`
  display: inline-block;
  position: relative;
  font-size: ${(p: ITextProps) => vpx(p.size || 24)};
  line-height: ${(p: ITextProps) => vpx(p.size || 24)};
  top: 50%;
  margin-top: ${(p: ITextProps) => vpx(-(p.size || 24) / 2)};
  vertical-align: top;
`

export const Cancel = styled(Text)`
  margin-left: ${vw(20)};
`

export const Confirm = styled(Text)`
  margin-right: ${vw(20)};
`

export const OffsetContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(p: { height: number; itemHeight: number }) =>
    vpx((p.height * 0.9) / 2 - p.itemHeight / 2)};
  width: 100%;
  height: 100%;
`

export const ChooseArea = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: ${(p: { height: number }) => vpx(p.height)};
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  pointer-events: none;
  background-color: #eeeded;
  border-color: rgba(0, 0, 0, 0.1);
`

export const List = styled.div`
  width: 100%;
`
