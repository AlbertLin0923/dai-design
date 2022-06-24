import { useState, useEffect } from "react";

/**
 * @description: 延迟更新，函数防抖
 * @param {any} value
 * @param {*} delay
 * @return {*} 防抖过的函数
 */
function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
