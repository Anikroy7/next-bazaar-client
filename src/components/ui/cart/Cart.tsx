"use client";

import { Button } from "@nextui-org/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@nextui-org/drawer";
import { useDisclosure } from "@nextui-org/modal";
import { useRouter } from "next/navigation";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import Image from "next/image";

import { useCart } from "@/src/context/cart.provider";
import { useUser } from "@/src/context/user.prodvier";

export default function Cart() {
  const router = useRouter();
  const { user } = useUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { cart, dispatch } = useCart();
  const totalQuantity = cart.reduce((acc, curr) => {
    acc += curr.quantity;

    return acc;
  }, 0);

  const toatalCost = cart.reduce((acc, curr) => {
    acc += curr.price * curr.quantity;

    return acc;
  }, 0);

  const handleCartQuantity = (type: "plus" | "minius", id: number) => {
    if (type === "minius") {
      const product = cart.find((item) => item.id === id);

      if (product && product.quantity > 1) {
        dispatch({
          type: "DECREMENT_QUANTITY",
          payload: { id },
        });
      } else {
        dispatch({
          type: "REMOVE_FROM_CART",
          payload: id,
        });
      }
    }
    if (type === "plus") {
      const product = cart.find((item) => item.id === id);

      if (product) {
        dispatch({
          type: "ADD_TO_CART",
          payload: product,
        });
      }
    }
  };

  const handleRemoveProduct = (id: number) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };

  return (
    <>
      {/* Floating Add to Cart Button */}
      <div className="">
        <Button
          className="relative flex items-center justify-center space-x-2  text-default-900 font-semibold px-6 py-3 rounded-full shadow-lg"
          onPress={onOpen}
        >
          {/* Cart Icon */}
          <div className="relative">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 5h14m-8-5v5m4-5v5M5 6h14"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Badge for Item Count */}
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1 py-0.5 rounded-full">
              {totalQuantity}
            </span>
          </div>
        </Button>
      </div>

      {/* Drawer Component */}
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Your Cart
              </DrawerHeader>
              <div className="flex gap-3 items-center px-6">
                <h2>Total Cost: </h2>
                <h3>${toatalCost}</h3>
              </div>
              <DrawerBody>
                {cart.length === 0 ? (
                  <p>
                    Your cart is currently empty. Start shopping to add items to
                    your cart!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-4 border-b"
                      >
                        <Image
                          alt={item.name}
                          className="w-16 h-16 rounded-md"
                          height={64}
                          src={item.image}
                          width={64}
                        />
                        <div className="flex-1 ml-4">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-600">${item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2 gap-4">
                          {/*  <Button
                            color="secondary"
                            size="sm"
                            // onPress={() => handleDecreaseQuantity(item.id)}
                            className="flex items-center justify-center p-1"
                          >
                          </Button> */}
                          <div className="flex items-center gap-2">
                            <p>
                              <FaMinus
                                className="text-sm cursor-pointer hover:text-red-500 transition duration-200 ease-in-out"
                                onClick={() =>
                                  handleCartQuantity("minius", item.id)
                                }
                              />
                            </p>
                            <p>
                              <span className="text-lg font-semibold">
                                {item.quantity}
                              </span>
                            </p>
                            <p>
                              <FaPlus
                                className="text-sm cursor-pointer hover:text-green-500 transition duration-200 ease-in-out"
                                onClick={() =>
                                  handleCartQuantity("plus", item.id)
                                }
                              />
                            </p>
                          </div>

                          <div>
                            <FaTrash
                              className="text-sm text-danger-500 cursor-pointer hover:text-red-700 transition duration-200 ease-in-out"
                              onClick={() => handleRemoveProduct(item.id)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </DrawerBody>
              <DrawerFooter className="flex space-x-4">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {user?.role !== "ADMIN" && user?.role !== "VENDOR" && (
                  <Button
                    color="primary"
                    onClick={() => router.push("/checkout")}
                    onPress={onClose}
                  >
                    Proceed to Checkout
                  </Button>
                )}
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
