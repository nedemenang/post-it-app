import React from 'react';
import mockery from 'mockery';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Login from '../components/Login.jsx';


// mockery.enable();
// mockery.registerMock('../public/images/logo.png', 'office smiley');
// mockery.registerMock('../public/images/8b6c67595d0f851d12e743fd3fe694ab.png',
// 'office smiley');

describe('the Login form component', () => {
  let mountedComponent;

  const str = location.href;
  const str2 = str.replace('#', ' ');

  const loginFormItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<Login />);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    const component = loginFormItem();
    expect(component).toBeDefined();
  });

  it('should match snapshot test', () => {
    const component = loginFormItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should call function on click of login submit button', () => {
    const component = shallow(<Login />);
    const preventDefault = jest.fn();
    component.find('#registerButton').simulate('click', { preventDefault });
    expect(preventDefault).toBeCalled();
  });

  it('should call function on click of login submit button', () => {
    const component = shallow(<Login />);
    const preventDefault = jest.fn();
    component.find('#loginButton').simulate('click', { preventDefault });
    expect(preventDefault).toBeCalled();
  });

  it('should update state on phone number field change', () => {
    loginFormItem().find('#phoneNo').simulate('change', { target: {
      value: '+23470234567'
    } });
    expect(loginFormItem().state().phoneNumber).toBe('+23470234567');
  });

  it('should update state on username field change', () => {
    loginFormItem().find('#username').simulate('change', { target: {
      value: 'newUsername'
    } });
    expect(loginFormItem().state().username).toBe('newUsername');
  });

  it('should update state on password field change', () => {
    loginFormItem().find('#password').simulate('change', { target: {
      value: 'securePassword'
    } });
    expect(loginFormItem().state().password).toBe('securePassword');
  });

  it('should update state on email field change', () => {
    loginFormItem().find('#email').simulate('change', { target: {
      value: 'unRegisteredUser@email.com'
    } });
    expect(loginFormItem().state().email).toBe('unRegisteredUser@email.com');
  });


  it('should update state on login email field change', () => {
    loginFormItem().find('#loginEmail').simulate('change', { target: {
      value: 'registeredUser@email.com'
    } });
    expect(loginFormItem().state().loginEmail).toBe('registeredUser@email.com');
  });

  it('should update state on password field change', () => {
    loginFormItem().find('#loginPassword').simulate('change', { target: {
      value: 'SecurePassword'
    } });
    expect(loginFormItem().state().loginPassword).toBe('SecurePassword');
  });

  mockery.disable();
});
