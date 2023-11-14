import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from './product-card.styles';

// Defining the ProductCard component
const ProductCard = ({ product }) => {
  // Destructuring properties from the product prop
  const { name, price, imageUrl } = product;
  // Getting the dispatch function from Redux
  const dispatch = useDispatch();
  // Using useSelector to get the cart items from Redux state
  const cartItems = useSelector(selectCartItems);

  // Handler function for adding the product to the cart
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  // Rendering the product card
  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;
