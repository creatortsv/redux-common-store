import {
  CommonInstance,
  Writable,
} from '..'

export const SET_INSTANCES = 'SET_INSTANCES'
export const ADD_INSTANCES = 'ADD_INSTANCES'
export const UPD_INSTANCES = 'UPD_INSTANCES'
export const DEL_INSTANCES = 'DEL_INSTANCES'

export interface CommonAction {
  type: string,
  [key: string]: unknown,
}

export interface NamedAction {
  name: string,
}

export type ActionFn<T extends T[number][], R extends CommonAction = CommonAction> = (...payload: T) => R

interface SetInstancesAction<T> extends NamedAction {
  type: typeof SET_INSTANCES,
  data: T[],
}

interface AddInstancesAction<T> extends NamedAction {
  type: typeof ADD_INSTANCES,
  data: T[],
}

interface UpdateInstancesAction<T> extends NamedAction {
  type: typeof UPD_INSTANCES,
  data: T[],
}

interface DeleteInstancesAction extends NamedAction {
  type: typeof DEL_INSTANCES,
  identifiers: string[],
}

export type CommonActions<T extends CommonInstance> =
  SetInstancesAction<T> |
  AddInstancesAction<T> |
  UpdateInstancesAction<Required<Pick<T, "id">> & Writable<Partial<T>>> |
  DeleteInstancesAction 