import { useUser } from '@clerk/clerk-react';

function useAdmin() {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata.role === 'admin';
  return { isAdmin };
}

export default useAdmin;
