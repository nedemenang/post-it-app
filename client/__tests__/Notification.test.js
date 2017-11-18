import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NotificationItem from '../components/notification.jsx';

describe('the notificaiton component', () => {
  let mountedComponent;

  const NotificationComponent = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<NotificationItem />);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    const component = NotificationComponent();
    expect(component).toBeDefined();
  });

  it('should match snapshot test', () => {
    const component = NotificationComponent();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
