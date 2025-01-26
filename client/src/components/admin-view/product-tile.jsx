import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        {/* Product Image */}
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          {/* Product Title */}
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          
          <div className="flex justify-between items-center mb-2">
            {/* Display Product Price (with strikethrough if on sale) */}
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            
            {/* Display Sale Price if applicable */}
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        
        {/* Card Footer with Edit and Delete buttons */}
        <CardFooter className="flex justify-between items-center">
          {/* Edit Button to open the create product dialog and populate it with current product data */}
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true); // Open dialog for editing product
              setCurrentEditedId(product?._id); // Set the current product id
              setFormData(product); // Set the form data for the product to be edited
            }}
          >
            Edit
          </Button>
          
          {/* Delete Button to remove the product */}
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
