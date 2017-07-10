import react from 'react';
import {shallow} from 'enzyme';
import GroupForm from './GroupForm';



test('Group form should render as expected', () => {
  const component = shallow(<GroupForm />)
  console.log(component);
})