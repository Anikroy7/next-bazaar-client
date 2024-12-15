import { z } from "zod";

export const createOrderValidationSchema = z.object({
  customerName: z.string().min(1, "Please enter the customter name!"),
  customerAddress: z.string().min(1, "Please enter the customter Address!"),
  customerEmails: z.string().optional(),
});
