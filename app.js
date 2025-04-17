function startBanner() {
  const text = encodeURIComponent(document.getElementById("text").value);
  const bg = encodeURIComponent(document.getElementById("bg").value);
  const color = encodeURIComponent(document.getElementById("color").value);
  window.location.href = \`led-play.html?text=\${text}&bg=\${bg}&color=\${color}\`;
}

window.onload = function () {
  const textEl = document.getElementById("scrollText");
  if (textEl) {
    const params = new URLSearchParams(window.location.search);
    const text = decodeURIComponent(params.get("text") || "Welcome!");
    const bg = params.get("bg") || "black";
    const color = params.get("color") || "lime";
    document.body.style.backgroundColor = bg;
    textEl.style.color = color;
    textEl.textContent = text;

    document.body.addEventListener("click", () => {
      if (document.fullscreenEnabled) {
        document.documentElement.requestFullscreen().catch(console.warn);
      }
    });
  }
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(console.error);
}
