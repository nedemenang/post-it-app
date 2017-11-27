import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PasswordResetConfirm from '../components/PasswordResetConfirm.jsx';

describe('the password reset component', () => {
  let mountedComponent;

  const PasswordResetConfirmItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<PasswordResetConfirm />);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    const component = PasswordResetConfirmItem();
    expect(component).toBeDefined();
  });

  it('should match snapshot test', () => {
    const component = PasswordResetConfirmItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should update state on password field change', () => {
    const input = PasswordResetConfirmItem().find('#password').first();
    input.simulate('change', { target: {
      value: 'password1'
    } });
    expect(PasswordResetConfirmItem().state().password).toBe('password1');
  });

  it('should update state on confirm password field change', () => {
    const input = PasswordResetConfirmItem().find('#confirmPassword').first();
    input.simulate('change', { target: {
      value: 'password1'
    } });
    expect(PasswordResetConfirmItem().state()
    .confirmPassword).toBe('password1');
  });

  it('should call function on submit of form', () => {
    const component = shallow(<PasswordResetConfirm />);
    const preventDefault = jest.fn();
    component.find('button').simulate('click', { preventDefault });
    expect(preventDefault).toBeCalled();
  });
});
