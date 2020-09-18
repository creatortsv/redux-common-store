/**
 * The redux normalized data shape with specified type T
 * @readonly
 */
export interface Identifired<T> {
  readonly [identifier: string]: T;
}

/**
 * The redux normalized data shape with specified type T
 * @readonly
 */
export interface WithIdentifired<T> {
  readonly data: Identifired<T>;
}

/**
 * The redux normalized list of identifiers
 */
export interface WithAllIdentifiers {
  readonly identifiers: string[];
}
