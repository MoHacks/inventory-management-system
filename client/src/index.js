// export default RootComponent;
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer, { setLogin } from 'state';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from 'state/api';
// import { tsParticles } from "@tsparticles/engine";
// import { loadTrianglesPreset } from '@tsparticles/preset-triangles';

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

const user = JSON.parse(sessionStorage.getItem('user'));
const id = sessionStorage.getItem('id');
const token = sessionStorage.getItem('token');


if (user && token) {
  store.dispatch(setLogin({ user, id, token }));
}
setupListeners(store.dispatch);

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));

const RootComponent = () => {

  return (
    <ThemeProvider theme={theme} >
      {/* <CssBaseline /> MUI's CssBaseline to set up a consistent baseline */}
      <Provider store={store}>
        {/* Main application */}
          <App />
      </Provider>
    </ThemeProvider>
  );
};

root.render(<RootComponent />);
