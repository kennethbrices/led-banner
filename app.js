
function startBanner() {
  const text = encodeURIComponent(document.getElementById("text").value);
  const bg = encodeURIComponent(document.getElementById("bg").value);
  const color = encodeURIComponent(document.getElementById("color").value);
  const speed = encodeURIComponent(document.getElementById("speed").value);
  const font = encodeURIComponent(document.getElementById("font").value);
  window.location.href = "led-play.html?text=" + text + "&bg=" + bg + "&color=" + color + "&speed=" + speed + "&font=" + font;
}

function updatePreview() {
  const text = document.getElementById("text").value || "Preview Text";
  const bg = document.getElementById("bg").value;
  const color = document.getElementById("color").value;
  const font = document.getElementById("font").value;
  const speed = document.getElementById("speed").value;

  const el1 = document.getElementById("previewText1");
  const el2 = document.getElementById("previewText2");
  const wrapper = document.querySelector(".preview-banner .scroll-wrapper");

  if (el1 && el2 && wrapper) {
    el1.textContent = el2.textContent = text;
    el1.style.color = el2.style.color = color;
    el1.style.fontFamily = el2.style.fontFamily = font;
    wrapper.style.animationDuration = speed;
    document.querySelector(".preview-banner").style.backgroundColor = bg;
  }
}

function initBannerPage() {
  const params = new URLSearchParams(window.location.search);
  const text = decodeURIComponent(params.get("text") || "🎉 WELCOME! 🎉");
  const bg = params.get("bg") || "#000000";
  const color = params.get("color") || "#ffffff";
  const speed = params.get("speed") || "10s";
  const font = decodeURIComponent(params.get("font") || "monospace");

  const el1 = document.getElementById("scrollText1");
  const el2 = document.getElementById("scrollText2");

  if (el1 && el2) {
    el1.textContent = el2.textContent = text;
    el1.style.color = el2.style.color = color;
    el1.style.fontFamily = el2.style.fontFamily = font;
    document.documentElement.style.setProperty("--scroll-speed", speed);
    document.querySelector(".banner-view").style.backgroundColor = bg;
  }
}

window.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("previewText1")) {
    ["text", "bg", "color", "font", "speed"].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", updatePreview);
        el.addEventListener("change", updatePreview);
      }
    });
    updatePreview();
  } else {
    initBannerPage();
  }
});
