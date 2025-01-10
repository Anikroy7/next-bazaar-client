"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { FieldValues } from "react-hook-form";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import { toast } from "sonner";
import NBForm from "@/src/components/ui/form/NBForm";
import NBInput from "@/src/components/ui/form/NBInput";
import { useCart } from "@/src/context/cart.provider";
import { createOrderValidationSchema } from "@/src/validation/order.validation";
import { useGetLoogedUserInfo } from "@/src/hooks/user.hook";
import { useCreateOrder } from "@/src/hooks/order.hook";
import { useGetAllCupons } from "@/src/hooks/cupon.hook";
import { TCupon } from "@/src/types";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  {
    ssr: false,
  },
);
const CheckoutPage = () => {
  const router = useRouter();
  const { data: loogedUser, isLoading } = useGetLoogedUserInfo();
  const { cart: cartItems } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);
  const [userCupon, setUserCupon] = useState("");
  const [cuponUsed, setCuponUsed] = useState(false);
  const { data: cuponData, isPending: cuponDataPending } = useGetAllCupons();
  const {
    mutate: handleCreateOrder,
    data: createdData,
    isPending: createOrderPending,
    isSuccess,
  } = useCreateOrder();
  let totalDiscountAmount = 0;

  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      setTotalAmount(total);
    }
  }, []);
  const totalQuantity = cartItems.reduce((acc, curr) => {
    acc += curr.quantity;

    return acc;
  }, 0);

  const orderedProduct = cartItems.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));

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
      totalPrice: totalAmount,
      customerName: data.customerName,
      customerEmail: loogedUser?.data?.email,
      customerAddress: data.customerAddress,
    };
    const productData = orderedProduct;

    handleCreateOrder({ orderData, productData });
  };

  const handleApplyCupon = () => {
console.log('asdf', cuponData)
    if (cuponData?.data) {
      if(cuponData.length>0){
        cuponData?.data?.forEach((cupon: TCupon) => {
          cupon?.appliedProducts?.forEach((product) => {
            cartItems.forEach((item) => {
              if (item.id === product.id) {
                if (userCupon === cupon.code) {
                  if (!cuponUsed) {
                    totalDiscountAmount += cupon.discountAmount * item.quantity;
                    setTotalAmount(totalAmount - totalDiscountAmount);
                    setCuponUsed(true);
                    toast.success("Congrate's cupon applied");
                  } else {
                    toast.error("Cupon already used!!!");
                  }
                } else {
                  toast.error("Invalid cupon");
                }
              }
            });
          });
        });
      }else{
        toast.error("No cupon available!")
      }
    }else{
      toast.error("Something went wrong!")
    }
  };

  if (isLoading || createOrderPending || cuponDataPending)
    return <DynamicLoading />;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Customer Information */}
        <div className="p-6 rounded-lg shadow-lg">
          <p className="font-medium text-xl mb-4">Customer Information</p>

          <div className="py-3 flex items-center gap-3">
            <Input
              label="Coupon Code"
              name="couponCode"
              size="sm"
              type="text"
              onChange={(e) => setUserCupon(e.target.value)}
              // placeholder="Enter your coupon"
            />
            <Button
              className="rounded-md bg-blue-600 text-white hover:bg-blue-700"
              size="sm"
              type="button"
              onClick={handleApplyCupon}
            >
              Apply Coupon
            </Button>
          </div>
          <NBForm
            defaultValues={{
              customerEmail: loogedUser?.data?.email,
            }}
            resolver={zodResolver(createOrderValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <NBInput
                disabled
                label="Email"
                name="customerEmail"
                size="sm"
                type="email"
              />
            </div>
            <div className="py-3">
              <NBInput label="Name" name="customerName" size="sm" type="text" />
            </div>
            <div className="py-3">
              <NBInput
                label="Address"
                name="customerAddress"
                size="sm"
                type="text"
              />
            </div>

            {/* Coupon Section */}

            <Button
              className="my-3 w-full rounded-md bg-default-900 text-default"
              size="lg"
              type="submit"
            >
              Checkout
            </Button>
          </NBForm>
        </div>

        {/* Right Side: Cart Items */}
        <div className="p-6 rounded-lg shadow-lg">
          <p className=" ont-medium text-xl mb-4">Your Cart</p>

          {/* Cart Items List */}
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500">
                Your cart is empty. Add items to your cart!
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b"
                >
                  <Image
                    alt={item.name || "image"}
                    className="w-16 h-16 rounded-md"
                    height={64}
                    src={item.image}
                    width={64}
                  />
                  <div className="flex-1 ml-4">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold">
                      Quantity: {item.quantity}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Summary */}
          <div className="flex justify-between mt-4">
            <p className="font-medium text-lg">Total</p>
            <p className="text-xl font-semibold">${totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
