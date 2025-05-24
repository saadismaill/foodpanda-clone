// Admin Authentication
function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}

function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

function adminLogin() {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  const admins = JSON.parse(localStorage.getItem("admins")) || [];
  const found = admins.find(
    (a) => a.email === email && a.password === password
  );

  if (found) {
    localStorage.setItem("currentAdmin", JSON.stringify(found));
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials!");
  }
}

function adminSignup() {
  const name = document.getElementById("adminName").value;
  const email = document.getElementById("newAdminEmail").value;
  const password = document.getElementById("newAdminPassword").value;

  if (!name || !email || !password) {
    alert("All fields are required!");
    return;
  }

  const admins = JSON.parse(localStorage.getItem("admins")) || [];

  if (admins.some((a) => a.email === email)) {
    alert("Email already registered!");
    return;
  }

  const newAdmin = {
    id: Date.now(),
    name,
    email,
    password,
  };

  admins.push(newAdmin);
  localStorage.setItem("admins", JSON.stringify(admins));
  localStorage.setItem("currentAdmin", JSON.stringify(newAdmin));

  const restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
  restaurants.push({
    id: newAdmin.id,
    name,
    rating: 0,
    adminId: newAdmin.id,
  });
  localStorage.setItem("restaurants", JSON.stringify(restaurants));

  alert("Account created successfully!");
  window.location.href = "dashboard.html";
}

// Initialize sample data
if (!localStorage.getItem("admins")) {
  const sampleAdmin = {
    id: 1,
    name: "Sample Restaurant",
    email: "admin@example.com",
    password: "admin123",
  };
  localStorage.setItem("admins", JSON.stringify([sampleAdmin]));

  const sampleRestaurant = {
    id: 1,
    name: "Sample Restaurant",
    rating: 4.5,
    adminId: 1,
  };
  localStorage.setItem("restaurants", JSON.stringify([sampleRestaurant]));

  const sampleCategories = [
    { id: 1, name: "Starters" },
    { id: 2, name: "Main Course" },
    { id: 3, name: "Desserts" },
  ];
  localStorage.setItem("categories", JSON.stringify(sampleCategories));

  const sampleItems = [
    {
      id: 1,
      name: "French Fries",
      price: 120,
      categoryId: 1,
      description: "Crispy golden fries",
      image: "default-food.jpg",
    },
    {
      id: 2,
      name: "Chicken Tikka",
      price: 350,
      categoryId: 2,
      description: "Spicy grilled chicken",
      image: "default-food.jpg",
    },
    {
      id: 3,
      name: "Chocolate Cake",
      price: 200,
      categoryId: 3,
      description: "Rich chocolate flavor",
      image: "default-food.jpg",
    },
  ];
  localStorage.setItem("menuItems", JSON.stringify(sampleItems));
}
