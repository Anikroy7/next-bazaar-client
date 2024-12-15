"use client"

import NBForm from "@/src/components/ui/form/NBForm";
import NBInput from "@/src/components/ui/form/NBInput";
import { useCart } from "@/src/context/cart.provider";
import { createOrderValidationSchema } from "@/src/validation/order.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { FieldValues } from "react-hook-form";
import dynamic from "next/dynamic";
import { useGetLoogedUserInfo } from "@/src/hooks/user.hook";
import { useCreateOrder } from "@/src/hooks/order.hook";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DynamicLoading = dynamic(() => import('@/src/components/ui/shared/Loading'), {
    ssr: false,
})
const CheckoutPage = () => {
    const router = useRouter()
    const { data: loogedUser, isLoading } = useGetLoogedUserInfo()
    const { cart: cartItems } = useCart();
    const { mutate: handleCreateOrder, data: createdData, isPending: createOrderPending, isSuccess } = useCreateOrder();
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    const totalQuantity = cartItems.reduce((acc, curr) => {
        acc += curr.quantity
        return acc
    }, 0);

    const orderedProduct = cartItems.map(item => ({
        id: item.id,
        quantity: item.quantity
    }))

    useEffect(() => {
        if (!createOrderPending && isSuccess && createdData) {
            router.push(createdData?.data);
        }
    }, [createOrderPending, isSuccess]);

    const onSubmit = (data: FieldValues) => {
        const orderData = {
            customerId: loogedUser?.data?.id,
            vendorId: cartItems[0].vendorId,
            totalQunatity: totalQuantity,
            totalPrice: calculateTotal(),
            customerName: data.customerName,
            customerEmail: loogedUser?.data?.email,
            customerAddress: data.customerAddress,
        }
        const productData = orderedProduct;
        handleCreateOrder({ orderData, productData })
        console.log(orderData)
    }

    if (isLoading || createOrderPending) return <DynamicLoading />
    console.log(createdData, createOrderPending)
    return (
        <div className="min-h-screen p-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side: Customer Information */}
                <div className="p-6 rounded-lg shadow-lg">
                    <p className="font-medium text-xl mb-4">Customer Information</p>

                    <NBForm onSubmit={onSubmit}
                        resolver={zodResolver(createOrderValidationSchema)}
                        defaultValues={{
                            customerEmail: loogedUser?.data?.email
                        }}
                    >
                        <div className="py-3">
                            <NBInput label="Email" name="customerEmail" size="sm" type="email" disabled />
                        </div>
                        <div className="py-3">
                            <NBInput label="Name" name="customerName" size="sm" type="text" />
                        </div>
                        <div className="py-3">
                            <NBInput label="Address" name="customerAddress" size="sm" type="text" />
                        </div>

                        <Button
                            className="my-3 w-full rounded-md bg-default-900 text-default"
                            size="lg"
                            type="submit"
                        >
                            Chekout
                        </Button>
                    </NBForm>
                </div>

                {/* Right Side: Cart Items */}
                <div className="p-6 rounded-lg shadow-lg">
                    <p className=" ont-medium text-xl mb-4">Your Cart</p>

                    {/* Cart Items List */}
                    <div className="space-y-4">
                        {cartItems.length === 0 ? (
                            <p className="text-gray-500">Your cart is empty. Add items to your cart!</p>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between py-4 border-b">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md" />
                                    <div className="flex-1 ml-4">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-gray-600">${item.price}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">

                                        <span className="text-lg font-semibold">Quantity: {item.quantity}</span>

                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Cart Summary */}
                    <div className="flex justify-between mt-4">
                        <p className="font-medium text-lg">Total</p>
                        <p className="text-xl font-semibold">${calculateTotal()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
