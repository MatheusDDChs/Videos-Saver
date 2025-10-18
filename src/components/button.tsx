type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="bg-pink-600 hover:bg-pink-700 transition-colors text-white px-4 py-2 rounded-full mt-2 shadow-md w-1/2 cursor-pointer"
    >
      {children}
    </button>
  );
}

export default Button;
