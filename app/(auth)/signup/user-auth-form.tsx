"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleSignInButton from "@/components/github-auth-button";
import { signIn } from "next-auth/react";
import { Toaster, toast } from 'sonner'
import { Icons } from "@/components/icons"
import { redirect } from 'next/navigation'

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  name: z.string().trim().min(1, "Name is required"), // Adjust validation as needed
  password: z.string().min(6, "Password must be at least 6 characters"), // Adjust validation as needed
});


type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/signin";
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    email: "",
    name: "",
    password: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    // signIn("credentials", {
    //   email: data.email,
    //   password: data.password,
    //   callbackUrl: callbackUrl ?? "/dashboard",
    // });

    setLoading(true);
    try {
      const formValues = {
        email: data.email,
        name: data.name,
        password: data.password,
      };

      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (!res.ok) {
        const msg = (await res.json()).message;
        toast.error(`Error: ${msg}`);
        console.log(msg);
        return;
      } 

      router.push("/signin");
      // signIn(undefined, { callbackUrl: "/" });
    } catch (error: any) {
      setLoading(false);
      toast.error(`Error: ${error}`);
      console.log(error)
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="mb-3"
                    placeholder="Enter your password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full mt-3" type="submit">
          {loading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue With SignUp
          </Button>
        </form>
      </Form>



      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleSignInButton />
    </>
  );
}
