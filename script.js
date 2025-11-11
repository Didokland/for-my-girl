// ---------------------------
// 📁 script.js
// Исправленный код для UBT сайта
// ---------------------------

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();

  // ---------------------------
  // 🔐 Вход в систему (index.html)
  // ---------------------------
// logout батырмасы жұмыс істеуі үшін
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
  });
}

  // ---------------------------
  // 🧾 База данных (database.html)
  // ---------------------------
  if (currentPage === "database.html") {
    // Проверяем вход
    if (!localStorage.getItem("loggedIn")) {
      window.location.href = "index.html";
      return;
    }

    const saveBtn = document.getElementById("saveBtn");
    const dataInput = document.getElementById("dataInput");
    const dataList = document.getElementById("dataList");
    const logoutBtn = document.getElementById("logoutBtn");

    // --- Выход ---
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        window.location.href = "index.html";
      });
    }

    // --- Сохранение данных ---
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        const text = dataInput.value.trim();
        if (text === "") return;

        const li = document.createElement("li");
        li.textContent = text;
        dataList.appendChild(li);
        dataInput.value = "";

        // Сохраняем в localStorage
        const saved = JSON.parse(localStorage.getItem("userData") || "[]");
        saved.push(text);
        localStorage.setItem("userData", JSON.stringify(saved));
      });
    }

    // --- Загрузка старых данных ---
    window.addEventListener("load", () => {
      const saved = JSON.parse(localStorage.getItem("userData") || "[]");
      saved.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        dataList.appendChild(li);
      });
    });
  }

  // ---------------------------
  // 📚 Страницы курсов (courses.html и т.п.)
  // ---------------------------
  if (currentPage === "courses.html") {
    // сюда можно добавить фильтры, сортировку и т.д.
    console.log("Курстар беті ашылды");
  }

  // ---------------------------
  // 🧠 Тесттер беті (tests.html)
  // ---------------------------
  if (currentPage === "tests.html") {
    console.log("Тест беті ашылды");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();

  // ---------------------------
  // 🧍‍♂️ Регистрация (register.html)
  // ---------------------------
  if (currentPage === "register.html") {
    const form = document.getElementById("registerForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const user = document.getElementById("newUser").value.trim();
      const pass = document.getElementById("newPass").value.trim();

      if (!user || !pass) {
        alert("Логин және құпия сөз толтырыңыз!");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "{}");

      if (users[user]) {
        alert("Бұл логин бұрын тіркелген!");
        return;
      }

      users[user] = pass;
      localStorage.setItem("users", JSON.stringify(users));

      alert("Тіркелу сәтті өтті! Енді кіріңіз.");
      window.location.href = "index.html";
    });
  }

  // ---------------------------
  // 🔐 Вход (index.html)
  // ---------------------------
  if (currentPage === "index.html") {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const user = document.getElementById("loginUser").value.trim();
      const pass = document.getElementById("loginPass").value.trim();

      const users = JSON.parse(localStorage.getItem("users") || "{}");

      if (users[user] && users[user] === pass) {
        localStorage.setItem("loggedIn", user);
        window.location.href = "database.html";
      } else {
        alert("Қате логин немесе құпия сөз!");
      }
    });
  }

  // ---------------------------
  // 📊 База деректер (database.html)
  // ---------------------------
  if (currentPage === "database.html") {
    const user = localStorage.getItem("loggedIn");
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    const saveBtn = document.getElementById("saveBtn");
    const dataInput = document.getElementById("dataInput");
    const dataList = document.getElementById("dataList");
    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      window.location.href = "index.html";
    });

    saveBtn.addEventListener("click", () => {
      const text = dataInput.value.trim();
      if (text === "") return;

      const li = document.createElement("li");
      li.textContent = `${user}: ${text}`;
      dataList.appendChild(li);
      dataInput.value = "";

      const allData = JSON.parse(localStorage.getItem("userData") || "{}");
      if (!allData[user]) allData[user] = [];
      allData[user].push(text);
      localStorage.setItem("userData", JSON.stringify(allData));
    });

    window.addEventListener("load", () => {
      const allData = JSON.parse(localStorage.getItem("userData") || "{}");
      if (allData[user]) {
        allData[user].forEach((item) => {
          const li = document.createElement("li");
          li.textContent = `${user}: ${item}`;
          dataList.appendChild(li);
        });
      }
    });
  }
});
