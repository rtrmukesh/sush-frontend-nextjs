/* eslint-disable @next/next/no-img-element */

import LoginForm from "./LoginForm";

function RightSection() {
  return (
    <div className="flex flex-col justify-center p-10 md:p-20 items-center">
      <h1 className="text-3xl font-semibold mb-6">Login</h1>

      {/* Google Login */}
      <button className="border-none flex items-center justify-center gap-3 py-3 rounded-lg mb-4 hover:bg-blue-300 transition bg-blue-400 cursor-pointer w-full max-w-md">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-6 h-6"
        />
        Continue with Google
      </button>

      <p className="text-gray-600 text-sm mb-6 text-center max-w-md">
        or log in to your Sush Portal account:
      </p>

      {/* Login Form */}
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}

export default RightSection;
