const loginForm = document.getElementById("login-form");
const errorMsg = document.getElementById("error");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "admin@example.com" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "admin.html";
    } else {
      errorMsg.textContent = "Email hoặc mật khẩu không đúng!";
    }
  });
}

if (window.location.pathname.includes("admin.html")) {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
  }
}

const logoutBtn = document.querySelector(".logout");
const addUserForm = document.querySelector(".adduser-form");
const userTableBody = document.querySelector("#user-table tbody");

let users = JSON.parse(localStorage.getItem("users")) || [];

function renderUsers() {
  userTableBody.innerHTML = "";
  users.forEach((user, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
        <button class="edit" data-index="${index}">Sửa</button>
        <button class="delete" data-index="${index}">Xóa</button>
      </td>
    `;

    userTableBody.appendChild(row);
  });
}

if (addUserForm) {
  addUserForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value.trim();

    if (name && email && role) {
      users.push({ name, email, role });
      localStorage.setItem("users", JSON.stringify(users));
      renderUsers();
      addUserForm.reset();
    }
  });
}

if (userTableBody) {
  userTableBody.addEventListener("click", function (e) {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("delete")) {
      users.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(users));
      renderUsers();
    } else if (e.target.classList.contains("edit")) {
      const user = users[index];
      const newName = prompt("Nhập họ tên mới:", user.name);
      const newEmail = prompt("Nhập email mới:", user.email);
      const newRole = prompt("Nhập vai trò mới:", user.role);

      if (newName && newEmail && newRole) {
        users[index] = { name: newName, email: newEmail, role: newRole };
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
      }
    }
  });
}

if (userTableBody) {
  renderUsers();
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
  });
}
