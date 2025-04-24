import React, { useState, useEffect } from 'react';
import './cookies.permission.css';

const CookiePermission = () => {
  const [cookiesBlocked, setCookiesBlocked] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    checkCookiePermission();
  }, []);

  // Function to check if third-party cookies are allowed
  const checkCookiePermission = () => {
    try {
      // Try to set a test cookie
      const testCookieName = 'cookiePermissionTest';
      document.cookie = `${testCookieName}=1; SameSite=None; Secure`;
      
      // Check if cookie was set
      const cookieSet = document.cookie.indexOf(testCookieName) !== -1;
      
      if (!cookieSet) {
        setCookiesBlocked(true);
      }

      // Alternative method: try to access cookies through an iframe
      const checkWithIframe = () => {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = 'about:blank';
        document.body.appendChild(iframe);

        try {
          // Try to set a cookie in the iframe
          iframe.contentDocument.cookie = `${testCookieName}Iframe=1; SameSite=None; Secure`;
          const iframeCookieSet = iframe.contentDocument.cookie.indexOf(`${testCookieName}Iframe`) !== -1;
          
          if (!iframeCookieSet) {
            setCookiesBlocked(true);
          }
        } catch (error) {
          // If accessing iframe cookies throws an error, third-party cookies are likely blocked
          setCookiesBlocked(true);
        } finally {
          document.body.removeChild(iframe);
        }
      };

      // Run the iframe check
      checkWithIframe();

    } catch (error) {
      console.error('Error checking cookie permissions:', error);
      setCookiesBlocked(true);
    }
  };

  const dismissNotification = () => {
    setDismissed(true);
    localStorage.setItem('cookieNotificationDismissed', 'true');
  };

  if (!cookiesBlocked || dismissed) {
    return null;
  }

  return (
    <div className="cookie-permission-alert">
      <div className="cookie-permission-content">
        <div className="cookie-permission-header">
          <h3>Cookies Required</h3>
          <button className="close-button" onClick={dismissNotification}>×</button>
        </div>
        <p>
          Your browser is currently blocking third-party cookies which are necessary for login functionality. 
          To ensure a smooth experience, please enable cookies in your browser settings.
        </p>
        <div className="cookie-instructions">
          <h4>How to enable cookies:</h4>
          <details>
            <summary>Chrome</summary>
            <ol>
              <li>Click the three dots in the top right corner</li>
              <li>Select "Settings"</li>
              <li>Click "Privacy and security"</li>
              <li>Click "Cookies and other site data"</li>
              <li>Select "Allow all cookies" or disable "Block third-party cookies"</li>
            </ol>
          </details>
          <details>
            <summary>Firefox</summary>
            <ol>
              <li>Click the menu button in the top right corner</li>
              <li>Select "Settings"</li>
              <li>Click "Privacy & Security"</li>
              <li>Under "Enhanced Tracking Protection", choose "Standard" or "Custom"</li>
              <li>Make sure "Cookies" is set to "All cookies" or "Third-party cookies: cookies from unvisited websites"</li>
            </ol>
          </details>
          <details>
            <summary>Safari</summary>
            <ol>
              <li>Go to Safari preferences</li>
              <li>Click "Privacy"</li>
              <li>Uncheck "Block all cookies" or "Prevent cross-site tracking"</li>
            </ol>
          </details>
          <details>
            <summary>Edge</summary>
            <ol>
              <li>Click the three dots in the top right corner</li>
              <li>Select "Settings"</li>
              <li>Click "Cookies and site permissions"</li>
              <li>Click "Manage and delete cookies and site data"</li>
              <li>Turn off "Block third-party cookies"</li>
            </ol>
          </details>
        </div>
        <button className="retry-button" onClick={() => { checkCookiePermission(); }}>
          I've enabled cookies, check again
        </button>
      </div>
    </div>
  );
};

export default CookiePermission;
