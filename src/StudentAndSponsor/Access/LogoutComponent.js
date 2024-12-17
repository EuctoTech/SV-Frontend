import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
  const navigate = useNavigate();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    if (userId === null && !redirected) {
      // Only set redirected to true and redirect if the current URL is not already the home page (/Payfeeportal)
      if (window.location.pathname.replace(/\/$/, '') !== '/svsportaladmintest') {
        setRedirected(true);
        window.location.href = '/svsportaladmintest'; // Redirect to the home page if user_id is null and not on /Payfeeportal
      }
    }
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div>
      {/* Your content goes here */}
    </div>
  );
};

export default LogoutComponent;
