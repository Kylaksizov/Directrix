/*
 * jQuery Directrix v 1.0
 *
 * Copyright 2015, Kylaksizov Vladymyr | http://kylaksizov.ru
 * Free to use
 *
 The MIT License (MIT)

Copyright (c) 2016 Kylaksizov Vladymyr <masterz1zzz@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 */
 
(function($){
    $.fn.disableSelection = function() {
        return this
        .attr('unselectable', 'on')
        .css('user-select', 'none')
        .on('selectstart', false);
    };
})(jQuery);

(function($){
    
    jQuery.fn.directrix = function(options){
        options = $.extend({
            
            colorGrid: "#4AFFFF", // цвет линий
            sizeGrid: "1", // размер линии
            typeGrid: "solid", // тип линии
            opacityRuler: "1", // прозрачность линеек
            displayRuler: false, // false - скрывать линейки, true - показывать
            displayIndent: true, // false - скрывать счётчик отступов, true - показывать
            selectMove: false, // false - не выделяет, true - выделяет
            separationHorizontalImg: "http://kylaksizov.ru/files_for_people/line_horizontal_",
            separationVerticalImg: "http://kylaksizov.ru/files_for_people/line_vertical_",
            separationColor: "", // пустота, black, gray, white
            
        }, options);
    
/*

var array = {'Name': 'Michael', 'Age': '22', 'Country': 'Russia'}; // Создаём ассоциативный массив
  array["add"] = 15; // Добавим ещё элемент
  // Перебор ассоциативного массива и вывод ключей и их значений
  for (var i in array)
    alert("Ключ = " + i + "; Значение = " + array[i]);
    
*/
        
        if(options.displayRuler == false)
            var dn_ = "display:none;";
        else
            var dn_ = "";
            
        if(options.displayIndent == false)
            $("body").append('<style>#grids > div > span{ display: none; }</style>');
        
        /* === функция сохранения линий и настроек === */
        function Repository(option, name, param){
            try {
                if(option == "save"){ // сохранение данных в память
                    localStorage.setItem(name, param);
                }
                if(option == "give"){ // отдача данных из памяти
                    return localStorage.getItem(name);
                }
                if(option == "clear"){ // очистка всех данных из памяти
                    localStorage.clear();
                }
                if(option == "delete"){ // очистка определённой переменной
                    localStorage(name);
                }
            } catch (e) {
                if (e == QUOTA_EXCEEDED_ERR) {
                    alert('Превышен лимит внутренней памяти плагина Directrix, удалите несколько направляющих!');
                }
            }
        }
        
        
        $("html, body").mousemove(function(e){
            $cord_x = e.pageX;
            $cord_y = e.pageY;
        })
        
        /* === функция перетаскивания линий === */
        function MoveGrid(element, position, switcher, pos_static){
            if(switcher == "move"){ // перетаскивание линий
                $(document).mousemove(function(e){
                    if(position == "X"){
                        $(element).css("left", $cord_x + "px"); // задаём позицию активной линии
                        $(element).html('<span style="background:rgba(0,0,0,0.3); color:#fff; padding:1px 3px; position:absolute; left:50%; bottom:1%; font-size:10px;">' + $cord_x + '</span>');
                        if(options.displayRuler == false)
                            $(".ew_grids").stop(true, true).fadeIn(100); // показываем линейку
                    } else if(position == "Y"){
                        $(element).css("top", $cord_y + "px"); // задаём позицию активной линии
                        $(element).html('<span style="background:rgba(0,0,0,0.3); color:#fff; padding:1px 3px; position:absolute; right:1%; bottom:50%; font-size:10px;">' + $cord_y + '</span>');
                        if(options.displayRuler == false)
                            $(".ns_grids").stop(true, true).fadeIn(100); // показываем линейку
                    }
                });
            }
            if(switcher == "stop"){ // остановка перетаскивания линий
                $(document).unbind("mousemove"); // снимаем событие
                var saved_lines = $("#grids").html(); // берём весь html наших линий
                Repository("save", "lines", saved_lines); // сохраняем html в истроию
                if(options.displayRuler == false)
                    $(".ew_grids, .ns_grids").stop(true, true).fadeOut(100); // прячем линейки
            }
            if(switcher == "moveGrid"){ // смещение линеек
                $(document).mousemove(function(e){
                    if(position == "X"){
                        razn = $cord_x - pos_static;
                        $(element).css("left", razn + "px"); // задаём позицию активной линии
                        if(options.displayRuler == false)
                            $(".ew_grids").stop(true, true).fadeIn(10); // показываем линейки
                    } else if(position == "Y"){
                        razn = $cord_y - pos_static;
                        $(element).css("top", razn + "px"); // задаём позицию активной линии
                        if(options.displayRuler == false)
                            $(".ns_grids").stop(true, true).fadeIn(10); // показываем линейки
                    }
                });
            }
            if(switcher == "stopGrid" || switcher == "stop_block"){ // остановка перетаскивания линий
                $(document).unbind("mousemove"); // снимаем событие
            }
            if(switcher == "move_block"){ // перетаскивание блока
                $(document).mousemove(function(e){
                    if(position == "XY"){
                        $(element).css({ // задаём позицию блока
                            "top": $cord_y - 5 + "px",
                            "left": $cord_x - 5 + "px"
                        });
                    }
                });
            }
            if(options.selectMove == false)
                $("html, body").disableSelection();
            return false;
        }
        
        /* === функция создания блока === */
        document.onkeydown = function(e){
            e = e || window.event;
            if(e.ctrlKey && e.keyCode == 81){ // Q
                Repository("clear");
                location.reload();
                return false;
            }
            if(e.ctrlKey && e.keyCode == 88){ // X - создание блока
                sizeBlock = prompt("Размер:");
                if(sizeBlock.indexOf('*') + 1){
                    resultPrompt = sizeBlock.split('*');
                    width_box = resultPrompt[0];
                    height_box = resultPrompt[1];
                } else{
                    width_box = sizeBlock-2;
                    height_box = sizeBlock-2;
                }
                $("#grids").append('<div class="block_directrix" style="width:'+width_box+'px; height:'+height_box+'px; border: 1px ' + options.colorGrid + ' solid; position:absolute; top:'+$cord_y+'px; left:'+$cord_x+'px; z-index:9999; cursor: default;"></div>');
                saved_lines = $("#grids").html(); // берём весь html наших линий
                Repository("save", "lines", saved_lines); // сохраняем html в истроию
                return false;
            }
        }
        
        // добавляем горизонтальную линейку
        if(Repository("give", "grid_X") == null)
            pos_gridX = "0px";
        else
            pos_gridX = Repository("give", "grid_X");
        $("body").append('<div class="ew_separation" style="width:1000%; height:20px; position:fixed; top:0; left:0; z-index:99999;"><div class="ew_grids" style="background:url('+options.separationHorizontalImg+options.separationColor+'.png) no-repeat; opacity:' + options.opacityRuler + '; width:100%; left:' + pos_gridX + '; position:absolute; height:17px; ' + dn_ + '"></div></div>');
        
        // показываем горизонтальную линейку при наведении
        $(".ew_separation").hover(function(){
            if(options.displayRuler == false)
                $(this).children(".ew_grids").stop(true, true).fadeToggle(100);
        })
        
        // добавляем вертикальную линейку
        if(Repository("give", "grid_Y") == null)
            pos_gridY = "-3001px";
        else
            pos_gridY = Repository("give", "grid_Y");
        $("body").append('<div class="ns_separation" style="width:20px; height:1000%; position:fixed; top:0; left:0; z-index:99999;"><div class="ns_grids" style="background:url('+options.separationVerticalImg+options.separationColor+'.png) no-repeat; opacity:' + options.opacityRuler + '; position:absolute; top:' + pos_gridY + '; width:17px; height:100%; ' + dn_ + '"></div></div>');
        
        // показываем вертикальную линейку при наведении
        $(".ns_separation").hover(function(){
            if(options.displayRuler == false)
                $(this).children(".ns_grids").stop(true, true).fadeToggle(100);
        })
        
        // добавляем блок с будущими линиями в конец документа
        if(Repository("give", "lines") == null)
            var lines = "";
        else
            lines = Repository("give", "lines");
        $("body").append('<div id="grids">' + lines + '</div>');
        
        // создание горизонтальной линии
        $(".ew_separation").dblclick(function(e){
            Y = $cord_y + 30;
            $("#grids").append('<div class="ns-grid" style="border-bottom:' + options.sizeGrid + 'px ' + options.colorGrid + ' ' + options.typeGrid + '; width:100%; height:3px; position:absolute; top:' + Y + 'px; left:0; z-index:99999; cursor:ns-resize;"></div>');
            saved_lines = $("#grids").html(); // берём весь html наших линий
            Repository("save", "lines", saved_lines); // сохраняем html в истроию
            NoSelect();
            return false;
        });
        
        // создание вертикальной линии
        $(".ns_separation").dblclick(function(e){
            X = $cord_x + 30;
            $("#grids").append('<div class="ew-grid" style="border-left:' + options.sizeGrid + 'px ' + options.colorGrid + ' ' + options.typeGrid + '; width:3px; height:100%; position:fixed; top:0; left:' + X + 'px; z-index:99999; cursor:ew-resize;"></div>');
            saved_lines = $("#grids").html(); // берём весь html наших линий
            Repository("save", "lines", saved_lines); // сохраняем html в истроию
            NoSelect();
            return false;
        });
        
        
        
        $("body").on("mousedown", ".ew_grids", function(e){ // положение линейки
            var X2 = $cord_x;
            position_now = $(this).css("left");
            res = position_now.substr(0, position_now.length - 2);
            var pos_static = X2-res;
            MoveGrid(this, "X", "moveGrid", pos_static);
        })
        $("body").on("mouseup", ".ew_grids", function(){ // при отпуcкании мыши
            MoveGrid(this, "X", "stopGrid");
            var saved_gridsX = $(".ew_grids").css("left"); // берём весь html наших линий
            Repository("save", "grid_X", saved_gridsX); // сохраняем html в истроию
        })
        
        $("body").on("mousedown", ".ns_grids", function(e){ // положение линейки
            var Y2 = $cord_y;
            position_now = $(this).css("top");
            res = position_now.substr(0, position_now.length - 2);
            var pos_static = Y2-res;
            MoveGrid(this, "Y", "moveGrid", pos_static);
        })
        $("body").on("mouseup", ".ns_grids", function(){ // при отпуcкании мыши
            MoveGrid(this, "Y", "stopGrid");
            var saved_gridsY = $(".ns_grids").css("top"); // берём весь html наших линий
            Repository("save", "grid_Y", saved_gridsY); // сохраняем html в истроию
        })
        
        
        
        /* === Перетаскивание линий === */
        $("#grids").on("mousedown", ".ew-grid", function(){ // при нажатии мыши
            MoveGrid(this, "X", "move");
        })
        $("#grids").on("mouseup", ".ew-grid", function(){ // при отпуcкании мыши
            MoveGrid(this, "X", "stop");
        })
        
        $("#grids").on("mousedown", ".ns-grid", function(){ // при нажатии мыши
            MoveGrid(this, "Y", "move");
        })
        $("#grids").on("mouseup", ".ns-grid", function(){ // при отпуcкании мыши
            MoveGrid(this, "Y", "stop");
        })
        
        
        /* === Перетаскивание блоков === */
        $("#grids").on("mousedown", ".block_directrix", function(){ // при нажатии мыши
            MoveGrid(this, "XY", "move_block");
        })
        $("#grids").on("mouseup", ".block_directrix", function(){ // при отпуcкании мыши
            MoveGrid(this, "XY", "stop_block");
            saved_lines = $("#grids").html(); // берём весь html наших линий
            Repository("save", "lines", saved_lines); // сохраняем html в истроию
        })
        
        // удаление блоков
        $("#grids").on("dblclick", "div", function(){
            $(this).remove();
            MoveGrid(this, "delete", "stop");
        })
        
    };

})(jQuery);