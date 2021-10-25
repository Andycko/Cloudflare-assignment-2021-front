import React, { useReducer } from 'react';

import Navbar from './components/Navbar';
import Feed from './components/Feed';
import NewPost from './components/NewPost';

import './App.css';

// Create context object
export const AppContext = React.createContext();

// Set up Initial State
const initialState = {
    posts: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_POSTS':
            return {
                posts: action.data
            };
        default:
            return initialState;
    }
}

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
      <div className="App">
        <header>
          <Navbar />
        </header>
        <main className="content container mt-3 pt-5">
          <div className="row justify-content-center">
            <AppContext.Provider value={{ state, dispatch }}>
              <NewPost />
              <Feed />
            </AppContext.Provider>
          </div>
        </main>
      </div>
    )
}

export default App;
