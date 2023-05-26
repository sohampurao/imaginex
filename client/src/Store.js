/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {};

const reducer = () => {};

export default function StoreProvider(props) {
  const [state, disptach] = useReducer(reducer, initialState);
  const value = { state, disptach };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
