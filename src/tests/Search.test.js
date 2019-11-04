import React from 'react';
// import ReactDOM from 'react-dom';
import Search from './components/Search';

import renderer from "react-test-renderer"

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render( <Search /> , div);
//   ReactDOM.unmountComponentAtNode(div);
// });




describe('Search', () => {
  test('Should render properly', () => {
    const element = renderer.create( <Search /> ).toJSON();
    // using the lines instead of the one above generates a shallow snapshot.
    // const renderer = new ShallowRenderer();
    // const element = renderer.render(<Search />).getRenderOutput();

    expect(element).toMatchSnapshot();
  });
});