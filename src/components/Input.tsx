function Input(props: object) {
  return (
    <input
      {...props}
      className="border-3  bg-slate-100 rounded-t-sm p-2 mb-5 w-[100%]
      focus:ring-2 focus:outline-none focus:border-pink-700 border-white"
    />
  );
}

export default Input;
