type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer text-white bg-slate-500 p-3 px-5 rounded-md shadow"
    >
      {children}
    </button>
  );
}

export default Button;
