// import React, { useEffect, useState, useCallback } from 'react';
// import ReactDOM from 'react-dom/client';
// // import './index.css';
// import App from './App';
// import { configureStore } from '@reduxjs/toolkit';
// import globalReducer from 'state';
// import { Provider } from 'react-redux'; //alows integrating Redux store with React components
// import { setupListeners } from '@reduxjs/toolkit/query';
// import { api } from 'state/api';

// // import Particles from "react-particles";
// import { tsParticles } from "@tsparticles/engine";
// import { loadTrianglesPreset } from '@tsparticles/preset-triangles';
// import { ParticlesProvider } from 'components/ParticlesContext';

// // export function ParticlesContainer() {
// //   // this customizes the component tsParticles installation
// //   const customInit = useCallback(async (Engine) => {
// //     // this adds the bundle to tsParticles
// //     await loadFull(Engine);
// //   });

// //   const options = {
// //     /* custom options */
// //   };

// //   return <Particles options={options} init={this.customInit} />;
// // }

// // NOTE: streamline state management and integrate advanced features like API handling.
// // configuration store from Redux toolkit simplifies store configuration and automatically includes recommended
// // defaults for setting up a Redux store
// const store = configureStore ({
//   // defines slice reducer for your Redux store
//   reducer: {
//     // adds a slice reducer called global which handles the state for a part of the application
//     // [api.reducerPath]: api.reducer dynamically adds a slice reducer based on the api.reducerPath from your API service setup. 
//     // This is typically used for managing API-related state when using libraries like RTK Query. 
//     global: globalReducer,
//     [api.reducerPath]: api.reducer,
//   },
//   // getDefaultMiddleware is a function provided by Redux Toolkit that returns an array of the default middleware.
//   // .concat(api.middleware) adds additional middleware to the default middleware. In this case, api.middleware is being added, 
//   // which is often used with libraries like RTK Query to handle caching, invalidation, and other API-related concerns.
//   middleware: (getDefault) => getDefault().concat(api.middleware),
// });
// // Configures the store to handle certain Redux actions automatically, often used for enhanced API interactions with RTK Query.
// setupListeners(store.dispatch)

// const root = ReactDOM.createRoot(document.getElementById('root'));

// // Function to remove the preloader after 2.5 seconds
// const RootComponent = () => {
  
//   //renders the triangle background 
//   const [showTriangleBackground, setshowTriangleBackground] = useState(true)

//   const loadTriangleParticles = async () => {
//     await loadTrianglesPreset(tsParticles);
  
//     await tsParticles.load({
//       id: "tsparticles",
//       options: {
//         preset: "triangles",
//       },
//     });
//   };
    
//   const [showPreloader, setShowPreloader] = useState(false);

//   // component side effect for loading the gif
//   /*
//   useEffect(() => {
//     // Side Effect (Used when updating the DOM): Function to remove the preloader after 2.5 seconds
//     const timeout = setTimeout(() => {
//       setShowPreloader(false);
//     }, 2500);

//     //clean up code
//     return () => clearTimeout(timeout); // Clean up timeout on unmount

//     //dependency array is empty, therefore useEffect() will only run once on mount
//   }, []);
//   */
//  /*
//   //DESTROY THE BACKGROUND PARTICLES AFTER 2.5seconds 
//   useEffect(() => {
//     const particles = tsParticles.domItem(0); // Get the first tsParticles instance

    
//     // Side Effect (Used when updating the DOM): Function to remove the preloader after 2.5 seconds
//     const timeout = setTimeout(() => {
//       if (particles) {
//         particles.destroy(); // Stops and removes the particles instance
//       }
//     }, 2500);
    
//     //clean up code
//     return () => clearTimeout(timeout); // Clean up timeout on unmount

//     //dependency array is empty, therefore useEffect() will only run once on mount
//   }, []);
//   */
//   return (
//     <React.StrictMode>
//       <Provider store={store}>
//         {/* {showPreloader && <div id="preloader"></div>} */}
//         {/* {!showPreloader && <App />} */}
//         {/* <ParticlesProvider> */}
//           {loadTriangleParticles() && <App /> }
//         {/* </ParticlesProvider> */}
//         {/* <App/> */}
//       </Provider>
//     </React.StrictMode>
//   );
// };

// root.render(<RootComponent />);

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
