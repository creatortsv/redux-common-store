import { Reducer } from 'redux'
import { CommonInstance } from '..'
import * as Action from '../action'
import * as Stack from './stack'

/**
 * The normalized data shape
 * @readonly
 * @property {Identifired<T>} data
 * @property {string[]} [identifiers]
 */
export interface Normalized<T> extends Stack.WithIdentifired<T>, Partial<Stack.WithAllIdentifiers> {}

export type NamedReducerFn = <
	T extends CommonInstance,
	S extends Normalized<T>,
>(
	reducerName: string,
	initialState: S,
) => Reducer<S | undefined, Action.CommonActions<T>>

export const createNamedReducer: NamedReducerFn = (
	reducerName,
	initialState,
) => (state = initialState, { name, ...action }) => {
	if (name !== reducerName) {
		return state
	}

	switch (action.type) {
		case Action.SET_INSTANCES: {
			return state
		}
		case Action.ADD_INSTANCES: {
			return state
		}
		case Action.UPD_INSTANCES: {
			return state
		}
		case Action.DEL_INSTANCES: {
			const { identifiers } = action
			const data: typeof state.data = {}

			Object
				.keys(state.data)
				.filter(id => identifiers.indexOf(id) < 0)
				.forEach(id => Object.assign(data, { [id]: state.data[id] }))

			return Object.assign({}, { ...state, data }, !!state.identifiers ? { identifiers: Object.keys(data) } : {})
		}
		default:
			return state
	}
} 