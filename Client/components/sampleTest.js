import React from 'react';
import { shallow, mount, render } from 'enzyme';
import GroupListView from '../views/GroupContainer/GroupListView.jsx';

describe('GroupListView', () => {
  let mountedComponent;
  let props;
  const groupListView = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(
        <GroupListView {...props} />
      );
    }
    return mountedComponent;
  };
  beforeEach(() => {
    mountedComponent = undefined;
    props = {
      groups: undefined
    };
  });

  it('should render', () => {
    expect(groupListView()).toBeDefined();
  });

  it('should render a group list component', () => {
    const component = groupListView();
    const groupList = component.find('GroupList');

    expect(groupList).toBeDefined();
  });

  it('should take props', () => {
    const component = groupListView();

    expect(Object.keys(component.props()).length).toBeGreaterThan(0);
  });

});


  it('should render', () => {
    const component = groupItem();
    expect(component).toBeDefined();
  });

  it('should have props', () => {
    const component = groupItem();
    expect(Object.keys(component.props()).length).toBeGreaterThan(0);
  });

  it('changes add user state on button click', () => {
    const button = groupItem().find('.add-user-button');
    const addUserState = groupItem().state().addUser;
    button.simulate('click');
    expect(groupItem().state().addUser).toBe(!addUserState);
  });

  it('should render message body component', () => {
    const component = groupItem();
    const messageBody = component.find('MessageBody');
    expect(messageBody).toBeDefined();
  });

})