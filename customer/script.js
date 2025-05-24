// Customer Authentication
function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}

function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

function customerLogin() {
  const email = document.getElementById("customerEmail").value;
  const password = document.getElementById("customerPassword").value;

  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const found = customers.find(
    (c) => c.email === email && c.password === password
  );

  if (found) {
    localStorage.setItem("currentCustomer", JSON.stringify(found));
    window.location.href = "restaurants.html";
  } else {
    alert("Invalid credentials!");
  }
}

function customerSignup() {
  const name = document.getElementById("customerName").value;
  const email = document.getElementById("newCustomerEmail").value;
  const password = document.getElementById("newCustomerPassword").value;

  if (!name || !email || !password) {
    alert("All fields are required!");
    return;
  }

  const customers = JSON.parse(localStorage.getItem("customers")) || [];

  // Check if email already exists
  if (customers.some((c) => c.email === email)) {
    alert("Email already registered!");
    return;
  }

  const newCustomer = {
    id: Date.now(),
    name,
    email,
    password,
  };

  customers.push(newCustomer);
  localStorage.setItem("customers", JSON.stringify(customers));
  localStorage.setItem("currentCustomer", JSON.stringify(newCustomer));

  alert("Account created successfully!");
  window.location.href = "restaurants.html";
}

// Initialize some sample customer data if none exists
if (!localStorage.getItem("customers")) {
  const sampleCustomer = {
    id: 1,
    name: "John Doe",
    email: "customer@example.com",
    password: "customer123",
  };
  localStorage.setItem("customers", JSON.stringify([sampleCustomer]));
}
