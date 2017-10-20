import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import appAction from '../actions/AppActions';
import GroupForm from '../components/GroupForm.jsx';

describe('the group form component', () => {
  let mountedComponent;
  jest.mock('../dispatcher/AppDispatcher');

  const str = location.href;
  const str2 = str.replace('#', ' ');

  const loggedInUser = {
    displayName: 'nnamisco',
    email: 'nedemenang@gmail.com',
    id: 'TUsUaucS5nb5kuOP6SpvTUcX9vD3',
    isAuthenticated: true,
    phoneNo: null,
    profilePic: `${str2}static/files/blank-profile-pic.png`
  };

  const groupFormItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<GroupForm loggedInUser = {loggedInUser} key = {1}/>);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    const component = groupFormItem();
    expect(component).toBeDefined();
  });

  it('should match snapshot test', () => {
    const component = groupFormItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should recieve props', () => {
    expect(Object.keys(groupFormItem().props()).length).toBeGreaterThan(0);
  });

  it('should call function on submit of form', () => {
    const component = shallow(<GroupForm loggedInUser = {loggedInUser}/>);
    const preventDefault = jest.fn();
    component.find('form').simulate('submit', { preventDefault });
    expect(preventDefault).toBeCalled();
  });

  it('should update state on input field change', () => {
    const input = groupFormItem().find('input').first();
    input.simulate('change', { target: {
      value: 'New Group'
    } });
    expect(groupFormItem().state().groupname).toBe('New Group');
  });
});
