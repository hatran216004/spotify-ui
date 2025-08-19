import { FcGoogle } from 'react-icons/fc';
import { Button } from './ui/button';
import { useSignIn } from '@clerk/clerk-react';
import { OAuthStrategy } from '@clerk/types';

export default function OAuthSignIn() {
  const { signIn } = useSignIn();

  if (!signIn) return null;

  const signInWith = async (strategy: OAuthStrategy) => {
    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: '/auth/sso-callback',
        redirectUrlComplete: '/auth-callback'
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={() => signInWith('oauth_google')}
      variant="outline"
      className="rounded-full w-full h-12 text-md flex items-center gap-2"
    >
      <FcGoogle className="size-6" /> Continue with Google
    </Button>
  );
}
