import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import PermissionsComponent from './PermissionsComponent';

const CookieConsent = () => {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const consentGiven = Cookies.get('cookieConsent');
    if (consentGiven) {
      setConsent(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365 });
    setConsent(true);
  };

  if (consent) {
    return <PermissionsComponent />;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center">
      <p>We use cookies to improve your experience on our site. By using our site, you consent to cookies.</p>
      <button onClick={handleAccept} className="bg-blue-500 text-white px-4 py-2 rounded">
        Accept
      </button>
    </div>
  );
};

export default CookieConsent;