import type { FC } from 'react'
import React from 'react'

export interface ProgressProps {
  percent: number
  strokeHeight?: number
  showText?: boolean
  styles?: React.CSSProperties
}

const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles } = props

  return (
    <div className="adai-progress-bar" style={styles}>
      <div className="adai-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
        <div className={`adai-progress-bar-inner`} style={{ width: `${percent}%` }}>
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true
}

export default Progress
