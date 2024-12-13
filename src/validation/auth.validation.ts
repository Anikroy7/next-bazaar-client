import { z } from "zod";


export const signupValidationSchema = z.object({
    name: z.string().min(1, "Please enter your name!"),
    email: z.string().email("Please enter a valid email address!"),
    phone: z
        .string()
        .regex(/^\d{11}$/, "Please enter a valid mobile number!"),
    password: z.string().min(6, "Please give a strong password with at least 6 characters"),
    address: z.string().min(1, "Please enter your address!"),
});
export const vendorSignupValidationSchema = z.object({
    name: z.string().min(1, "Please enter your name!"),
    email: z.string().email("Please enter a valid email address!"),
    phone: z
        .string()
        .regex(/^\d{11}$/, "Please enter a valid mobile number!"),
    password: z.string().min(6, "Please give a strong password with at least 6 characters"),
    location: z.string().min(1, "Please enter your location!"),
    description: z.string().min(1, "Please enter your description!"),
});
export const loginValidationSchema = z.object({
    email: z.string().email("Please enter a valid email address!"),
    password: z.string().min(6, "Please give a strong password with at least 6 characters"),
});
export const resetPasswordValidationSchema = z.object({
    password: z.string().min(6, "Please give a strong password with at least 6 characters"),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], 
  });
export const updateUserValidationSchema = z.object({
    name: z.string().min(1, "Please enter your name!"),
    phone: z
        .string()
        .regex(/^\d{11}$/, "Please enter a valid mobile number!"),
    address: z.string().min(1, "Please enter your address!"),

});



export const updateVendorValidationSchema = z.object({
    name: z.string().min(1, "Please enter your name!"),
    phone: z
        .string()
        .regex(/^\d{11}$/, "Please enter a valid mobile number!"),
    location: z.string().min(1, "Please enter your location!"),
    description: z.string().min(1, "Please enter your description!"),
});