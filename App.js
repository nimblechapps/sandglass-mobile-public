import React from 'react';
import { LogBox } from 'react-native';
import RootContainer from './src/RootContainer';
import { Provider, useSelector } from 'react-redux';
import store, { persistor } from './src/state/store';
import { PersistGate } from 'redux-persist/lib/integration/react';

LogBox.ignoreAllLogs();

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}  >
        <RootContainer />
      </PersistGate>
    </Provider>
  )
}

export default App;