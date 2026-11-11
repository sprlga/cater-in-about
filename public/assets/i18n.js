(function () {
  var root = document.documentElement;
  var SUPPORTED = ["id", "en"];

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage dapat diblokir */ }
  }

  function initialLang() {
    var fromUrl = new URLSearchParams(location.search).get("lang");
    if (SUPPORTED.indexOf(fromUrl) !== -1) { safeSet("lang", fromUrl); return fromUrl; }
    var saved = safeGet("lang");
    if (SUPPORTED.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || "id").slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(nav) !== -1 ? nav : "id";
  }

  function apply(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    var title = root.getAttribute("data-title-" + lang);
    if (title) document.title = title;
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-set-lang") === lang));
    });
  }

  apply(initialLang());
  // Skrip dimuat di <head>, jadi tombol belum ada saat apply() pertama; sinkronkan lagi setelah DOM siap.
  document.addEventListener("DOMContentLoaded", function () {
    apply(root.getAttribute("data-lang"));
  });

  document.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-set-lang]");
    if (!btn) return;
    var lang = btn.getAttribute("data-set-lang");
    if (SUPPORTED.indexOf(lang) === -1) return;
    safeSet("lang", lang);
    apply(lang);
  });
})();
