import User from '../components/User.jsx';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('the user item component', () => {
  let mountedComponent;
  const group = {
    groupId: '-KrAwfM16qbLOig_mSOc',
    groupname: 'Test',
    newMessage: false
  };

  const loggedInUser = {
    displayName: 'nnamisco',
    email: 'nedemenang@gmail.com',
    id: 'TUsUaucS5nb5kuOP6SpvTUcX9vD3',
    isAuthenticated: true,
    phoneNo: null,
    profilePic: 'postitappnnam.herokuapp.com/static/files/blank-profile-pic.png'
  };

  const user = {
    userName: 'nnamisco',
    email: 'nedemenang@gmail.com',
    id: 'TUsUaucS5nb5kuOP6SpvTUcX9vD3',
    profilePic: 'postitappnnam.herokuapp.com/static/files/blank-profile-pic.png'
  };

  const userItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<User selectedGroup = {group}
      user = {user} loggedInUser = {loggedInUser} key = {1}/>);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    const component = userItem();
    expect(component).toBeDefined();
  });


  it('should render without throwing an error', () => {
    const component = userItem();
    expect(component.contains(user.userName)).toBe(true);
  });

  it('should match snapshot test', () => {
    const component = userItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });


  it('should recieve props', () => {
    expect(Object.keys(userItem().props()).length).toBeGreaterThan(0);
    expect(userItem().instance().props.loggedInUser).toEqual(loggedInUser);
    expect(userItem().instance().props.selectedGroup).toEqual(group);
    expect(userItem().instance().props.user).toEqual(user);
  });
});
