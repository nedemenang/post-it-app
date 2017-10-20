import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import appAction from '../actions/AppActions';
import ProfileEdit from '../components/ProfileEdit.jsx';

describe('the profile Edit component', () => {
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

  const ProfileEditItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<ProfileEdit />);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    const component = ProfileEditItem();
    expect(component).toBeDefined();
  });

  it('should match snapshot test', () => {
    const component = ProfileEditItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should update state on username field change', () => {
    const input = ProfileEditItem().find('#userName').first();
    input.simulate('change', { target: {
      value: 'Test Username'
    } });
    expect(ProfileEditItem().state().userName).toBe('Test Username');
  });

  it('should update state on phonenumber field change', () => {
    const input = ProfileEditItem().find('#phoneNumber').first();
    input.simulate('change', { target: {
      value: '+23470239403923'
    } });
    expect(ProfileEditItem().state().phoneNumber).toBe('+23470239403923');
  });
});
