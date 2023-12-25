export type ArrayElementType<T> = T extends (infer U)[] ? U : never

export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType>
  ? ElementType
  : never
