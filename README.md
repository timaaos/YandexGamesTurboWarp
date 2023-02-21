# YandexGamesTurboWarp
Расширение Yandex Games SDK для Турбоварпа. Не работает в режиме песочницы.
## Как установить
1. Клонируем репозиторий
```sh
git clone https://github.com/timaaos/YandexGamesTurboWarp.git
cd YandexGamesTurboWarp
```
2. Запускаем http сервер на порте 8000 (я использую питоновый http.server)
```sh
python -m http.server
```
**ВНИМАНИЕ! Чтобы Турбоварп работал с плагином, http сервер должен быть всегда запущен во время разработки/упаковывания**  
3. Заходим в Турбоварп через браузер
```
https://turbowarp.org/editor?extension=http://localhost:8000/plugin.js
```
Готово! Можно импортировать проект из обычного скретча или создать новый.
