
function startBanner() {
  const text = encodeURIComponent(document.getElementById("text").value);
  const bg = encodeURIComponent(document.getElementById("bg").value);
  const color = encodeURIComponent(document.getElementById("color").value);
  const speed = encodeURIComponent(document.getElementById("speed").value);
  const font = encodeURIComponent(document.getElementById("font").value);
  window.location.href = "led-play.html?text=" + text + "&bg=" + bg + "&color=" + color + "&speed=" + speed + "&font=" + font;
}

function updatePreview() {
  const preview = document.getElementById("previewText");
  if (preview) {
    const text = document.getElementById("text").value || "Preview Text";
    const bg = document.getElementById("bg").value;
    const color = document.getElementById("color").value;
    const font = document.getElementById("font").value;
    const speed = document.getElementById("speed").value;

    preview.textContent = text;
    preview.style.color = color;
    preview.style.fontFamily = font;
    preview.style.animationDuration = speed;
    document.querySelector(".preview-banner").style.backgroundColor = bg;
  }
}

function initBannerPage() {
  const textEl = document.getElementById("scrollText");
  if (textEl) {
    const params = new URLSearchParams(window.location.search);
    const text = decodeURIComponent(params.get("text") || "Welcome!");
    const bg = params.get("bg") || "#000000";
    const color = params.get("color") || "#ffffff";
    const speed = params.get("speed") || "10s";
    const font = decodeURIComponent(params.get("font") || "monospace");

    textEl.textContent = text;
    textEl.style.color = color;
    textEl.style.fontFamily = font;
    textEl.style.animation = `scroll ${speed} linear infinite`;
    document.querySelector(".banner-view").style.backgroundColor = bg;
  }
}

window.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("previewText")) {
    ["text", "bg", "color", "font", "speed"].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", updatePreview);
        el.addEventListener("change", updatePreview);
      }
    });
    updatePreview();
  }

  initBannerPage();
});

// Fullscreen on tap
if (window.location.pathname.includes("led-play.html")) {
  document.body.addEventListener("click", () => {
    if (document.fullscreenEnabled && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.warn);
    }
  });
}

// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(console.error);
}
