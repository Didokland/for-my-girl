// ---------------------------
// 📁 script.js
// Исправленный код для UBT сайта (универсальный)
// ---------------------------

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();

  
  // ---------------------------
  // 🔐 Кнопка выхода (logout)
  // ---------------------------
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
    if (!localStorage.getItem("loggedIn")) {
      window.location.href = "index.html";
      return;
    }

    const saveBtn = document.getElementById("saveBtn");
    const dataInput = document.getElementById("dataInput");
    const dataList = document.getElementById("dataList");

    if (saveBtn && dataInput && dataList) {
      saveBtn.addEventListener("click", () => {
        const text = dataInput.value.trim();
        if (!text) return;

        const user = localStorage.getItem("loggedIn");
        const li = document.createElement("li");
        li.textContent = `${user}: ${text}`;
        dataList.appendChild(li);
        dataInput.value = "";

        const allData = JSON.parse(localStorage.getItem("userData") || "{}");
        if (!allData[user]) allData[user] = [];
        allData[user].push(text);
        localStorage.setItem("userData", JSON.stringify(allData));
      });

      // Загрузка сохраненных данных
      const user = localStorage.getItem("loggedIn");
      const allData = JSON.parse(localStorage.getItem("userData") || "{}");
      if (allData[user]) {
        allData[user].forEach(item => {
          const li = document.createElement("li");
          li.textContent = `${user}: ${item}`;
          dataList.appendChild(li);
        });
      }
    }
  }

  // ---------------------------
  // 📚 Страницы курсов и тестов
  // ---------------------------
  if (currentPage === "courses.html") console.log("Курстар беті ашылды");
  if (currentPage === "tests.html") console.log("Тест беті ашылды");

  // ---------------------------
  // 🧍‍♂️ Регистрация (register.html)
  // ---------------------------
  if (currentPage === "register.html") {
    const form = document.getElementById("registerForm");
    if (form) {
      form.addEventListener("submit", e => {
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
  }

  // ---------------------------
  // 🔐 Вход (index.html)
  // ---------------------------
  if (currentPage === "index.html") {
    const form = document.getElementById("loginForm");
    if (form) {
      form.addEventListener("submit", e => {
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
  }

  // ---------------------------
  // 🌄 Фоновый слайдер (bg-slider)
  // ---------------------------
  const images = [
  "ubt_taps.jpg",
  "ubt_taps2.jpg",
  "ubt_taps3.jpg",
  "ubt_taps4.jpg"
];

// Предзагрузка картинок
images.forEach(src => {
  const img = new Image();
  img.src = src;
});

const bg = document.querySelector(".bg-slider");

if (bg) { // проверка, что блок есть
  let index = 0;
  bg.style.backgroundImage = `url('${images[0]}')`; // стартовое изображение
  setInterval(() => {
    index = (index + 1) % images.length;
    bg.style.backgroundImage = `url('${images[index]}')`;
  }, 5000);
}


  // ---------------------------
  // 🖼️ Модальное окно и вертикальная карусель
  // ---------------------------
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  const closeModal = document.getElementById("closeModal");

  if (modal && modalImg && closeModal) {
    document.querySelectorAll(".vertical-track img").forEach(img => {
      img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
      });
    });

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", e => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

});
