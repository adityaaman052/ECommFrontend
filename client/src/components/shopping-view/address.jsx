import { useEffect, useState } from "react";
import CommonForm from "../common/form"; // Reusable form component
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"; // UI components
import { addressFormControls } from "@/config"; // Form controls configuration
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice"; // Redux actions for managing addresses
import AddressCard from "./address-card"; // Component to display individual address
import { useToast } from "../ui/use-toast"; // Custom hook for showing toast notifications

// Initial form data structure for addresses
const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData); // State to hold form data
  const [currentEditedId, setCurrentEditedId] = useState(null); // Track the address being edited
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Access current user info
  const { addressList } = useSelector((state) => state.shopAddress); // Access list of addresses
  const { toast } = useToast(); // Toast notifications

  // Function to handle adding, editing, or updating addresses
  function handleManageAddress(event) {
    event.preventDefault();

    // Prevent adding more than 3 addresses
    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive", // Show error toast if there are already 3 addresses
      });
      return;
    }

    // Check if we're editing an existing address or adding a new one
    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id)); // Fetch updated list of addresses
            setCurrentEditedId(null); // Reset the edited ID after successful edit
            setFormData(initialAddressFormData); // Clear form fields
            toast({
              title: "Address updated successfully", // Success toast
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id)); // Fetch updated list of addresses
            setFormData(initialAddressFormData); // Clear form fields
            toast({
              title: "Address added successfully", // Success toast
            });
          }
        });
  }

  // Function to delete an address
  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id)); // Fetch updated list of addresses
        toast({
          title: "Address deleted successfully", // Success toast
        });
      }
    });
  }

  // Function to set the form data for editing an existing address
  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id); // Set the ID of the address being edited
    setFormData({
      ...formData,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes,
    });
  }

  // Function to validate the form (ensure all fields are filled)
  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "") // Ensure each form field is not empty
      .every((item) => item); // Return true only if all fields are valid
  }

  // Fetch all addresses when the component mounts
  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id)); // Fetch the user's addresses
  }, [dispatch, user?.id]);

  return (
    <Card>
      {/* Display the list of addresses */}
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      
      {/* Header with title for adding or editing an address */}
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      
      {/* Form for adding/editing address */}
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls} // Form control configuration
          formData={formData} // Current form data
          setFormData={setFormData} // Function to update form data
          buttonText={currentEditedId !== null ? "Edit" : "Add"} // Button text based on edit or add mode
          onSubmit={handleManageAddress} // Handle form submission
          isBtnDisabled={!isFormValid()} // Disable button if form is invalid
        />
      </CardContent>
    </Card>
  );
}

export default Address;
