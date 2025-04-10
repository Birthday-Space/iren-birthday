"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");

  document.querySelectorAll(".greeting-item").forEach((item) => {
    item.addEventListener("click", () => {
      const type = item.dataset.type;
      const src = item.dataset.src;
      modalBody.innerHTML = "";

      if (type === "video") {
        modalBody.innerHTML = `
          <video controls autoplay>
            <source src="${src}" type="video/mp4">
            Ваш браузер не поддерживает видео.
          </video>
        `;
      } else if (type === "youtube") {
        const videoId = getYouTubeId(src);
        modalBody.innerHTML = `
          <div class="video-wrapper">
            <iframe width="100%" height="400" 
              src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
              frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
            </iframe>
          </div>
        `;
      } else {
        modalBody.innerHTML = `<p>${src}</p>`;
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

  // Получение ID из YouTube-ссылки
  function getYouTubeId(url) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com.*v=)([^&\n?#]+)/);
    return match ? match[1] : "";
  }
});
