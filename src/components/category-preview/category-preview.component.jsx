import ProductCard from '../product-card/product-card.component';

import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from './category-preview.styles';

// Defining the CategoryPreview component
const CategoryPreview = ({ title, products }) => {
  // Rendering the category preview
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products
        // Filtering the products to only include the first 4
          .filter((_, idx) => idx < 4)
          // Mapping over the filtered products and rendering a ProductCard for each
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
