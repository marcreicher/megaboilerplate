import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './AppRouter'; 

if (module.hot) module.hot.accept();

const App = ({ store }) => (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

export default App;
