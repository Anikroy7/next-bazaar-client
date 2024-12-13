import { z } from "zod";

export const createProductValidationSchema = z.object({
    categoryId: z.string().min(1, "Please select a category!"),
    name: z.string().min(1, "Please enter the product name!"),
    description: z.string().min(1, "Please enter the product description!"),
    inventorCount: z
        .number().min(1,
            "Inventory count must be a provide!"
        )
    ,
    price: z
        .number().min(1,
            "Price must be a provide!"
        ),
    discount: z
        .number().optional()
});
