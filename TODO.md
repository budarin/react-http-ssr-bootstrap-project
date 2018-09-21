-   использовать EntrypointsPlugin для определения того какие скрипты помещать в заголовок страницы
-   генерация отдельного source.map
-   почему dev сборка загружает .env.production.json в dist?
-   как в dev мониторить изменения devserver файлов dist (assets-manifest, entrypoint) и пересобирать сервер?
    => в дев не использовать inlining манифестов а грузить их каждый раз когда нужно
-   как удалить (assets-manifest, entrypoint) после сборки сервера в проде?
