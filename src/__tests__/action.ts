import * as Action from '../action';

describe('Action functions', () => {
  test('It should create an action function, execute and return action object', () => {
    const action = Action.makeAction(Action.SET_INSTANCES, 'active', 'foo');
    expect(action(true, 'bar')).toStrictEqual({
      type: Action.SET_INSTANCES,
      active: true,
      foo: 'bar',
    });
  });

  test('It should create a named action function, execute and return action object', () => {
    const action = Action.makeNamedAction('some', Action.SET_INSTANCES, 'active', 'foo');
    expect(action(true, 'bar')).toStrictEqual({
      type: Action.SET_INSTANCES,
      name: 'some',
      active: true,
      foo: 'bar',
    });
  });
});

describe('toObjects function', () => {
  test('It should convert arguments to objects with map by payload', () => {
    expect(['id', 'name'].map(Action.toObjects.bind(null, [1, 'test']))).toStrictEqual([{ id: 1 }, { name: 'test' }]);
  });
});
