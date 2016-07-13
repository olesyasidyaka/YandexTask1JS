// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door0(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var buttons = [
        this.popup.querySelector('.door-riddle__button_0'),
        this.popup.querySelector('.door-riddle__button_1'),
        this.popup.querySelector('.door-riddle__button_2')
    ];

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        checkCondition.apply(this);
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        var isOpened = true;
        buttons.forEach(function(b) {
            if (!b.classList.contains('door-riddle__button_pressed')) {
                isOpened = false;
            }
        });

        // Если все три кнопки зажаты одновременно, то откроем эту дверь
        if (isOpened) {
            this.unlock();
        }
    }
}

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия второй двери здесь ====
    var left, top;
    var alpha = Math.PI;
    var radius = 110;
    var door = this.popup.querySelector('.door_1');
    var xc = radius + parseInt($(door).css('left'));//160;
    var yc = radius + parseInt($(door).css('top'));//280;

    var button = this.popup.querySelector('.myButton');
    var pressed = false;

    button.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
    button.addEventListener('pointerup', _onButtonPointerUp.bind(this));
    button.addEventListener('pointermove', _onButtonPointerMove.bind(this));
    button.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
    button.addEventListener('pointerout', _onButtonPointerUp.bind(this));
    button.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    button.addEventListener('pointerenter', _onButtonPointerDown.bind(this));

    var timer = window.setInterval(moveBack.bind(this), 10);

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
        pressed = false;
    }

    function _onButtonPointerMove(e) {
        pressed = true;
        left = e.clientX - 32;
        top = e.clientY - 32;
        checkCondition.apply(this);
        update();
    }

    function update() {
        alpha += 5 * Math.PI / 180;
        window.requestAnimationFrame(setPosition);
    }

    function moveBack() {
        if (!pressed && alpha != Math.PI) {
            alpha -= 1 * Math.PI / 180;
            if (alpha < Math.PI)
                alpha = Math.PI;
            window.requestAnimationFrame(setPosition);
        }
    }

    function setPosition() {
        left = xc + radius * Math.cos(alpha) - 32;
        top = yc + radius * Math.sin(alpha) - 32;
        $(button).css('left', left + 'px');
        $(button).css('top', top + 'px');
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        if (alpha > 3*Math.PI) {
            window.clearInterval(timer);
            this.unlock();
        }
    }
    // ==== END Напишите свой код для открытия второй двери здесь ====
}
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия третей двери здесь ====
    var buttons = [
        this.popup.querySelector('.myButton_0'),
        this.popup.querySelector('.myButton_1'),
        this.popup.querySelector('.myButton_2')
    ];
    var centerX = 163;
    var centerY = 283;
    var radius = 110;

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointermove', _onButtonPointerMove.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerenter', _onButtonPointerDown.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        e.target.pressed = true;
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
        e.target.pressed = false;
    }

    function _onButtonPointerMove(e) {
        e.target.pressed = true;
        e.target.left = e.clientX - 32;
        e.target.top = e.clientY - 32;
        checkCondition.apply(this);
        update();
    }

    function update() {
        window.requestAnimationFrame(setPosition);
    }

    function setPosition() {
        var allPressed = true;
        for (var i = 0; i < 3; i++) {
            if (!buttons[i].classList.contains('door-riddle__button_pressed'))
                allPressed = false;
        }
        if (allPressed)
            buttons.forEach(function(b) {
                $(b).css('left', b.left + 'px');
                $(b).css('top', b.top + 'px');
            });
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        var allInside = true;
        for (var i = 0; i < 3; i++) {
            var xc = buttons[i].left + 32;
            var yc = buttons[i].top + 32;
            var dist = Math.sqrt((xc-centerX)*(xc-centerX) + (yc-centerY)*(yc-centerY));
            if (dist > radius - 32 || isNaN(dist))
                allInside = false;
        }
        if (allInside) {
            this.unlock();
        }
    }
    // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Box(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия сундука здесь ====
    var grid = this.popup.querySelector('.door-riddle__grid');
    var box = this.popup.querySelector('.door-riddle__box');
    var boxUp = this.popup.querySelector('.door-riddle__box-up');
    var boxDown = this.popup.querySelector('.door-riddle__box-down');

    grid.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
    grid.addEventListener('pointerup', _onButtonPointerUp.bind(this));
    grid.addEventListener('pointermove', _onButtonPointerMove.bind(this));
    grid.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
    grid.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    grid.addEventListener('pointerenter', _onButtonPointerDown.bind(this));

    box.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
    box.addEventListener('pointerup', _onButtonPointerUp.bind(this));
    box.addEventListener('pointermove', _onButtonPointerMove.bind(this));
    box.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
    box.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    box.addEventListener('pointerenter', _onButtonPointerDown.bind(this));

    var gridOpened = false;
    var zoomed = false;

    // grid drag coordinates
    var start = 0;
    var end = 0;

    // multitouch for zoom
    var startXZoom = {};
    var startYZoom = {};
    var endXZoom = {};
    var endYZoom = {};
    var touchIds = {};

    // delay for doubletap
    var lastTouch = 0;
    var prevTouch = 0;

    function _onButtonPointerDown(e) {
        if (!gridOpened)
            start = end = e.clientX;
        else if (!zoomed) {
            touchIds[e.pointerId] = true;
            startXZoom[e.pointerId] = endXZoom[e.pointerId] = e.clientX;
            startYZoom[e.pointerId] = endYZoom[e.pointerId] = e.clientY;
        }
        else {
            prevTouch = lastTouch;
            lastTouch = (new Date).getTime();

            console.log(prevTouch, lastTouch);
            if (lastTouch - prevTouch > 100 && lastTouch - prevTouch < 300)
                tapped.apply(this);
        }
    }

    function _onButtonPointerUp(e) {
        if (!gridOpened) {
            end = e.clientX;
            if (end - start > 50)
                updateGrid();
        }
        else if (!zoomed) {
            delete touchIds[e.pointerId];
            delete startXZoom[e.pointerId];
            delete endXZoom[e.pointerId];
            delete startYZoom[e.pointerId];
            delete endYZoom[e.pointerId];
        }
    }

    function _onButtonPointerMove(e) {
        if (!gridOpened) {
            end = e.clientX;
            if (end - start > 50)
                updateGrid();
        }
        else if (!zoomed) {
            endXZoom[e.pointerId] = e.clientX;
            endYZoom[e.pointerId] = e.clientY;
            updateZoom();
        }
    }

    function updateGrid() {
        window.requestAnimationFrame(setPosition);
    }

    var oldZoom = 20;
    function updateZoom() {
        if (Object.keys(startXZoom).length == 2) {
            var id1 = Object.keys(touchIds)[0];
            var id2 = Object.keys(touchIds)[1];
            var l1 = Math.sqrt((startXZoom[id1] - startXZoom[id2])*(startXZoom[id1] -
                startYZoom[id2]) + (startYZoom[id1] - startYZoom[id2])*(startYZoom[id1] - startYZoom[id2]));
            var l2 = Math.sqrt((endXZoom[id1] - endXZoom[id2])*(endXZoom[id1] -
                endYZoom[id2]) + (endYZoom[id1] - endYZoom[id2])*(endYZoom[id1] - endYZoom[id2]));

            var zoom = l2/l1;

            if (zoom > 1)
                zoom = 1 + (zoom - 1)/10; // not too fast
            else
                zoom = 1 - (1 - zoom)/10;

            //console.log("old ", oldZoom, " new ", zoom, " result ", oldZoom * zoom + '%');

            zoom *= oldZoom;
            zoom = Math.max(zoom, 10);  // not too small
            zoom = Math.min(zoom, 100); // not too big

            window.requestAnimationFrame(setZoom.bind(this, zoom));

            oldZoom = zoom;
            if (zoom == 100)
                zoomed = true;
        }
    }

    function tapped() {
        showBoxOpen.apply(this);
        window.setTimeout(this.unlock.bind(this), 500);
    }

    function setPosition() {
        $(grid).css('left', '100%');
        gridOpened = true;
    }

    function setZoom(z) {
        $(boxUp).css('background-size', z + '%');
        $(boxDown).css('background-size', z + '%');
    }
    
    function showBoxOpen() {
        $(boxUp).css('top', '-20px');
    }
    // ==== END Напишите свой код для открытия сундука здесь ====

    this.showCongratulations = function() {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
