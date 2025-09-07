import Input from '@/components/Input';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { registerSchema, type RegisterSchema } from '@/utils/rules';
import { useSignIn } from '@clerk/clerk-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

type FormData = Pick<RegisterSchema, 'email'>;
const forgotPasswordSchema = registerSchema.pick(['email']);

export default function ForgotPassword() {
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<FormData>({
    resolver: yupResolver(forgotPasswordSchema)
  });
  const { signIn } = useSignIn();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (isSending) return;

    try {
      setIsSending(true);
      await signIn?.create({
        strategy: 'reset_password_email_code',
        identifier: data.email
      });
      navigate('/reset-password');
      toast.success('OTP sent! Please check your email.');
    } catch (error) {
      console.log(error);
      toast.error('OTP sending failed, please try again later');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="flex flex-col h-screen justify-center">
      <header className="pt-8 pb-6 flex justify-center">
        <Logo />
      </header>
      <section className="mx-auto w-[388px] max-w-full px-8">
        <header className="mb-8">
          <h1 className="text-center font-bold text-4xl/tight">
            Forgot Password
          </h1>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Enter your email"
            name="email"
            type="text"
            label="Provide your email address"
            register={register}
            errorMessage={errors.email?.message}
          />

          <Button
            className="bg-[#1ed760] rounded-full h-12 w-[324px] max-w-full font-semibold text-lg"
            disabled={isSending}
          >
            Submit
          </Button>
          <Link
            to={'/login'}
            className="block text-sm text-[#1ed760] text-left hover:underline"
          >
            Back to login
          </Link>
        </form>
      </section>
    </main>
  );
}
