import { useEffect, useState } from "react"

/**
 * คืนค่า `value` หลังหยุดเปลี่ยนนาน `delayMs` มิลลิวินาที
 * ใช้รอให้พิมพ์จบก่อนคำนวณ/เรียก side effect
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = globalThis.setTimeout(() => {
      setDebounced(value)
    }, delayMs)
    return () => {
      globalThis.clearTimeout(id)
    }
  }, [value, delayMs])

  return debounced
}
