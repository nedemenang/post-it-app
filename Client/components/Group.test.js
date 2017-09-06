import Group from "./Group.jsx";
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';


describe("the group item component", () => {
        let mountedComponent;
        const group = {
            groupId: "-KrAwfM16qbLOig_mSOc",
            groupname: "Test",
            newMessage: false
          };

        const loggedInUser = {
            displayName: "nnamisco",
            email: "nedemenang@gmail.com",
            id: "TUsUaucS5nb5kuOP6SpvTUcX9vD3",
            isAuthenticated: true,
            phoneNo: null,
            profilePic: "//localhost:3000/static/files/blank-profile-pic.png" 
        };

        const groupItem = () => {
            if (!mountedComponent) {
                mountedComponent = shallow(<Group group = {group} loggedInUser = {loggedInUser} key = {1}/>);
        }
        return mountedComponent;
    };

    beforeEach(() => {
    mountedComponent = undefined;
  });

    it('should render', () => {
    const component = groupItem();
    expect(component).toBeDefined();
  });


it('should render without throwing an error', function() {
    const component = groupItem();
    expect(component.contains(group.groupname)).toBe(true);
  });

it('should match snapshot test', function() {
  const component = groupItem();
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();

});

});