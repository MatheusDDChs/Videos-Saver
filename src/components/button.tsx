type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`bg-pink-600 hover:bg-pink-700 transition-colors text-white px-4 py-2 rounded-full mt-2 shadow-md w-1/2 cursor-pointer ${className}`}
    />
  );
}

export default Button;
