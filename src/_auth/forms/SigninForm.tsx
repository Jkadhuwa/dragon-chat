import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { SigninValidation } from "@/lib/validation";


import Loader from "@/components/shared/Loader";
import { useSignInAccountMutation } from "@/lib/react-query/queriesAndMutataions";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
  const { toast } = useToast();

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const navigate = useNavigate();

  const { mutateAsync: signInAccount } =
    useSignInAccountMutation();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SigninValidation>) {

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: "Sign in failed. Please try again." });
    }
    const isLoggedIn = await checkAuthUser();
    
    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({
        title: "Sign up falied. Please try again.",
      });
    }
  }
  return (
    <Form {...form}>
      <div className="w-[420px] flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h4-bold md:h4-bold pt-5 sm:pt-2">
          Welcome back! Please enter your credentials
        </h2>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-2"
        >
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" className="shad-input_sm" />
                </FormControl>
                <FormMessage className="shad-form_message " />
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
                  <Input {...field} type="password" className="shad-input_sm" />
                </FormControl>
                <FormMessage className="shad-form_message " />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                {" "}
                <Loader />
                Loading...
              </div>
            ) : (
              "Login"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center ">
           Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="text-primary-500 small-semibold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
