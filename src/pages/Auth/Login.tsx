import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignIn } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

import { type LoginSchema, loginSchema } from '@/utils/rules';

import Input from '@/components/Input';
import Logo from '@/components/Logo';
import SectionSeparator from '@/components/SectionSeparator';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import OAuthSignIn from '@/components/OAuthSignIn';

type FormData = LoginSchema;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  });
  const { isLoaded, signIn, setActive } = useSignIn();

  const handleSignIn = async (email_username: string, password: string) => {
    if (!isLoaded) return;

    const { status, createdSessionId } = await signIn.create({
      password,
      strategy: 'password',
      identifier: email_username
    });

    if (status === 'complete') {
      await setActive({
        session: createdSessionId,
        redirectUrl: '/auth-callback'
      });
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!isLoaded) return;
    setIsLoading(true);

    const { email_username, password } = data;
    try {
      await handleSignIn(email_username, password);
    } catch (error: unknown) {
      console.log(error);
      toast.error('Email/Username or Password is incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-screen">
      <header className="pt-8 pb-6 flex justify-center">
        <Logo />
      </header>
      <section className="mx-auto w-[388px] max-w-full px-8">
        <header className="mb-8">
          <h1 className="text-center font-bold text-4xl/tight">
            Log in to Spotify
          </h1>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Enter email or username"
            name="email_username"
            type="text"
            defaultValue="hatm"
            label="Email or username"
            register={register}
            errorMessage={errors.email_username?.message}
          />

          <Input
            placeholder="Enter your password"
            name="password"
            type="password"
            defaultValue="hatmuser1234@"
            label="Password"
            register={register}
            errorMessage={errors.password?.message}
          />

          <Link
            to={'/forgot-password'}
            className="block text-sm text-[#1ed760] text-right hover:underline"
          >
            Forgot password
          </Link>

          <Button
            className="bg-[#1ed760] rounded-full h-12 w-[324px] max-w-full font-semibold text-lg"
            disabled={isLoading}
          >
            {isLoading || isLoading ? <Loading /> : 'Login'}
          </Button>
        </form>
        <SectionSeparator className="my-8" text="or" />
        <div className="space-y-2">
          <OAuthSignIn />
        </div>
        <SectionSeparator className="my-8 opacity-20" />
        <div className="text-center">
          <span className="text-gray-400">Don't have an account? </span>
          <Link to="/register" className="underline hover:text-[#1ed760]">
            Sign up for Spotify
          </Link>
        </div>
      </section>
      <footer className="mt-auto">
        <p className="text-center text-sm">
          Copyright hatran, All rights reserved.
        </p>
      </footer>
    </main>
  );
}
