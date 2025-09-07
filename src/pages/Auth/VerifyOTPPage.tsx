import Logo from '@/components/Logo';
import { isClerkAPIResponseError } from '@clerk/clerk-js';
import { useSignUp } from '@clerk/clerk-react';
import { SignUpResource, type SetActive as SetActiveType } from '@clerk/types';
import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function VerifyOTPPage() {
  const { setActive, isLoaded, signUp } = useSignUp();
  const [isVerifyOTP, setIsVerifyOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<HTMLInputElement[] | []>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    if (!isLoaded) return;

    try {
      setIsVerifyOTP(true);

      const { status, createdSessionId } = await (
        signUp! as SignUpResource
      ).attemptEmailAddressVerification({
        code: otp
      });

      if (status === 'complete') {
        await (setActive! as SetActiveType)({
          session: createdSessionId,
          redirectUrl: '/auth-callback'
        });
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

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-green-900/20 via-transparent to-transparent"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-gradient-to-b from-gray-900 to-black rounded-3xl p-8 shadow-2xl border border-gray-800 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-2">
              <Logo className="size-12 fill-[#1db954]" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Verify your account
            </h1>
            <p className="text-gray-400">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleVerifyOTP(otp.join(''));
            }}
          >
            <div className="flex gap-3 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el: HTMLInputElement) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-bold bg-gray-800 border-2 border-gray-700 rounded-xl text-white focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200 hover:border-gray-600"
                  disabled={isVerifyOTP}
                />
              ))}
            </div>

            <button
              disabled={isVerifyOTP || otp.join('').length !== 6}
              className="w-full bg-green-500 hover:bg-green-400 disabled:bg-gray-700 disabled:cursor-not-allowed text-black disabled:text-gray-400 font-semibold py-4 px-6 rounded-full transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isVerifyOTP ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm mb-3">
              Didn't receive the code?
            </p>
            <button
              onClick={() => handleResendOTP()}
              className="text-green-500 hover:text-green-400 font-medium text-sm underline transition-colors duration-200"
            >
              Resend Code
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-xs">
              Having trouble?{' '}
              <a
                href="#"
                className="text-green-500 hover:text-green-400 underline"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
