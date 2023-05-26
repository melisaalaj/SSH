export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const productData = [
  {
    id: 1,
    imageurl:
      "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    name: "Burger",
    number: "2.50$",
    description: "Chickenburger ",
  },
  {
    id: 2,
    imageurl:
      "https://images.unsplash.com/photo-1603903631889-b5f3ba4d5b9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpY2tlbiUyMHNhbmR3aWNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
    name: "Sandwich",
    number: "2$",
    description: "Sandwich pule",
  },
  {
    id: 3,
    imageurl:
      "https://plus.unsplash.com/premium_photo-1673816936941-93621f755771?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dG9hc3QlMjB3aXRoJTIwZWdnfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
    name: "Toast ",
    number: "2.80$",
    description: "Tost me veze",
  },
  {
    id: 4,
    imageurl:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGFjb3N8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60",

    name: "French Tacos ",
    number: "3.30$",
    description: "the best in Townnnn ..",
  },
  {
    id: 5,
    imageurl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60",
    name: "Pizza",
    number: "4.30$",
    description: "..",
  },
  {
    id: 6,
    imageurl:
      "https://images.unsplash.com/photo-1584947897804-408958123f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNoaWNrZW4lMjBzYW5kd2ljaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60",
    name: "Burrito",
    number: "3$",
    description: "..",
  },
  {
    id: 7,
    imageurl:
      "https://images.unsplash.com/photo-1426869981800-95ebf51ce900?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhc3QlMjBmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
    name: "Chicken wing",
    number: "2.50$",
    description: "..",
  },
  {
    id: 8,
    imageurl:
      "https://images.unsplash.com/photo-1598679253544-2c97992403ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc3QlMjBmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
    name: "Fries",
    number: "1.80$",
    description: "With sauce",
  },
];

export const menuData = {
  sandwiches: [
    {
      name: "Turkey Club",
      desc: "Roasted turkey, bacon, lettuce, and tomato on toasted bread",
      price: "9.99",
      image:
        "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "BLT",
      desc: "Crispy bacon, lettuce, and tomato on toasted bread",
      price: "8.99",
      image:
        "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Chicken Caesar Wrap",
      desc: "Grilled chicken, romaine lettuce, Parmesan cheese, and Caesar dressing wrapped in a tortilla",
      price: "7.99",
      image:
        "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
  ],
  pizza: [
    {
      name: "Margherita",
      desc: "Fresh mozzarella, tomatoes, and basil",
      price: "12.99",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Pepperoni",
      desc: "Classic pepperoni with marinara sauce and mozzarella cheese",
      price: "13.99",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Vegetarian",
      desc: "Assorted fresh vegetables with marinara sauce and mozzarella cheese",
      price: "11.99",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ],
  rizotto: [
    {
      name: "Mushroom Rizotto",
      desc: "Creamy Arborio rice cooked with mushrooms and Parmesan cheese",
      price: "10.99",
      image: "https://images.unsplash.com/photo-1546456674-7ce72b9286b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Seafood Rizotto",
      desc: "Arborio rice cooked with a variety of seafood in a rich tomato-based sauce",
      price: "14.99",
      image: "https://images.unsplash.com/photo-1546456674-7ce72b9286b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Pumpkin Rizotto",
      desc: "Creamy Arborio rice cooked with roasted pumpkin and sage",
      price: "9.99",
      image: "https://images.unsplash.com/photo-1546456674-7ce72b9286b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
  ],
  salads: [
    {
      name: "Caesar Salad",
      desc: "Romaine lettuce, croutons, Parmesan cheese, and Caesar dressing",
      price: "6.99",
      image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1078&q=80"
    },
    {
      name: "Greek Salad",
      desc: "Mixed greens, tomatoes, cucumbers, red onions, Kalamata olives, and feta cheese with Greek dressing",
      price: "7.99",
      image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1078&q=80"
    },
    {
      name: "Caprese Salad",
      desc: "Fresh mozzarella, tomatoes, basil, and balsamic glaze",
      price: "8.99",
      image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1078&q=80"
    },
  ],
};
