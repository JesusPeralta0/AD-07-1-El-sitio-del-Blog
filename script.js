
"use strict";

// Obtener el botón y el elemento HTML principal
const themeToggle = document.querySelector("#theme-toggle");
const html = document.documentElement;

const themeStorageKey = "explora-digital-theme";

// Leer el tema guardado
function getSavedTheme() {
  try {
    const savedTheme = localStorage.getItem(themeStorageKey);

    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
  } catch (error) {
    // Si el navegador no permite usar localStorage,
    // el sitio seguirá funcionando sin guardar la preferencia.
  }

  return "light";
}

// Actualizar el tema visual
function applyTheme(theme) {
  html.dataset.theme = theme;

  if (themeToggle) {
    const isDark = theme === "dark";

    themeToggle.textContent = isDark
      ? "☀️ Modo claro"
      : "🌙 Modo oscuro";

    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Activar modo claro" : "Activar modo oscuro"
    );

    themeToggle.setAttribute("aria-pressed", String(isDark));
  }
}

// Guardar la preferencia del visitante
function saveTheme(theme) {
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch (error) {
    // El cambio de tema sigue funcionando aunque no se pueda guardar.
  }
}

// Aplicar el tema guardado al cargar cada página
const initialTheme = getSavedTheme();
applyTheme(initialTheme);

// Cambiar el tema cuando se pulse el botón
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = html.dataset.theme;

    const newTheme = currentTheme === "dark"
      ? "light"
      : "dark";

    applyTheme(newTheme);
    saveTheme(newTheme);
  });
}
