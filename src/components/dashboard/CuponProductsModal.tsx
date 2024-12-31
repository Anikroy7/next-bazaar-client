import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { FaEye } from "react-icons/fa";

import ProductCard from "../products/ProductCard";

import { TProduct } from "@/src/types";

export default function CuponProductsModal({
  products,
}: {
  products: TProduct[];
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>
        View
        <FaEye style={{ marginRight: "8px" }} />
      </Button>
      <Modal isOpen={isOpen} size="full" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <>
                  <div>
                    <h2 className="text-2xl text-center font-semibold py-6">
                      Applied cupon products
                    </h2>
                    {products && products.length ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product: TProduct) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-xl text-gray-600">
                        No products found!!
                      </p>
                    )}
                  </div>
                </>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {/*  <Button color="primary" onPress={onClose}>
                                    Action
                                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
