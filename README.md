# Directrix
Directrix jquery plagin

Query плагин для парвильной попиксельной вёрстки сайтов.
Плагин помогает выставить быстрые направляющие прямо в браузере.

<h2><a href="https://kylaksizov.ru/demo/7/index.php" target="_blank">DEMO</a>.</h2>

## Установка

### Быстрое подключение

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script><!-- если не подключена библиотека -->
<script src="directrix-1.0.min.js"></script>
<script>
    $(function(){
        $("body").directrix();
    })
</script>
```

### Настройки плагина

```js
$(function(){
    $("body").directrix({
        colorGrid: "#4AFFFF", // цвет линий
        sizeGrid: "1", // размер линии
        typeGrid: "solid", // тип линии
        opacityRuler: "1", // прозрачность линеек
        displayRuler: false, // false - скрывать линейки, true - показывать
        displayIndent: true, // false - скрывать счётчик отступов, true - показывать
        selectMove: false, // false - не выделяет, true - выделяет
        separationColor: "white", // пустота, black, gray, white
    });
})
```

Можно подключить расширение для браузера <a href="https://chrome.google.com/webstore/detail/directrix/acmpgcfbhodhlckhmlkenpibiaomgbej?hl=ru">Google Chrome</a>.
Минус расширения в том, что после перезагрузки его нужно включать заново.
Кто готов помочь, пишите на мой сайт или создавайте тут ветку.

Если возникли вопросы, пишите комментарии на сайте автора: <a href="http://kylaksizov.ru/85-directrix-jquery-plagin-dlya-verstki-saytov.html" target="_blank">kylaksizov.ru</a>
