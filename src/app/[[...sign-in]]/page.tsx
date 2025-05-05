"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser, useSignIn } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signIn } = useSignIn();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const role =
        (user?.publicMetadata?.role as
          | "admin"
          | "teacher"
          | "parent"
          | "student") || "student";

      setTransitioning(true);
      setTimeout(() => {
        router.replace(`/${role}`);
      }, 1000);
    }
  }, [isLoaded, isSignedIn, user, router]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!signIn) {
        throw new Error("Sign-in functionality is not available.");
      }

      const result = await signIn.create({
        identifier: (e.target as HTMLFormElement).identifier.value,
        password: (e.target as HTMLFormElement).password.value,
      });

      if (result.status === "complete") {
        setTransitioning(true);
        setTimeout(() => {
          router.replace("/dashboard");
        }, 1000);
      } else {
        console.error("Sign-in incomplete:", result);
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center animated-bg relative">
      {/* Loading Overlay */}
      {(loading || transitioning) && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <SignIn.Root>
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-yellow-300"
        >
          {/* Logo & Title */}
          <div className="flex flex-col items-center mb-6">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <h1 className="text-2xl font-bold text-yellow-600 mt-2">Welcome to MU Hub</h1>
            <p className="text-yellow-500 text-sm">Sign in to your account</p>
          </div>

          <SignIn.Step
            name="start"
            className="flex flex-col gap-4"
            onSubmit={handleSignIn}
          >
            {/* Error Message */}
            <Clerk.GlobalError className="text-sm text-red-500 text-center" />

            {/* Username Field */}
            <Clerk.Field name="identifier" className="flex flex-col gap-2">
              <Clerk.Label className="text-sm font-medium text-yellow-700">
                Username
              </Clerk.Label>
              <Clerk.Input
                type="text"
                required
                className="p-3 rounded-md border border-yellow-300 bg-yellow-50 text-yellow-800 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
              <Clerk.FieldError className="text-xs text-red-500" />
            </Clerk.Field>

            {/* Password Field */}
            <Clerk.Field name="password" className="flex flex-col gap-2">
              <Clerk.Label className="text-sm font-medium text-yellow-700">
                Password
              </Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="p-3 rounded-md border border-yellow-300 bg-yellow-50 text-yellow-800 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
              <Clerk.FieldError className="text-xs text-red-500" />
            </Clerk.Field>

            {/* Loading Spinner */}
            {loading && (
              <div className="flex justify-center my-2">
                <div className="w-6 h-6 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Sign-In Button */}
            <SignIn.Action
              submit
              disabled={loading}
              className={`bg-yellow-500 text-white py-3 rounded-md text-sm font-medium hover:bg-yellow-600 transition-all ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </SignIn.Action>
          </SignIn.Step>
        </motion.div>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;