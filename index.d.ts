import * as React from "react"

export declare type IInCascadeData = {
  key: number | string
  data: string
  label: string
}
export declare type ICascadeData = {
  key: number | string
  data: any
  children: ICascadeData[]
  label: string | number
}
declare const cascadeData: ICascadeData[]
declare const inCascadeData: IInCascadeData[][]

interface IPanelPicker {
  open: boolean
  onCancel: () => void
  data: ICascadeData[] | IInCascadeData[][]
  cols: number
  cascade: boolean
  height?: number
  itemHeight?: number
  onStart?: () => void
  onMove?: () => void
  onEnd?: () => void
  onChange?: (selectedValues: number[]) => void
}
declare function PanelPicker({
  data,
  height,
  itemHeight,
  cols,
  onChange,
  onEnd,
  onMove,
  onStart,
  cascade,
  open,
  onCancel,
}: IPanelPicker): React.ReactPortal
export default PanelPicker
