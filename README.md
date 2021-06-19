# Hardjs

Core of hardjs framework

# Процесс публикации новых версий

* Вносим изменения в репозиторий в ветке **develop**, выполняем **npm run lint**, меняем версию пакета в **package.json** и делаем коммит
* Создаем новую ветку с версией x.x.x из ветки develop
* Создаем новый тег **git tag -a v0.1.0 -m "version 0.1.0"**
* Отправляем новую ветку на github **git push origin x.x.x**
* Отправляем новый тег на github **git push origin v0.1.0**
* Создаем новый релиз на github
* Сливаем ветку develop в master
* Публикуем новую версию на npmjs.com командой **npm run publish** предварительно должен быть выполнен логин **npm login**
