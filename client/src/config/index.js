export const registerFormControls = [
    {
      name: "userName",
      label: "User Name",
      placeholder: "Enter your user name",
      componentType: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];
  
  export const loginFormControls = [
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];
  
  export const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "formal", label: "Formal" },
        { id: "casual", label: "Casual" },
        { id: "evening", label: "Evening" },
        { id: "romance", label: "Romance" },
        { id: "cultural", label: "Cultural" },
      ],
    },
    {
      label: "Brand",
      name: "brand",
      componentType: "select",
      options: [
        { id: "tomford", label: "Tom Ford" },
        { id: "calvinklein", label: "Calvin Klein" },
        { id: "gucci", label: "Gucci" },
        { id: "saintlaurent", label: "Saint Laurent" },
        { id: "giorgioarmani", label: "Giorgio Armani" },
        { id: "creed", label: "Creed" },
      ],
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];
  
  export const shoppingViewHeaderMenuItems = [
    {
      id: "home",
      label: "Home",
      path: "/shop/home",
    },
    {
      id: "products",
      label: "Products",
      path: "/shop/listing",
    },
    {
      id: "formal",
      label: "Formal",
      path: "/shop/listing",
    },
    {
      id: "casual",
      label: "Casual",
      path: "/shop/listing",
    },
    {
      id: "evening",
      label: "Evening",
      path: "/shop/listing",
    },
    {
      id: "romance",
      label: "Romance",
      path: "/shop/listing",
    },
    {
      id: "cultural",
      label: "Cultural",
      path: "/shop/listing",
    },
    {
      id: "search",
      label: "Search",
      path: "/shop/search",
    },
  ];
  
  export const categoryOptionsMap = {
    formal: "Formal",
    casual: "Casual",
    evening: "Evening",
    romance: "Romance",
    cultural: "Cultural",
  };
  
  export const brandOptionsMap = {
    tomford: "Tom Ford",
    calvinklein: "Calvin Klein",
    gucci: "Gucci",
    saintlaurent: "Saint Laurent",
    giorgioarmani: "Giorgio Armani",
    creed : "Creed",
  };
  
  export const filterOptions = {
    category: [
      { id: "formal", label: "Formal" },
      { id: "casual", label: "Casual" },
      { id: "evening", label: "Evening" },
      { id: "romance", label: "Romance" },
      { id: "cultural", label: "Cultural" },
    ],
    brand: [
      { id: "tomford", label: "Tom Ford" },
      { id: "calvinklein", label: "Calvin Klein" },
      { id: "gucci", label: "Gucci" },
      { id: "saintlaurent", label: "Saint Laurent" },
      { id: "giorgioarmani", label: "Giorgio Armani" },
      { id: "creed", label: "Creed" },
    ],
  };
  
  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];
  
  export const addressFormControls = [
    {
      label: "Address",
      name: "address",
      componentType: "input",
      type: "text",
      placeholder: "Enter your address",
    },
    {
      label: "City",
      name: "city",
      componentType: "input",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      label: "Pincode",
      name: "pincode",
      componentType: "input",
      type: "text",
      placeholder: "Enter your pincode",
    },
    {
      label: "Phone",
      name: "phone",
      componentType: "input",
      type: "text",
      placeholder: "Enter your phone number",
    },
    {
      label: "Notes",
      name: "notes",
      componentType: "textarea",
      placeholder: "Enter any additional notes",
    },
  ];
  