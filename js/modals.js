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
    modal.classList.remove("active");
    modalBody.innerHTML = "";
  }
});
