import { CartItemContainer, ItemDetails } from './cart-item.styles';

// Defining the CartItem component
const CartItem = ({ cartItem }) => {
  // Destructuring properties from the cartItem prop
  const { name, imageUrl, price, quantity } = cartItem;
   // Rendering the cart item
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
