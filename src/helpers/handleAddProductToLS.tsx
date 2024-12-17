import { TProduct } from "../types";

const handleAddProductToLs = (product: TProduct) => {
  const recentProducts = localStorage.getItem("recentProducts");

  if (!recentProducts) {
    localStorage.setItem("recentProducts", JSON.stringify([product]));
  } else {
    const parsedRecentProduct = JSON.parse(
      localStorage.getItem("recentProducts") as string,
    );
    const isProductExits = parsedRecentProduct.find(
      (pd: TProduct) => pd.id === product.id,
    );

    if (!isProductExits) {
      localStorage.setItem(
        "recentProducts",
        JSON.stringify([product, ...parsedRecentProduct]),
      );
    }
  }
};

export default handleAddProductToLs;
