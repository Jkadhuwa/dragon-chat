import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

import { SignupValidation } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";

import Loader from "@/components/shared/Loader";
import {
  useCreateUserAccountMutation,
  useSignInAccountMutation,
} from "@/lib/react-query/queriesAndMutataions";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  const { toast } = useToast();

  const { checkAuthUser } = useUserContext();

  const navigate = useNavigate();
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccountMutation();

  const { mutateAsync: signInAccount } =
    useSignInAccountMutation();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      username: "",
      email: "",
      name: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const createdUser = await createUserAccount(values);

    if (!createdUser) {
      return toast({
        title: "Sign up falied. Please try again.",
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: "Sign in failed. Please try again." });
    }
    const isLoggedIn = await checkAuthUser();
    console.log(isLoggedIn);
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
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-2">
          Create a new account
        </h2>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" className="shad-input_sm" />
                </FormControl>
                <FormMessage className="shad-form_message " />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} type="text" className="shad-input_sm" />
                </FormControl>
                <FormMessage className="shad-form_message " />
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
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                {" "}
                <Loader />
                Loading...
              </div>
            ) : (
              "Signup"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center ">
            Already have an account?{" "}
            <Link
              to={"/signin"}
              className="text-primary-500 small-semibold ml-1"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
