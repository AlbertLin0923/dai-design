import type { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react'

import classnames from 'classnames'

type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean
  size?: InputSize
  prepend?: string | ReactElement
  append?: string | ReactElement
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = (props) => {
  const { disabled, size, prepend, append, style, ...restProps } = props

  const cnames = classnames('adai-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })

  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }

  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  return (
    <div className={cnames} style={style}>
      {prepend && <div className="adai-input-group-prepend">{prepend}</div>}
      <input type="text" className="adai-input-inner" disabled={disabled} {...restProps} />
      {append && <div className="adai-input-group-append">{append}</div>}
    </div>
  )
}

export default Input
