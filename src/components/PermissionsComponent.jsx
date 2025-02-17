import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const PermissionsComponent = () => {
  const [permissions, setPermissions] = useState(null);

  useEffect(() => {
    // Get the 'userPermissions' cookie
    const userPermissions = Cookies.get('userPermissions');
    
    if (userPermissions) {
      setPermissions(JSON.parse(userPermissions));
    } else {
      console.log('No permissions found in cookies');
    }
  }, []);

  return (
    <div>
      {permissions ? (
        <div>
          <h2>User Permissions</h2>
          <pre>{JSON.stringify(permissions, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading permissions...</p>
      )}
    </div>
  );
};

export default PermissionsComponent;