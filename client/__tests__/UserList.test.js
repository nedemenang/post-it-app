import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import UserList from '../components/UserList.jsx';

describe('the User list component', () => {
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

  const users = [{
    displayName: 'nnamisco',
    email: 'nedemenang@gmail.com',
    id: 'TUsUaucS5nb5kuOP6SpvTUcX9vD3',
    profilePic: `${str2}static/files/blank-profile-pic.png` },
  {
    displayName: 'nnamisco',
    email: 'nedemenang@gmail.com',
    id: 'TUsUaucS5nb5kuOP6SpvTUcX9vD3',
    profilePic: `${str2}static/files/blank-profile-pic.png` }];

  const group = { groupId: 'TUsUaucS5nb5kuOP6SpvTUcX9v3',
    groupName: 'Test Group',
    newMessage: false };

  const userListItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<UserList users = {users}
      selectedGroup={group} loggedInUser = {loggedInUser}/>);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    const component = userListItem();
    expect(component).toBeDefined();
  });

  it('should match snapshot test', () => {
    const component = userListItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });


  it('should recieve props', () => {
    expect(Object.keys(userListItem().props()).length).toBeGreaterThan(0);
  });
});
