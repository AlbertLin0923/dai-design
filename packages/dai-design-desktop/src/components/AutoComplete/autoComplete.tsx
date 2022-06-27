import type { FC, ChangeEvent, KeyboardEvent, ReactElement } from 'react'
import { useState, useEffect, useRef } from 'react'

import classNames from 'classnames'

import type { InputProps } from '../Input/input'
import Input from '../Input/input'

import Transition from '../Transition/transition'

import useDebounce from '../../helpers/useDebounce'

import useClickOutside from '../../helpers/useClickOutside'

interface DataSourceObject {
  value: string
}

export type DataSourceType<T = Record<string, any>> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props

  const [inputValue, setInputValue] = useState(value as string)

  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])

  const [loading, setLoading] = useState(false)

  const [showDropdown, setShowDropdown] = useState(false)

  const [highlightIndex, setHighlightIndex] = useState(-1)

  const triggerSearch = useRef(false)

  const componentRef = useRef<HTMLDivElement>(null)

  const debouncedValue = useDebounce(inputValue, 300)

  useClickOutside(componentRef, () => {
    setSuggestions([])
  })

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setSuggestions([])

      const results = fetchSuggestions(debouncedValue)

      if (results instanceof Promise) {
        setLoading(true)
        results.then((data) => {
          setLoading(false)
          setSuggestions(data)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        setSuggestions(results)
        setShowDropdown(true)
        if (results.length > 0) {
          setShowDropdown(true)
        }
      }
    } else {
      setShowDropdown(false)
    }
    setHighlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])

  const highlight = (index: number) => {
    let _r: number = -1
    if (index < 0) {
      _r = 0
    }
    if (index >= suggestions.length) {
      _r = suggestions.length - 1
    }
    setHighlightIndex(_r)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.trim()
    setInputValue(v)
    triggerSearch.current = true
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)

    setShowDropdown(false)
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    console.log(e.key)
    switch (e.key) {
      case 'Enter':
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 'ArrowUp':
        highlight(highlightIndex - 1)
        break

      case 'ArrowDown':
        highlight(highlightIndex + 1)
        break
      case 'Escape':
        setShowDropdown(false)
        break
      default:
        break
    }
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSuggestions([])
        }}
      >
        <ul className="adai-suggestion-list">
          {suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex
            })

            return (
              <li
                key={index}
                className={cnames}
                onClick={() => {
                  handleSelect(item)
                }}
              >
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }

  return (
    <div className="adai-auto-complete" ref={componentRef}>
      <Input value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} {...restProps} />
      {generateDropdown()}
    </div>
  )
}
