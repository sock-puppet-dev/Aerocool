// tailwind.config.js

module.exports = {
  content: [
    './layouts/**/*.gohtml', // теперь Tailwind видит все gohtml шаблоны
    './content/**/*.md',     // Markdown файлы с HTML-классами Tailwind
    './assets/**/*.js'       // JS файлы с динамическими классами Tailwind
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#FACC15'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ],
}