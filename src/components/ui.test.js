import { shallowMount } from 'enzyme';
import UI from './ui';

/**
 * Note: tests for components are incomplete since I am unable to run them
 * and compile the ink component using es6.
 *
 * Todo: Resolve this ^
 */

test('<UI>', () => {
  const wrapper = shallowMount(UI);

  expect(wrapper.name()).toEqual('div');
})
