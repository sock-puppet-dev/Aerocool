(function () {
  'use strict';

  var lang = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
  var retryButton = document.getElementById('retry-button');

  if (lang && lang.indexOf('ru') === 0) {
    document.documentElement.lang = 'ru';
    document.getElementById('title').textContent = 'Вы офлайн';
    document.getElementById('message').textContent = 'Похоже, у вас нет подключения к интернету. Проверьте соединение и попробуйте снова.';
    retryButton.textContent = '🔄 Попробовать снова';
  }

  retryButton.addEventListener('click', function () {
    window.location.reload();
  });
})();
