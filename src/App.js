import React from 'react';
import './App.css';
import Search from './components/search'
// import { Provider } from "react-redux";
// import { store } from "./redux/store";

function App() {
  return (
    // <Provider store={store}>
    <div className="App"> 
      <Search /> 
    </div>
  // </Provider>
    );
}

export default App;
