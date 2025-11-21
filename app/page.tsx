import { redirect } from "next/navigation";
import { getSessionToken } from "./actions/cookie-actions";

export default async function Home() {
  const { token } = await getSessionToken();
  console.log('token>>>------------------------> ', token);
  if (token) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }

  return null;
}
