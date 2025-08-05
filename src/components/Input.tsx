import clsx from 'clsx';
import { CircleAlert, Eye, EyeOff } from 'lucide-react';
import { InputHTMLAttributes, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

type InputType = {
  errorMessage?: string;
  label?: string;
  icon?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  placeholder,
  label,
  name,
  type,
  errorMessage,
  icon,
  register,
  ...rest
}: InputType) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const resultRegister = register && name ? register(name) : null;

  function toggleShowPassword() {
    setIsShowPassword((prev) => !prev);
  }

  return (
    <div>
      <label
        htmlFor={name}
        className="text-white text-sm font-semibold mb-2 block"
      >
        {label}
      </label>
      <div
        className={clsx(
          'flex items-center h-12 px-3 rounded-[4px] border border-[#818181] w-full focus-within:border-white',
          errorMessage && 'border-red-400 outline-none'
        )}
      >
        <input
          {...rest}
          name={name}
          placeholder={placeholder}
          type={type === 'password' && isShowPassword ? 'text' : type}
          {...resultRegister}
          className="flex-1 h-full outline-none"
        />
        {icon && icon}
        {type === 'password' ? (
          <button
            type="button"
            className="ml-3 h-full cursor-pointer"
            onClick={toggleShowPassword}
          >
            {isShowPassword ? <EyeOff size={24} /> : <Eye size={24} />}
          </button>
        ) : null}
      </div>
      {errorMessage && (
        <span className="mt-2 flex items-center gap-1 text-sm text-red-400 ">
          <CircleAlert size={18} className="shrink-0" />
          {errorMessage}
        </span>
      )}
    </div>
  );
}
