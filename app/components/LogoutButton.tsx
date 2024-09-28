import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { logoutUser } from '../services/auth.service';

const LogoutButton: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    logoutUser();
    if (isClient) {
      router.replace('/login'); // Use replace to prevent going back to the previous page
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;