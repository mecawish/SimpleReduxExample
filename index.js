import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// React component
class Counter extends React.Component {
  render(){
    const { value, onIncreaseClick, onDecreaseClick } = this.props;
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
        <button onClick={onDecreaseClick}>Decrease</button>
      </div>
    );
  }
}
// The onClick triggers a function that returns the dispatch function 
// which in turn calls another function, your action

// Action:
const increaseAction = {type: 'increase'};
const decreaseAction = {type: 'decrease'};
// The type isn't necessarily a requirement but I wouldn't recommend actions without it
// In reducer parameters you receive something along the lines of

// Reducer:
function counter(state={count: 0}, action) {
  let count = state.count;
  switch(action.type){
    case 'increase':
      return {count: count+1};
    case 'decrease':
      return {count: count-1};
    default:
      return state;
  }
}
// If you don't return the new state then nothing gets sent.

// Store:
let store = createStore(counter, {count: 0},
  window.devToolsExtension ? window.devToolsExtension() : undefined);
// The store is created with createStore and it only takes in one 
// reducer so you will have to use combine reducer
// if your reducer has more than one reducer.
// The second argument is the initial state, the third is a store enhancer.


// Map Redux state to component props
function mapStateToProps(state)  {
  return {
    value: state.count
  };
}
// The above function maps the state to props.  So the reducer returns 
// the new state, but the idea is to not have components carry any state.  
// This means you take the new state provided by the reducer("provided" 
// through "connect") and return it as props. Notice the returned object 
// value?  That becomes similar to this.props.counter 
// providing the new state as it's value.


// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction),
    onDecreaseClick: () => dispatch(decreaseAction)
  };
}
//The only way to change the state inside it is to dispatch an action on it.

// Connected Component:
let App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
// counter from the connect(select) and dispatch by default from connect

React.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// Provider "provides" the store to the component you want be enclosing 
// them in the { Provider } component from react-redux
// This means that the App component, a top level component, 
// doesn't actually carry any state since it just takes
// the state from the store that was returned by the reducer and then 
// converted through connect's map to state connect(select) from App.jsx

