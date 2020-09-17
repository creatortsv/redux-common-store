export interface Identifired {
  id: string,
}

export interface CommonInstance extends Readonly<Identifired> {}

export type Writable<T> = {
  -readonly [K in keyof T]: T[K]
}