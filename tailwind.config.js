// tailwind.config.js
module.exports = {
  content: [
    './layouts/**/*.gohtml', // теперь Tailwind видит все gohtml шаблоны
    './content/**/*.md',     // Markdown файлы с HTML-классами Tailwind
    './assets/**/*.js'       // JS файлы с динамическими классами Tailwind
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}