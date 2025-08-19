import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';

export default function SSOCallBackPage() {
  return (
    <AuthenticateWithRedirectCallback signUpForceRedirectUrl="/auth-callback" />
  );
}
