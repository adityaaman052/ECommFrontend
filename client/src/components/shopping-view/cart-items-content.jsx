import { Minus, Plus, Trash } from "lucide-react"; // Importing icons for UI
import { Button } from "../ui/button"; // Importing button component
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice"; // Redux actions to handle cart items
import { useToast } from "../ui/use-toast"; // Custom hook for displaying toast notifications

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth); // Access current user from auth state
  const { cartItems } = useSelector((state) => state.shopCart); // Access cart items from shopCart state
  const { productList } = useSelector((state) => state.shopProducts); // Access product list to check stock
  const dispatch = useDispatch(); // Dispatch function to send actions to Redux store
  const { toast } = useToast(); // Toast notifications

  // Function to handle updating the cart item quantity (either increase or decrease)
  function handleUpdateQuantity(getCartItem, typeOfAction) {
    // Only check the stock if increasing the quantity
    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || []; // Get current items in the cart

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId // Find the cart item index
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId // Find the product in the product list
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock; // Get the stock for the product

        // If the quantity exceeds available stock, show a toast and return early
        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`, // Toast showing stock limit
              variant: "destructive", // Error variant
            });
            return;
          }
        }
      }
    }

    // Dispatch the action to update the quantity in the cart
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity: typeOfAction === "plus" ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1, // Increase or decrease quantity
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully", // Toast showing success message
        });
      }
    });
  }

  // Function to handle deleting a cart item
  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId }) // Dispatch action to delete item
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully", // Success message when item is deleted
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Displaying the product image */}
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        {/* Displaying the product title */}
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          {/* Button to decrease quantity */}
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1} // Disable the button if quantity is 1
            onClick={() => handleUpdateQuantity(cartItem, "minus")} // Decrease quantity
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span> {/* Accessible label */}
          </Button>
          {/* Displaying the current quantity */}
          <span className="font-semibold">{cartItem?.quantity}</span>
          {/* Button to increase quantity */}
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")} // Increase quantity
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span> {/* Accessible label */}
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        {/* Displaying the total price for the cart item */}
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)} {/* Calculate price based on quantity */}
        </p>
        {/* Trash icon to delete the cart item */}
        <Trash
          onClick={() => handleCartItemDelete(cartItem)} // Trigger delete function
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
