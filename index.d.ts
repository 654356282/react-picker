import * as React from "react"
import { ICascadeData, IInCascadeData } from "./dist/data"
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
