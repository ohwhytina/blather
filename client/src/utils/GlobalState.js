import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';
const StoreContext = createContext();
const { Provider } = StoreContext;


const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({

        imageUrl: '',
        blabs: [],
        comments: [],
        users: []
    });
    console.log(state);
    return <Provider value = {
        [state, dispatch]
    } {...props }
    />;
};
const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };