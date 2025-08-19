import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignUp } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

import Input from '@/components/Input';
import Logo from '@/components/Logo';
import SectionSeparator from '@/components/SectionSeparator';
import { Button } from '@/components/ui/button';
import { type RegisterSchema, registerSchema } from '@/utils/rules';
import { useState } from 'react';
import Loading from '@/components/Loading';
import OAuthSignIn from '@/components/OAuthSignIn';

type FormData = RegisterSchema;

export default function Register() {
  const {
    formState: { errors },
    reset,
    handleSubmit,
    register
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  });
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const { isLoaded, signUp } = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    if (!isLoaded) return;

    const { email, password, username } = data;
    setIsSendingOTP(true);
    try {
      reset();
      toast.success('OTP sent! Please check your email.');
      navigate('/auth/verify-otp');

      await signUp.create({
        emailAddress: email,
        username,
        password
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
    } catch (error) {
      console.log(error);
      toast.error('Password is too weak, please enter another password');
    } finally {
      setIsSendingOTP(false);
    }
  };

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
          <OAuthSignIn />
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
            disabled={isSendingOTP}
          >
            {isSendingOTP ? <Loading /> : 'Register'}
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
      <div id="clerk-captcha" className="absolute bottom-0 left-0"></div>
    </main>
  );
}
