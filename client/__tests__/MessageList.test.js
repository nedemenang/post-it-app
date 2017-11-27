import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MessageList from '../components/MessageList.jsx';

describe('the message list component', () => {
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

  const messages = [{ messageBody: 'Test message',
    postedBy: 'testUser@gmail.com',
    postedByDisplayName: 'Test User',
    postedon: '',
    priority: 'Normal',
    profilePic: `${str2}static/files/blank-profile-pic.png` },
  { messageBody: 'Test message',
    postedBy: 'testUser@gmail.com',
    postedByDisplayName: 'Test User',
    postedon: '',
    priority: 'Normal',
    profilePic: `${str2}static/files/blank-profile-pic.png` },
  { messageBody: 'Test message',
    postedBy: 'testUser@gmail.com',
    postedByDisplayName: 'Test User',
    postedon: '',
    priority: 'Normal',
    profilePic: `${str2}static/files/blank-profile-pic.png` }];

  const messageListItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<MessageList messages = {messages}
      selectedGroup={group} usersReadMessages={[]}
      loggedInUser = {loggedInUser}/>);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    const component = messageListItem();
    expect(component).toBeDefined();
  });

  it('should match snapshot test', () => {
    const component = messageListItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });


  it('should recieve props', () => {
    expect(Object.keys(messageListItem().props()).length).toBeGreaterThan(0);
    expect(messageListItem().instance().props.selectedGroup).toEqual(group);
    expect(messageListItem().instance().props.loggedInUser)
    .toEqual(loggedInUser);
    expect(messageListItem().instance().props.messages).toEqual(messages);
  });
});
