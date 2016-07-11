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

    console.log(this.popup);
    var buttons = [
        this.popup.querySelector('.myButton')
    ];

    buttons.forEach(function(b) {
        console.log(b);
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointermove', _onButtonPointerMove.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');

        //checkCondition.apply(this);
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
    }

    var left, top;
    left = 18;
    top = 248;
    var x, y;
    function _onButtonPointerMove(e) {
        x = e.clientX - 32;
        y = e.clientY - 32;
        update();
        //window.requestAnimationFrame(update);
    }

    var alpha = Math.PI;
    var xc = 160;
    var yc = 280;
    var radius = 110;
    function update() {
        // var dx = x - left;
        // var dy = y - top;
        // var dr = Math.sqrt(dx*dx + dy*dy);
        // if (dr < 5)
        //     dr = 0;
        // var sig = 1;
        // if ((alpha > 0 && alpha < Math.PI/2 && dx > 0 && dy < 0) ||
        //     (alpha > Math.PI/2 && alpha < Math.PI && dx > 0 && dy > 0) ||
        //     (alpha > Math.PI && alpha < 3*Math.PI/2 && dx < 0 && dy > 0) ||
        //     (alpha > 3*Math.PI && alpha < 2*Math.PI && dx < 0 && dy < 0))
        //     sig = -1;
        //
        // console.log(sig);
        // var gamma = dr/radius * sig;
        // alpha += gamma;
        left = xc + radius * Math.cos(alpha) - 32;
        top = yc + radius * Math.sin(alpha) - 32;
        $(buttons[0]).css('left', left + 'px');
        $(buttons[0]).css('top', top + 'px');
        x = left;
        y = top;
        alpha += 3 * Math.PI / 180 % (2 * Math.PI);
        //window.requestAnimationFrame(update);
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

  

    // // ==== Напишите свой код для открытия второй двери здесь ====
    // // Для примера дверь откроется просто по клику на неё
    // this.popup.addEventListener('click', function() {
    //     window.requestAnimationFrame(update);

    //     //this.unlock();
    // }.bind(this));

    // function update() {
    //     buttons[0].left += '5px';

    //     window.requestAnimationFrame(update);
    // } 
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
    // Для примера дверь откроется просто по клику на неё
    this.popup.addEventListener('click', function() {
        this.unlock();
    }.bind(this));
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
    // Для примера сундук откроется просто по клику на него
    this.popup.addEventListener('click', function() {
        this.unlock();
    }.bind(this));
    // ==== END Напишите свой код для открытия сундука здесь ====

    this.showCongratulations = function() {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
