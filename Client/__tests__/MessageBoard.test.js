import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MessageBoard from '../components/MessageBoard.jsx';

describe('the Message board component', () => {
  let mountedComponent;
  const messageBoardItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<MessageBoard />);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    const component = messageBoardItem();
    expect(component).toBeDefined();
  });

  it('should match snapshot test', () => {
    const component = messageBoardItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
