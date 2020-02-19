/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import UserCard from '../../../components/user/UserCard';

configure({ adapter: new Adapter() });

jest.dontMock('../../../components/user/UserCard');

describe('UserCard Component', () => {
  test('should match the user card snapshot', () => {
    const onClick = jest.fn();
    const Role = {
      title: '',
      description: ''
    };
    const component = shallow(
      <UserCard
        firstName={'Eguono'}
        id={3}
        lastName={'Efe'}
        email={'efe@gmail.com'}
        onClick={onClick}
        Role={Role}
        createdAt={'today'} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
