import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded);
    }
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User Profile</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Role:</strong> {user.role}</p>
      {/* Optionally add email/username */}
    </div>
  );
};

export default Profile;
