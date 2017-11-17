import Group from '../components/Group.jsx';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('the group item component', () => {
  let mountedComponent;
  const group = {
    groupId: '-KrAwfM16qbLOig_mSOc',
    groupName: 'Test',
    newMessage: false
  };

  const loggedInUser = {
    displayName: 'nnamisco',
    email: 'nedemenang@gmail.com',
    id: 'TUsUaucS5nb5kuOP6SpvTUcX9vD3',
    isAuthenticated: true,
    phoneNo: null,
    profilePic: '//postitappnnam.herokuapp.com/static/files/blank-profile-pic.png'
  };

  const groupItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<Group group = {group}
        loggedInUser = {loggedInUser} key = {1}/>);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    const component = groupItem();
    expect(component).toBeDefined();
  });


  it('should render without throwing an error', () => {
    const component = groupItem();
    expect(component.contains(group.groupName)).toBe(true);
  });

  it('should match snapshot test', () => {
    const component = groupItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });


  it('should recieve props', () => {
    expect(Object.keys(groupItem().props()).length).toBeGreaterThan(0);
  });
});
