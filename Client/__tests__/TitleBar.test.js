import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TitleBar from '../components/TitleBar.jsx';

describe('the title bar component', () => {
  let mountedComponent;

  const TitleBarComponent = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<TitleBar />);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    const component = TitleBarComponent();
    expect(component).toBeDefined();
  });

  it('should match snapshot test', () => {
    const component = TitleBarComponent();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
