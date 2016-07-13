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
        // buttons.forEach(function(b) {
        //     if (!b.classList.contains('door-riddle__button_pressed')) {
        //         isOpened = false;
        //     }
        // });

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
    var xc = 160;
    var yc = 280;
    var radius = 110;

    var button = this.popup.querySelector('.myButton');
    var pressed = false;

    button.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
    button.addEventListener('pointerup', _onButtonPointerUp.bind(this));
    button.addEventListener('pointermove', _onButtonPointerMove.bind(this));
    button.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
    button.addEventListener('pointerout', _onButtonPointerUp.bind(this));
    button.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    button.addEventListener('pointerenter', _onButtonPointerDown.bind(this));

    var timer = window.setInterval(moveBack, 10);

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
            window.clearTimeout(timer);
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
    var gridOpened = false;

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

    var start = 0;
    var end = 0;
    var startXZoom = [];
    var startYZoom = [];
    var endXZoom = [];
    var endYZoom = [];
    function _onButtonPointerDown(e) {
        if (!gridOpened)
            start = end = e.clientX;
        else {
            console.log("start", e.pointerId);
            startXZoom[e.pointerId] = endXZoom[e.pointerId] = e.clientX;
            startYZoom[e.pointerId] = endYZoom[e.pointerId] = e.clientY;
        }
    }

    function _onButtonPointerUp(e) {
        if (!gridOpened) {
            end = e.clientX;
            if (end - start > 50)
                updateGrid();
        }
        else {
            console.log("end", e.pointerId);
            endXZoom[e.pointerId] = e.clientX;
            endYZoom[e.pointerId] = e.clientY;
            updateZoom();
        }
    }

    function _onButtonPointerMove(e) {
        if (!gridOpened) {
            end = e.clientX;
            if (end - start > 50)
                updateGrid();
        }
        else {
            console.log("move", e.pointerId);
            endXZoom[e.pointerId] = e.clientX;
            endYZoom[e.pointerId] = e.clientY;
            updateZoom();
        }
    }

    function updateGrid() {
        window.requestAnimationFrame(setPosition);
    }

    var zoom = 1;
    function updateZoom() {
        console.log(startXZoom);
        if (startXZoom.length == 2) {
            var l1 = Math.sqrt((startXZoom[0] - startXZoom[1])*(startXZoom[0] -
                startYZoom[1]) + (startYZoom[0] - startYZoom[1])*(startYZoom[0] - startYZoom[1]));
            var l2 = Math.sqrt((endXZoom[0] - endXZoom[1])*(endXZoom[0] -
                endYZoom[1]) + (endYZoom[0] - endYZoom[1])*(endYZoom[0] - endYZoom[1]));
            zoom = l2/l1;
            window.requestAnimationFrame(setZoom);
        }
    }

    function setPosition() {
        $(grid).css('left', '100%');
        gridOpened = true;
    }

    function setZoom() {
        $(box).css('background-size', zoom * 100 + '%');
    }
    // ==== END Напишите свой код для открытия сундука здесь ====

    this.showCongratulations = function() {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
