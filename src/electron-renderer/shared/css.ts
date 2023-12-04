import { css } from 'styled-components'

export const ellipsis = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
export const ellipsisL2 = css`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`
export const ellipsisL3 = css`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`
