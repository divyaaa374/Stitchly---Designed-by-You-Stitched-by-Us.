import React from 'react';
import { useAuth } from '../../store/useAuth';
import WrongDoor from '../layouts/WrongDoor';

export const RoleGuard = ({ allowedRoles = [], children }) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <WrongDoor requiredRole={allowedRoles[0] || 'customer'} />;
  }

  return children;
};

export default RoleGuard;
