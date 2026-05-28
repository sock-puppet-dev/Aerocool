Ниже — короткая шпаргалка для workflow проекта: `dev` — тест и ежедневная разработка, `main` — production.

1. Главная логика

origin  = GitHub-репозиторий
dev     = рабочая тестовая ветка / Branch Deploy в Netlify
main    = production-ветка / основной сайт

Схема:

локально dev    → git push origin dev   → Netlify Branch Deploy       → https://dev--hugo-aerocool.netlify.app/
локально main   → git push origin main  → Netlify Production Deploy   → https://aerocool.ua/

По подтверждению поддержки Netlify для этого проекта `dev--hugo-aerocool.netlify.app` 
можно использовать для частых автодеплоев и тестов без расходования production-лимитов основного домена.

2. Проверить, где ты сейчас

git branch

Если видишь:
* dev
  main
значит ты сейчас в dev

3. Проверить состояние файлов:

git status

4. Проверить GitHub-адрес репозитория:

git remote -v

5. Применить изменения из dev в main

Когда проверил сайт на Branch Deploy и всё хорошо, например раз в неделю:

git checkout main
git pull origin main
git merge dev
git push origin main

После этого Netlify сделает Production Deploy.

6. Вернуться обратно в dev

git checkout dev

И продолжать работу там.

7. Полный рабочий цикл

# 1. перейти в dev
git checkout dev

# 2. подтянуть свежую dev-ветку с GitHub
git pull origin dev

# 3. внести изменения в файлы

# 4. проверить изменения
git status

# 5. добавить все изменения
git add .

# 6. сделать commit
git commit -m "Update site"

# 7. отправить dev на GitHub
git push

# 8. проверить Branch Deploy в Netlify
# https://dev--hugo-aerocool.netlify.app/

# 9. если всё хорошо — перейти в main
git checkout main

# 10. обновить main
git pull origin main

# 11. влить dev в main
git merge dev

# 12. отправить main на GitHub
git push origin main

# 13. вернуться в dev
git checkout dev

Самые важные команды
git checkout dev        # перейти в dev
git pull origin dev     # обновить dev с GitHub
git add .               # добавить изменения
git commit -m "..."     # сохранить изменения в commit
git push                # отправить dev на GitHub

git checkout main       # перейти в main
git pull origin main    # обновить main
git merge dev           # перенести изменения из dev в main
git push origin main    # отправить main на GitHub

Главное правило

dev  = работаю, тестирую, проверяю
main = только готовая финальная версия

Отзывы на dev

1. Отзыв отправляется на `https://dev--hugo-aerocool.netlify.app/`.
2. В Netlify Database открыть branch `dev`.
3. Новый отзыв сначала имеет статус `pending`.
4. Для публикации поменять статус на `approved`.
5. После изменения статуса нужен новый deploy `dev`.
6. Только после нового deploy отзыв появится в статическом HTML.
