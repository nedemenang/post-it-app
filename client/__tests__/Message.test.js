import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Message from '../components/Message.jsx';

describe('the message item component', () => {
  let mountedComponent;
  const groupId = '-KrAwfM16qbLOig_mSOc';

  const message = {
    id: 'TUsUaucS5nb5kuOP6SpvTUcX9vD3',
    messageBody: 'Test Message',
    postedBy: 'test@postedby.com',
    postedByDisplayName: 'testUser',
    profilePic: '',
    postedon: '09/09/2017, 13:29:29',
    priority: 'normal',
    isRead: false
  };

  const userRead = [];

  const messageItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<Message groupId = {groupId}
      message = {message} userRead = {userRead} key = {1}/>);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    const component = messageItem();
    expect(component).toBeDefined();
  });


  it('should render without throwing an error', () => {
    const component = messageItem();
    expect(component.contains(message.messageBody)).toBe(true);
  });

  it('should match snapshot test', () => {
    const component = messageItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });


  it('should recieve props', () => {
    expect(Object.keys(messageItem().props()).length).toBeGreaterThan(0);
    expect(messageItem().instance().props.message).toEqual(message);
  });
});
