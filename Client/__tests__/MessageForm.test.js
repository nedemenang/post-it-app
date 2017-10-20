import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MessageForm from '../components/MessageForm.jsx';

describe('the Message form component', () => {
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

  const group = {
    groupId: 'TUsUaucS5nb5kuOP6SpvTUcX9vD3',
    groupname: 'Test Group'
  }

  const messageFormItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<MessageForm loggedInUser = {loggedInUser} selectedGroup={group} key = {1}/>);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    const component = messageFormItem();
    expect(component).toBeDefined();
  });

  it('should match snapshot test', () => {
    const component = messageFormItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should recieve props', () => {
    expect(Object.keys(messageFormItem().props()).length).toBeGreaterThan(0);
  });

  it('should call function on submit of form', () => {
    const component = shallow(<MessageForm loggedInUser = {loggedInUser}/>);
    const preventDefault = jest.fn();
    component.find('button').simulate('click', { preventDefault });
    expect(preventDefault).toBeCalled();
  });

  it('should update state on message field change', () => {
    messageFormItem().find('#message').simulate('change', { target: {
      value: 'New message'
    } });
    expect(messageFormItem().state().message).toBe('New message');
  });

  it('should update state on priority field change', () => {
    messageFormItem().find('.form-select').simulate('change', { target: {
      value: 'urgent'
    } });
    expect(messageFormItem().state().priority).toBe('urgent');
  });
});
