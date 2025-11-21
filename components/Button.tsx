interface ButtonProps {
  label: string
}
function Button(props:ButtonProps) {
  return (
    <button
      type="submit"
      className="
              w-full
              bg-orange-600 text-white
              py-3 rounded-xl
              mt-2
              hover:bg-orange-700
              transition
              shadow
              cursor-pointer
            "
    >
      {props?.label}
    </button>
  );
}

export default Button;
