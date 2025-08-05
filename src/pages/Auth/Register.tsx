import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignUp } from '@clerk/clerk-react';
import {
  type SignUpResource,
  type SetActive as SetActiveType
} from '@clerk/types';
import { isClerkAPIResponseError } from '@clerk/clerk-js';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

import Input from '@/components/Input';
import Logo from '@/components/Logo';
import SectionSeparator from '@/components/SectionSeparator';
import { Button } from '@/components/ui/button';
import Loading from '@/components/Loading';
import OTPForm from './OTPForm';
import { type RegisterSchema, registerSchema } from '@/utils/rules';
import { authServices } from '@/services/auth';
import { useUserStore } from '@/store/ui.store';

type FormData = RegisterSchema;

export default function Register() {
  const navigate = useNavigate();
  const { mutate: registerApi, isPending } = useMutation({
    mutationFn: authServices.callbackRegister
  });
  const { setActive, isLoaded, signUp } = useSignUp();
  const {
    formState: { errors },
    reset,
    handleSubmit,
    register
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  });

  const [verifying, setVerifying] = useState(false);
  const [isVerifyOTP, setIsVerifyOTP] = useState(false);

  const { setUser } = useUserStore();

  const onSubmit = async (data: FormData) => {
    if (!isLoaded) return;

    const { email, password, username } = data;
    try {
      toast.success('OTP sent! Please check your email.');
      setVerifying(true);

      await signUp.create({
        emailAddress: email,
        username,
        password
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      reset();
    } catch (error) {
      console.log(error);
      toast.error('Password is too weak, please enter another password');
      setVerifying(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    if (!isLoaded) return;

    try {
      setIsVerifyOTP(true);

      const { status, createdSessionId, emailAddress, username } = await (
        signUp! as SignUpResource
      ).attemptEmailAddressVerification({
        code: otp
      });

      if (status === 'complete') {
        await (setActive! as SetActiveType)({ session: createdSessionId });
        const clerkId = signUp.createdUserId;

        registerApi(
          {
            email: emailAddress,
            username,
            clerkId: clerkId!
          },
          {
            onSuccess: (data) => {
              const user = data.data.data.user;
              setUser(user);

              navigate('/');
              toast.success('Sign up successfully');
            },
            onError: (error) => {
              console.log(error);
              toast.error('Fail to sign up, please try again later 😟');
              setVerifying(false);
            }
          }
        );
      } else {
        console.log(status);
      }
    } catch (error: unknown) {
      if (isClerkAPIResponseError(error)) {
        if (error.message === 'Incorrect code') {
          toast.error('Invalid OTP. Please enter a valid OTP.');
        } else {
          toast.error('The code has expired. Please request a new one.');
        }
      }
    } finally {
      setIsVerifyOTP(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await (signUp! as SignUpResource).prepareEmailAddressVerification({
        strategy: 'email_code'
      });
      toast.success('OTP sent! Please check your email.');
    } catch (error) {
      console.log(error);
      toast.error(
        'OTP sent! Please check your email.Failed to send OTP. Please try again.'
      );
    }
  };

  if (verifying) {
    return (
      <OTPForm
        onVerifyOTP={handleVerifyOTP}
        onResendOTP={handleResendOTP}
        isVerifyOTP={isVerifyOTP || isPending}
      />
    );
  }

  return (
    <main>
      <header className="pt-8 pb-6 flex justify-center">
        <Logo />
      </header>
      <section className="mx-auto w-[388px] max-w-full px-8">
        <header className="mb-8">
          <h1 className="text-center font-bold text-5xl/tight">
            Sign up to start listening
          </h1>
        </header>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="rounded-full w-full h-12 text-md flex items-center gap-2"
          >
            <FcGoogle className="size-6" /> Sign up with Google
          </Button>
          <Button
            variant="outline"
            className="rounded-full w-full h-12 text-md flex items-center gap-2"
          >
            <FaFacebook className="size-6 text-blue-500" /> Sign up with
            Facebook
          </Button>
        </div>
        <SectionSeparator className="my-8" text="or" />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Enter your email address"
            name="email"
            type="email"
            label="Email address"
            register={register}
            errorMessage={errors.email?.message}
          />
          <Input
            placeholder="Enter your username"
            name="username"
            type="text"
            label="Username"
            register={register}
            errorMessage={errors.username?.message}
          />
          <Input
            placeholder="Enter your password"
            name="password"
            type="password"
            label="Password"
            register={register}
            errorMessage={errors.password?.message}
          />
          <Input
            placeholder="Enter your confirm password"
            name="confirm_password"
            type="password"
            label="Confirm password"
            register={register}
            errorMessage={errors.confirm_password?.message}
          />

          <Button
            className="bg-[#1ed760] rounded-full h-12 w-[324px] max-w-full font-semibold text-lg"
            disabled={verifying || !isLoaded}
          >
            {!isLoaded ? <Loading /> : 'Register'}
          </Button>
        </form>

        <SectionSeparator className="my-8 opacity-20" />
        <div className="text-center">
          <span className="text-gray-400">Already have an account? </span>
          <Link to="/login" className="underline hover:text-[#1ed760]">
            Log in here.
          </Link>
        </div>
      </section>

      <footer>
        <p className="text-center text-sm mt-3">
          Copyright hatran, All rights reserved.
        </p>
      </footer>
    </main>
  );
}
