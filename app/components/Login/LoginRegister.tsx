"use client";
import { auth, googleProvider } from "../../../firebase/firebase";
import { useState } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginRegister() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const router = useRouter();

  const handleLoginRegister = async () => {
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/contact");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      router.push("/contact");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent to your email.");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-xs">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4 w-full p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 w-full p-2 border rounded"
        />
        <button
          onClick={handleLoginRegister}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {isRegister ? "Register" : "Login"}
        </button>
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 text-white py-2 mt-4 rounded"
        >
          Sign in with Google
        </button>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleForgotPassword}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-500 hover:underline"
          >
            {isRegister ? "Already have an account?" : "Create an account"}
          </button>
        </div>
      </div>
    </div>
  );
}
