import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


serviceWorkerRegistration.register();


// Check if the current URL is the root URL
if (window.location.pathname === '/') {
  // Redirect to /svsportaladmin
  window.location.assign('/svsportaladmin');

} else {
  // Render the App component
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}
