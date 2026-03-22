Код полностью подходит для нынешней ситуации ✅

Вот почему:
	1.	Chrome / Edge / Opera / Brave → используют View Transitions API, плавные переходы без полоски.
	2.	Safari / Firefox / другие старые браузеры → используют Swup fallback, переходы происходят, полоска (flash) минимизирована через CSS анимацию #swup { opacity:0 → 1 }.
	3.	Instant.page → предзагружает страницы при наведении курсора, ускоряя переходы, не мешая основному скрипту.

То есть, для текущих версий браузеров это оптимальное решение:
	•	Chrome получает нативные плавные переходы
	•	Остальные браузеры — быстрые переходы с минимальной мерцанием
	•	Будущие версии Safari с View Transitions сразу подключат нативный вариант


1️⃣ Скрипт View Transitions

<!-- 0. Instant.page prefetch -->

<script src="https://instant.page/5.1.0" type="module"></script>

<!-- 1. Сначала библиотеки Swup -->

<script src="https://unpkg.com/swup@4"></script>
<script src="https://unpkg.com/@swup/head-plugin@2"></script>
<script src="https://unpkg.com/@swup/scripts-plugin@2"></script>

<!-- 2. Потом основной скрипт View Transitions API + Swup -->

<script>
(function () {

  const supportsViewTransitions =
    typeof document.startViewTransition === "function" &&
    typeof navigation !== "undefined" &&
    typeof navigation.navigate === "function";

  // 1. Только Chrome → View Transitions
  if (supportsViewTransitions) {

    document.addEventListener("click", (e) => {

      if (e.defaultPrevented) return;
      if (e.button !== 0) return;

      const link = e.target.closest("a");
      if (!link || !link.href) return;

      const url = new URL(link.href, location.href);

      if (
        link.target === "_blank" ||
        (link.rel && link.rel.split(" ").includes("external")) ||
        e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
        link.hasAttribute("download") ||
        url.protocol === "mailto:" ||
        url.protocol === "tel:" ||
        url.protocol === "javascript:" ||
        url.origin !== location.origin ||
        (url.pathname === location.pathname && url.hash)
      ) return;

      e.preventDefault();

      document.startViewTransition(() => {
        window.location.assign(url.href);
      });
    });

    return; // ❗ НЕ запускаем Swup
  }

  // 2. ВСЕ остальные (включая Safari) → Swup
  if (typeof Swup !== "undefined") {
    new Swup({
      containers: ['#swup'],
      plugins: [
        new SwupHeadPlugin(),
        new SwupScriptsPlugin()
      ]
    });
  }

})();
</script>

2️⃣ Prefetch страниц

{{ range .Site.Menus.main }}
<link rel="prefetch" href="{{ .URL }}">
{{ end }}

3️⃣ Tailwind-анимации для плавности

@layer components {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    @apply duration-300 ease-in-out;
  }
}