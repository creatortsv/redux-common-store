export interface Identifired {
  id: number | string,
}

export interface Named {
  name: string,
}

export interface CommonInstance extends Readonly<Identifired> {}
export type Updatable<T, K extends keyof T> = Pick<T, K> & Writable<Partial<T>>

export type Writable<T> = {
  -readonly [K in keyof T]: T[K]
}

export type Unpack<T> = T extends (infer U)[] ? U : T;
export type Compare<T, D> = Unpack<T> extends D ? Unpack<T> : D