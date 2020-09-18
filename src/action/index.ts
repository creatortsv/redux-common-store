import { CommonInstance, Updatable, Compare, Named } from '..';

export const SET_INSTANCES = 'SET_INSTANCES';
export const ADD_INSTANCES = 'ADD_INSTANCES';
export const UPD_INSTANCES = 'UPD_INSTANCES';
export const DEL_INSTANCES = 'DEL_INSTANCES';

export interface CommonAction {
  type: string;
  [key: string]: unknown;
}

interface SetInstancesAction<T> extends Named, CommonAction {
  type: typeof SET_INSTANCES;
  data: T[];
}

interface AddInstancesAction<T> extends Named, CommonAction {
  type: typeof ADD_INSTANCES;
  data: T[];
}

interface UpdateInstancesAction<T> extends Named, CommonAction {
  type: typeof UPD_INSTANCES;
  data: T[];
}

interface DeleteInstancesAction extends Named, CommonAction {
  type: typeof DEL_INSTANCES;
  identifiers: string[];
}

export type CommonActions<T extends CommonInstance = CommonInstance> =
  | SetInstancesAction<T>
  | AddInstancesAction<T>
  | UpdateInstancesAction<Updatable<T, 'id'>>
  | DeleteInstancesAction;

export type Fn<T extends T[number][], R extends CommonAction = CommonAction> = (...payload: T) => R;
export type CreatorFn = <
  T extends T[number][],
  S extends CommonAction = Updatable<CommonActions<Compare<T[number], CommonInstance>>, 'type'>
>(
  type: S['type'],
  ...args: string[]
) => Fn<T, S>;

export type NamedCreatorFn = <
  T extends T[number][],
  S extends CommonAction = Updatable<CommonActions<Compare<T[number], CommonInstance>>, 'type' | 'name'>
>(
  name: string,
  type: S['type'],
  ...args: string[]
) => Fn<T, S>;

export function toObjects<T extends T[number][]>(payload: T, arg: string, i: number): T[number] {
  return { [arg]: payload[i] };
}

export const makeNamedAction: NamedCreatorFn = (name, type, ...args) => (...payload) =>
  Object.assign({ type, name }, ...args.map(toObjects.bind(null, payload)));

export const makeAction: CreatorFn = (type, ...args) => (...payload) =>
  Object.assign({ type }, ...args.map(toObjects.bind(null, payload)));
