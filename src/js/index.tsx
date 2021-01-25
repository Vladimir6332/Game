/* eslint-disable prettier/prettier */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import App from './components/App';

<<<<<<< HEAD

render(<App />, document.getElementById('root'));
=======
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
>>>>>>> develop
