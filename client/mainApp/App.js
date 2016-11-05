import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './AppRouter'; 

const App = ({ store }) => (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

export default App;
