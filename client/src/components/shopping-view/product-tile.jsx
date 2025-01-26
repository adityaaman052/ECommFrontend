import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

// ShoppingProductTile component to display a single product's information
function ShoppingProductTile({
  product, // Product data
  handleGetProductDetails, // Function to handle product details navigation
  handleAddtoCart, // Function to handle adding the product to the cart
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      {/* Product image and condition-based badge display */}
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          {/* Product Image */}
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          
          {/* Conditional badges based on product stock or sale */}
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>

        {/* Product details */}
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          
          {/* Category and brand display */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]} {/* Map category */}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]} {/* Map brand */}
            </span>
          </div>

          {/* Price and sale price display */}
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : "" // Strike-through original price if on sale
              } text-lg font-semibold text-primary`}
            >
              ${product?.price} {/* Original price */}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice} {/* Sale price */}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>

      {/* Add to cart button or out-of-stock message */}
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock {/* Disable the button when out of stock */}
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)} // Add product to cart
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
