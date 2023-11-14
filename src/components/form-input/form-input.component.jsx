import { FormInputLabel, Input, Group } from './form-input.styles';

// Defining the FormInput component
const FormInput = ({ label, ...otherProps }) => {
  // Rendering the form input
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        // If there's a label, render the FormInputLabel
        // The shrink prop is true if the input value has a length (i.e., is not empty)
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
