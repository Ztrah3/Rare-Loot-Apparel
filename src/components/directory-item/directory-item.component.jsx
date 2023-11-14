import { useNavigate } from 'react-router-dom';

import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './directory-item.styles';

// Defining the DirectoryItem component
const DirectoryItem = ({ category }) => {
  // Destructuring properties from the category prop
  const { imageUrl, title, route } = category;
  // Using useNavigate to get the navigate function for navigation
  const navigate = useNavigate();

  // Handler function for navigating to the category route
  const onNavigateHandler = () => navigate(route);

  // Rendering the directory item
  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
