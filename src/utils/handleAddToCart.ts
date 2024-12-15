const handleAddToCart = (id: string) => {
  const cartItems = localStorage.getItem("cartItems");

  if (!cartItems) {
    localStorage.setItem("cartItems", JSON.stringify({ [id]: 1 }));
  } else {
    const parsedCartItem = JSON.parse(cartItems);

    if (parsedCartItem[id]) {
      parsedCartItem[id] = parsedCartItem[id] + 1;
    } else {
      parsedCartItem[id] = 1;
    }
    localStorage.setItem("cartItems", JSON.stringify(parsedCartItem));
  }
};

export default handleAddToCart;
