mise version                          # Показывает версию mise
mise doctor                           # Проверяет систему и конфигурацию mise
mise current hugo                     # Показывает, какая версия Hugo активна в текущей сессии

mise install hugo@0.157.0             # Попытка установить из реестра mise (может не сработать для старых версий)
mise uninstall hugo@0.153.0           # Удаление устаревшей версии

mise use hugo@0.157.0                 # Переключение версии Hugo
mise use --global hugo@0.157.0        # Глобальная активация Hugo  

mise which hugo                       # Показывает полный путь к активному бинарнику Hugo
mise ls --installed                   # Список всех установленных версий инструментов


С использованием AQUA:
В MISE с Backend Aqua инструменты указываются в формате: aqua:владелец/репозиторий aqua:gohugoio/hugo

mise use aqua:gohugoio/hugo@0.157.0              # Переключение на эту версию для текущей сессии
mise use --global aqua:gohugoio/hugo@0.157.0     # Глобальная активация (по умолчанию для всех терминалов)

mise install aqua:gohugoio/hugo@0.157.0          # Установка через Aqua
mise uninstall aqua:gohugoio/hugo@0.157.0        # Удаление через Aqua


