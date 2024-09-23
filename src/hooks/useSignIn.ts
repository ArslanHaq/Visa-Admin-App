"use client";
import { validateSignInForm } from "@/constants/functions";
import { SignInDto } from "@/dto/SignIn.dto";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Pages } from "@/constants/constants";
import { getSession, signIn, useSession } from "next-auth/react";

export const useSignIn = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [formValues, setFormValues] = useState<SignInDto>({
    userName: "",
    password: "",
  });

  const [errors, setErrors] = useState<SignInDto>({
    userName: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateSignInForm(formValues);
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (!hasErrors) {
      const result = await signIn("credentials", {
        redirect: false,
        username: formValues.userName,
        password: formValues.password,
        // callbackUrl: `${Pages.INBOX}`,
      });
      if (result?.error) {
        toast.error(`Invalid Credentials`);
      } else {
        resetForm();
        const session = await getSession();
        toast.success("Login successful");
        if (session?.user.roles.includes("admin")) {
          router.push(Pages.USERS);
        } else {
          router.push(Pages.INBOX);
        }
        // }
      }
    }
  };
  const resetForm = () => {
    setFormValues({
      userName: "",
      password: "",
    });
    setErrors({
      userName: "",
      password: "",
    });
  };
  return {
    formValues,
    errors,
    setFormValues,
    setErrors,
    handleSubmit,
  };
};
