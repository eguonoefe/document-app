/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import {
  DocumentContainer
} from '../../../components/documents/DocumentContainer';

configure({ adapter: new Adapter() });

describe('Document Container', () => {
  const props = {
    document: { title: 'Eguono', id: 3, content: 'john', access: 'role' },
    createDocument: jest.fn(() => Promise.resolve()),
    history: {
      push: jest.fn()
    },
    match: {
      url: ''
    },
  };
  const component = shallow(<DocumentContainer {...props} />);
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  describe('Container', () => {
    test('should match snapshot of document Container', () => {
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
    test('onChange function should run when called', () => {
      component.instance().onChange(
        { target: { value: 'eguono', name: 'title' } });
      component.instance().onChange(
        { target: { value: 'efe', name: 'content' } });
      component.instance().onChange(
        { target: { value: 'public', name: 'access' } });
      expect(component.state('title')).toEqual('eguono');
      expect(component.state('content')).toEqual('efe');
      expect(component.state('access')).toEqual('public');
      const spy = jest.spyOn(component.instance(), 'onSubmit');
      component.instance().onSubmit();
      expect(spy).toHaveBeenCalled();
    });
    test('onChange function should run when called', () => {
      component.instance().onChange(
        { target: { value: '', name: 'title' } });
      component.instance().onChange(
        { target: { value: 'efe', name: 'content' } });
      component.instance().onChange(
        { target: { value: 'public', name: 'access' } });
      expect(component.state('title')).toEqual('');
      expect(component.state('content')).toEqual('efe');
      expect(component.state('access')).toEqual('public');
      const spy = jest.spyOn(component.instance(), 'onSubmit');
      component.instance().onSubmit();
      expect(spy).toHaveBeenCalled();
    });
  });
});
