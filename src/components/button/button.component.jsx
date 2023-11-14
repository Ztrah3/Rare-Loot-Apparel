import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from './button.styles';

// Defining a constant for button type classes
export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
};

// Function to get the appropriate button component based on the button type
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

// Defining the main Button component
const Button = ({ children, buttonType, ...otherProps }) => {
  // Getting the appropriate button component
  const CustomButton = getButton(buttonType);
  // Rendering the button with the passed props and children
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
