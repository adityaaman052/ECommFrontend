import { SprayCan, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

// MenuItems component - displays the menu items in the navigation
function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Handle navigation when a menu item is clicked
  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters"); // clear previous filters

    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? { category: [getCurrentMenuItem.id] } // set a category filter for specific pages
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter)); // save filter to sessionStorage

    // If on a listing page, update search params, otherwise navigate to the path
    if (location.pathname.includes("listing") && currentFilter !== null) {
      setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`));
    } else {
      navigate(getCurrentMenuItem.path);
    }
  }

  return (
    <nav className="flex flex-col gap-4 lg:gap-6 lg:flex-row">
      {/* Map through menu items and display them */}
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          key={menuItem.id} // Set a unique key for each item
          onClick={() => handleNavigate(menuItem)} // Navigate on click
          className="text-sm font-medium cursor-pointer text-white hover:scale-105 transition-transform"
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

// HeaderRightContent component - displays user-related information and cart functionality
function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle logout action
  function handleLogout() {
    dispatch(logoutUser()); // Dispatch logout action to update state
  }

  // Fetch cart items when user logs in
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id)); // Fetch cart items by user ID
    }
  }, [dispatch, user?.id]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      {/* Cart button with sheet */}
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)} // Open the cart sheet on click
          variant="outline"
          size="icon"
          className="relative text-black border-black hover:bg-black hover:text-white"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0} {/* Display number of items in cart */}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items || []} // Pass cart items to the wrapper
        />
      </Sheet>

      {/* Dropdown menu for user options */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0]?.toUpperCase()} {/* Display user's initial */}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* Navigate to account page */}
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4 text-black" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* Handle logout */}
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4 text-black" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// Main shopping header component
function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header
      className="sticky top-0 z-40 w-full border-b"
      style={{
        backgroundColor: "#0F3443", // Set background color
        color: "#34E89E", // Set text color
      }}
    >
      <div className="flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo and link to home page */}
        <Link to="/shop/home" className="flex items-center gap-3">
          <SprayCan className="h-7 w-7 text-white" />
          <span className="text-xl font-bold text-white">Fragrencia</span>
        </Link>

        {/* Menu items for large screens */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* User options and cart for large screens */}
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>

        {/* Mobile menu toggle */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6 text-black" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default ShoppingHeader;
