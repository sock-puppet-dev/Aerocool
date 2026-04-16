// tailwind.config.js

module.exports = {
  content: [
    './layouts/**/*.{html,gohtml}', // теперь Tailwind видит все html,gohtml шаблоны
    './content/**/*.md',            // Markdown файлы с HTML-классами Tailwind
    './assets/**/*.js',             // JS файлы с динамическими классами Tailwind
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}