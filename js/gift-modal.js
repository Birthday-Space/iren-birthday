const giftBtn = document.getElementById("get-gift-btn");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");

// Контент модалки с заклинанием
const spellContent = `
  <div class="spell-container">
    <h2 class="modal-title">🔮 Прочитай заклинание</h2>
    <p class="spell-text">
      Русланий!<br> Зайка моя… Цветочек мой… Бусинка моя…<br>
      Отдай мой подарочек пожалуйста 🙏✨
    </p>
    <button class="confirm-spell-btn" id="confirm-spell-btn">Фффухх... Получила!!!!</button>
  </div>
`;

// Обработка клика на кнопку "Получить подарок"
giftBtn.addEventListener("click", () => {
  modalBody.innerHTML = spellContent;
  modal.classList.add("active");

  // Назначаем обработчик на появившуюся кнопку
  setTimeout(() => {
    const confirmSpell = document.getElementById("confirm-spell-btn");
    if (confirmSpell) {
      confirmSpell.addEventListener("click", () => {
        modal.classList.remove("active");
        launchFireworks(); // запускаем фейерверки
      });
    }
  }, 100);
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Функция фейерверков
function launchFireworks() {
  const container = document.createElement("div");
  container.className = "fireworks-container";
  document.body.appendChild(container);

  for (let i = 0; i < 20; i++) {
    const firework = document.createElement("div");
    firework.className = "firework";
    firework.style.left = `${Math.random() * 100}vw`;
    firework.style.top = `${Math.random() * 80}vh`;
    firework.style.backgroundColor = getRandomFireworkColor();
    container.appendChild(firework);
  }

  setTimeout(() => {
    container.remove();
  }, 3000);
}

function getRandomFireworkColor() {
  const colors = [
    "#ff4d4d",
    "#ffcc00",
    "#66ccff",
    "#66ff66",
    "#cc66ff",
    "#ffffff",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
