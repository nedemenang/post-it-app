import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PasswordReset from '../components/passwordReset.jsx';

describe('the password reset component', () => {
  let mountedComponent;

  const PasswordResetItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<PasswordReset />);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    const component = PasswordResetItem();
    expect(component).toBeDefined();
  });

  it('should match snapshot test', () => {
    const component = PasswordResetItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should update state on email field change', () => {
    const input = PasswordResetItem().find('input').first();
    input.simulate('change', { target: {
      value: 'test@email.com'
    } });
    expect(PasswordResetItem().state().resetEmail).toBe('test@email.com');
  });

  it('should call function on submit of form', () => {
    const component = shallow(<PasswordReset />);
    const preventDefault = jest.fn();
    component.find('button').simulate('click', { preventDefault });
    expect(preventDefault).toBeCalled();
  });
});
