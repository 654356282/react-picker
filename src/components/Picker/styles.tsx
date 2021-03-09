import styled, { createGlobalStyle } from "styled-components"

const winW = window.innerWidth

export function vw(x: number) {
  return `${(x * 100) / 750}vw`
}

export function vpx(x: number) {
  return `${(x / 750) * winW}px`
}

export const Panel = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  margin: auto;
  width: 100vw;
  background-color: red;
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
  background-color: blue;
  height: 100vh;
  width: 100vw;
  margin: 0;
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

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //justify-content: center;
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
  background-color: white;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  pointer-events: none;
`

export const List = styled.div`
  width: 100%;
`
