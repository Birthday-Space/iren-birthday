"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");

  document.querySelectorAll(".greeting-card").forEach((card) => {
    card.addEventListener("click", () => {
      const type = card.dataset.type;
      const src = card.dataset.src;
      const text = card.dataset.text || "";
      modalBody.innerHTML = "";

      // Если тип - видео или аудио, приглушаем фон
      if (["video", "audio", "youtube", "image-audio"].includes(type)) {
        setBackgroundMusicVolume(0.05);
      } else {
        setBackgroundMusicVolume(1);
      }

      switch (type) {
        case "video":
          modalBody.innerHTML = ` 
            <video controls autoplay style="width: 100%;">
              <source src="${src}" type="video/mp4">
              Ваш браузер не поддерживает видео.
            </video>`;
          break;

        case "youtube":
          const isShorts = src.includes("shorts");
          const videoId = isShorts
            ? src.split("/shorts/")[1]
            : src.match(/(?:youtu\.be\/|youtube\.com.*v=)([^&\n?#]+)/)[1];

          modalBody.innerHTML = ` 
            <div class="video-wrapper">
              <iframe width="100%" height="400" 
                src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0${
            isShorts ? "&mute=0" : ""
          }" 
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
              </iframe>
            </div>
          `;
          break;

        case "audio":
          modalBody.innerHTML = ` 
            <audio controls autoplay style="width: 100%;">
              <source src="${src}" type="audio/mpeg">
              Ваш браузер не поддерживает аудио.
            </audio>`;
          break;
        case "image-audio":
          const audioSrc = card.dataset.audio;
          modalBody.innerHTML = ` 
            <img src="${src}" alt="Поздравление" style="width: 100%; border-radius: 10px; margin-bottom: 10px;">
            <audio controls autoplay style="width: 100%;">
              <source src="${audioSrc}" type="audio/mpeg">
              Ваш браузер не поддерживает аудио.
            </audio>`;
          break;

        case "image":
          modalBody.innerHTML = `<img src="${src}" alt="Поздравление" style="width: 100%; border-radius: 10px;">`;
          break;

        case "image-text":
          modalBody.innerHTML = ` 
            <img src="${src}" alt="Поздравление" style="width: 100%; border-radius: 10px; margin-bottom: 10px;">
            <p>${text}</p>`;
          break;

        case "text":
        default:
          modalBody.innerHTML = `<p>${src}</p>`;
          break;
      }

      modal.classList.add("active");
    });
  });

  modalClose.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    setBackgroundMusicVolume(1);
    modal.classList.remove("active");
    modalBody.innerHTML = "";
    launchCelebration();
  }

  function launchCelebration() {
    const balloonContainer = document.getElementById("balloons-container");
    const confettiContainer = document.getElementById("confetti-container");

    balloonContainer.innerHTML = "";
    confettiContainer.innerHTML = "";

    // 🎈 Шарики
    for (let i = 0; i < 15; i++) {
      const balloon = document.createElement("div");
      balloon.className = "balloon";
      balloon.style.left = `${Math.random() * 100}%`;
      balloon.style.backgroundColor = randomColor();

      const duration = 3 + Math.random() * 2; // 3–5 сек
      const delay = Math.random(); // 0–1 сек
      const xShift = Math.random() * 100 - 50; // от -50 до 50px

      balloon.style.animationDuration = `${duration}s`;
      balloon.style.animationDelay = `${delay}s`;
      balloon.style.setProperty("--x-shift", `${xShift}px`);

      balloonContainer.appendChild(balloon);
    }

    // 🎉 Конфетти
    for (let i = 0; i < 40; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor = randomColor();

      const duration = 2 + Math.random() * 2; // 2–4 сек
      const delay = Math.random(); // 0–1 сек
      const xShift = Math.random() * 80 - 40; // от -40 до 40px

      confetti.style.animationDuration = `${duration}s`;
      confetti.style.animationDelay = `${delay}s`;
      confetti.style.setProperty("--x-shift", `${xShift}px`);

      confettiContainer.appendChild(confetti);
    }

    // ✨ Искры
    for (let i = 0; i < 25; i++) {
      const sparkle = document.createElement("div");
      const colors = ["#ffffff", "#ffccff", "#ccffff", "#ffffcc"];
      sparkle.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      sparkle.className = "sparkle";
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.animationDelay = `${Math.random()}s`;
      confettiContainer.appendChild(sparkle);
    }

    setTimeout(() => {
      balloonContainer.innerHTML = "";
      confettiContainer.innerHTML = "";
    }, 5500); // Чуть больше, чтобы все успели завершиться
  }

  function randomColor() {
    const colors = ["#ff4d4d", "#ffcc00", "#66ccff", "#66ff66", "#cc66ff"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function setBackgroundMusicVolume(vol) {
    const music = document.getElementById("background-music");
    if (music) {
      music.volume = vol;
    }
  }

  // 🚀 Воспроизведение фоновой музыки после первого взаимодействия
  const backgroundMusic = document.getElementById("background-music");

  function tryPlayMusicOnce() {
    if (backgroundMusic && backgroundMusic.paused) {
      backgroundMusic.volume = 1;
      backgroundMusic.play().catch((err) => {
        console.log("Автовоспроизведение заблокировано:", err.message);
      });
    }
    document.removeEventListener("click", tryPlayMusicOnce);
    document.removeEventListener("touchstart", tryPlayMusicOnce);
  }

  document.addEventListener("click", tryPlayMusicOnce);
  document.addEventListener("touchstart", tryPlayMusicOnce);
});
