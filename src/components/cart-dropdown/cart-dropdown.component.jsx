import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles';

// Defining the CartDropdown component
const CartDropdown = () => {
  // Using useSelector to get the cart items from Redux state
  const cartItems = useSelector(selectCartItems);
  // Using useNavigate to get the navigate function for navigation
  const navigate = useNavigate();

  // Handler function for going to the checkout page
  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  // Rendering the cart dropdownf
  return (
    <CartDropdownContainer>
      <CartItems>
        
        {cartItems.length ? (  // If there are cart items, map over them and render a CartItem for each
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          // If there are no cart items, render an empty message
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
