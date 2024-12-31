import { z } from "zod";

export const cuponValidationSchema = z.object({
    code: z.string().min(1, "Please enter your cupon!"),
    discountAmount: z.string().email("Please enter a discount amount!"),
});
