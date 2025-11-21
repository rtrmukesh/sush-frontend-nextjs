"use client";

import { setSessionToken } from "@/app/actions/cookie-actions";
import Button from "@/components/Button";
import CheckBoxField from "@/components/CheckBoxField";
import Form from "@/components/Form";
import InputField from "@/components/InputField";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email Address is required"),
  password: Yup.string().required("Password is required"),
});

interface handleLoginProps {
  email: string;
  password: string;
}

export default function LoginForm() {

  const router = useRouter();
  
  const handleLogin = async (values: handleLoginProps) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/webLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const responseData = await res.json();
      if (!res.ok) {
        toast.error(responseData.message || "Login failed");
        return;
      }

      await setSessionToken(responseData?.session_token);
      router.replace("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      initialValues={{ email: "", password: "" }}
      LoginSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      <InputField
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter your email"
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
      />

      <div className="flex items-center justify-between mb-5">
        <CheckBoxField label="Remember my username" name="remember" />

        <a href="#" className="text-sm text-blue-600 hover:underline">
          Forgot password?
        </a>
      </div>

      <Button label="Login" />
    </Form>
  );
}
