import * as z from "zod";

export const SignupValidation = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(2, { message: "should have a minimum of 2 characters" })
    .max(50),
  username: z
    .string()
    .min(2, { message: "should have a minimum of 2 characters" })
    .max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "should have a minimum of 2 characters" }),
});
