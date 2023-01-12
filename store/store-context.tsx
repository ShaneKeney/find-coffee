import React, { createContext, useReducer } from "react";
import { CoffeeStore } from "../pages";

interface Props {
  children: React.ReactNode;
}

interface ICoffeeStoreContext {
  state: CoffeeStoreState;
  dispatch: React.Dispatch<CoffeeStoreAction>;
}

interface CoffeeStoreState {
  latLong: string;
  coffeeStores: CoffeeStore[];
}

export const StoreContext = createContext<ICoffeeStoreContext>({
  state: {
    latLong: "",
    coffeeStores: [],
  },
  dispatch: () => {},
});

export enum ACTION_TYPES {
  SET_LAT_LONG = "SET_LAT_LONG",
  SET_COFFEE_STORES = "SET_COFFEE_STORES",
}

type CoffeeStoreAction =
  | {
      type: ACTION_TYPES.SET_LAT_LONG;
      payload: { latLong: string };
    }
  | {
      type: ACTION_TYPES.SET_COFFEE_STORES;
      payload: { coffeeStores: CoffeeStore[] };
    };

const storeReducer = (
  state: CoffeeStoreState,
  action: CoffeeStoreAction
): CoffeeStoreState => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG:
      return {
        ...state,
        latLong: action.payload.latLong,
      };
    case ACTION_TYPES.SET_COFFEE_STORES:
      return {
        ...state,
        coffeeStores: action.payload.coffeeStores,
      };
    default:
      return state;
  }
};

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const initialState: CoffeeStoreState = {
    latLong: "",
    coffeeStores: [],
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
