import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import GroupList from '../components/GroupList.jsx';

describe('the group list component', () => {
  let mountedComponent;

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

  const group = { groupId: 'TUsUaucS5nb5kuOP6SpvTUcX9v3',
    groupName: 'Test Group',
    newMessage: false };

  const groups = [{ groupId: 'TUsUaucS5nb5kuOP6SpvTUcX9v3',
    groupName: 'Test Group',
    newMessage: false },
  { groupId: 'TUsUaucS5nb5kuOP6SpvTUcX5v3',
    groupName: 'Test Group2',
    newMessage: false },
  { groupId: 'TUsUaucS5nb5kuOP6SpvTUdX9v3',
    groupName: 'Test Group3',
    newMessage: true }];


  const groupListItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<GroupList groups = {groups}
      selectedGroup={group} loggedInUser = {loggedInUser}/>);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    const component = groupListItem();
    expect(component).toBeDefined();
  });

  it('should match snapshot test', () => {
    const component = groupListItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should call function on click', () => {
    const component = shallow(<GroupList groups = {groups}
      selectedGroup={group} loggedInUser = {loggedInUser}/>);
    component.find('.button').simulate('Click');
    expect(component).toMatchSnapshot();
  });

  it('should recieve props', () => {
    expect(Object.keys(groupListItem().props()).length).toBeGreaterThan(0);
    expect(groupListItem().instance().props.groups).toEqual(groups);
    expect(groupListItem().instance().props.selectedGroup).toEqual(group);
    expect(groupListItem().instance().props.loggedInUser).toEqual(loggedInUser);
  });
});
