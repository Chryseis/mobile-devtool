export const getStyle = (element: HTMLElement): CSSStyleDeclaration => {
  return getComputedStyle(element)
}

export const calcWidth = (value: number | string, totalWidth: number): number => {
  if (Number.isInteger(value)) {
    return value as number
  } else if (/px$/.test(value as string)) {
    return Number((value as string).replace(/px$/, ''))
  } else {
    const number = (value as string).replace(/vw$|%$/, '')
    return (Number(number) / 100) * totalWidth
  }
}
