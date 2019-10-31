if (location.hostname === 'freebitco.in') {
    /*
     * Автокликер раз в час и автоматичесий игрок в dice с тонкимим настройками
     * */
    $(window).ready(function () {
        if (!localStorage['ez-act']) {
            localStorage['ez-act'] = 0;
        }
        let ER = {};
        ER.dom = '#free_play_form_button';
        ER.time = Math.floor(Math.random() * 5001 + 5000);
        ER.style = '.easy-roll {position: fixed;position: fixed;left: 0;bottom: 0;background: #fcfcfc;padding: 20px;box-shadow: 0 0 12px -5px #333;border-radius: 0 12px 0 0;}.easy-roll h2 {font-size: 24px;line-height: 32px;padding: 5px;position: relative;top: -15px;text-align: center;box-shadow: 0 4px 3px -4px #000;margin-bottom: 25px;}*,*:after,*:before {-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;padding: 0;margin: 0;}.easy-roll .sh {margin: 10px;position: relative;}.easy-roll .sh label {width: 100%;height: 100%;position: relative;display: block;}.easy-roll .sh input {top: 0;right: 0;bottom: 0;left: 0;opacity: 0;z-index: 100;position: absolute;width: 100%;height: 100%;cursor: pointer;}.easy-roll .sh {width: 180px;height: 50px;position: relative;}.easy-roll .sh label {display: block;width: 100%;height: 100%;position: relative;background: #a5a39d;border-radius: 40px;box-shadow:inset 0 3px 8px 1px rgba(0,0,0,0.2),0 1px 0 rgba(255,255,255,0.5);}.easy-roll .sh label:after {content: "";position: absolute;z-index: -1;top: -8px; right: -8px; bottom: -8px; left: -8px;border-radius: inherit;background: #ccc;background: linear-gradient(#f2f2f2, #ababab);box-shadow: 0 0 10px rgba(0,0,0,0.3),0 1px 1px rgba(0,0,0,0.25);}.easy-roll .sh label:before {content: "";position: absolute;z-index: -1;top: -18px; right: -18px; bottom: -18px; left: -18px;border-radius: inherit;background: #eee;background: linear-gradient(#e5e7e6, #eee);box-shadow: 0 1px 0 rgba(255,255,255,0.5);-webkit-filter: blur(1px);filter: blur(1px);}.easy-roll .sh label i {display: block;height: 100%;width: 60%;position: absolute;left: 0;top: 0;z-index: 2;border-radius: inherit;background: #b2ac9e;background: linear-gradient(#f7f2f6, #b2ac9e);box-shadow:inset 0 1px 0 white,0 0 8px rgba(0,0,0,0.3),0 5px 5px rgba(0,0,0,0.2);}.easy-roll .sh label i:after {content: "";position: absolute;left: 15%;top: 25%;width: 70%;height: 50%;background: #d2cbc3;background: linear-gradient(#cbc7bc, #d2cbc3);border-radius: inherit;}.easy-roll .sh label i:before {content: "off";position: absolute;top: 50%;right: -50%;margin-top: -12px;color: #666;color: rgba(0,0,0,0.4);font-style: normal;font-weight: bold;font-family: Helvetica, Arial, sans-serif;font-size: 24px;text-transform: uppercase;text-shadow: 0 1px 0 #bcb8ae, 0 -1px 0 #97958e;}.easy-roll .sh input:checked ~ label {background: #9abb82;}.easy-roll .sh input:checked ~ label i {left: auto;right: -1%;}.easy-roll .sh input:checked ~ label i:before {content: "on";right: 115%;color: #82a06a;text-shadow: 0 1px 0 #afcb9b, 0 -1px 0 #6b8659;}';

        let frBtcBody = $('body');
        let frBtcGlobalIntervalID = 0;
        let styleStringDice = '#frBtc-box {position: fixed;right: 0;bottom: 0;width: 350px;padding: 15px;background: #fff;}#frBtc-box input {min-width: 235px;} #frBtc-box.frBtc-toggled-form {height:75px;background:#aaa;margin-bottom:-35px;padding-top:40px;} .frBtc-toggled-form #frBtc-toggler {position:absolute;top:0}';

        let msgYouWin = $('#double_your_btc_bet_win');
        let x2Selector = 'double_your_btc_2x';
        let minSelector = 'double_your_btc_min';
        let currentRate = $('#double_your_btc_stake');

        function frBtcAutoGameIntervalID(maxBalance, maxHi, timerStep, setWhat) {
            if (!Boolean(maxBalance) || !Boolean(maxHi) || !Boolean(timerStep) || !Boolean(setWhat)) {
                alert('Set the correct values!');
                return;
            }
            let _mFactor = 100000000,
                calcMinBalance = function (maxHi) {
                    let i = 1,
                        lower = 1;
                    while (i < maxHi) {
                        lower += i *= 2;
                    }
                    return (parseFloat($.trim($('#balance').text())) - (lower / _mFactor));
                },
                minBalance = calcMinBalance(maxHi),
                clickX2 = function () {
                    document.getElementById(x2Selector).click();
                },
                clickMIN = function () {
                    document.getElementById(minSelector).click();
                },
                roll = function (setWhat) {
                    if (setWhat === 'setHi') {
                        $('#double_your_btc_bet_hi_button').click();
                    } else if (setWhat === 'setLow') {
                        $('#double_your_btc_bet_lo_button').click()
                    } else {
                        (Math.random() < 0.47) ? $('#double_your_btc_bet_lo_button').click() : $('#double_your_btc_bet_hi_button').click();
                    }
                },
                intervalID = setInterval(function () {
                    let currentBalance = parseFloat($.trim($('#balance').text()));
                    if (currentBalance < minBalance) {
                        alert('Less balance ' + minBalance + ', continue dangerous!');
                        clearInterval(intervalID);
                        return;
                    }
                    if (currentBalance > (maxBalance / _mFactor)) {
                        alert('Balance reached ' + (maxBalance / _mFactor) + ', need to rest!');
                        clearInterval(intervalID);
                        return;
                    }
                    console.info('The current balance is ' + currentBalance + ' and allows you to continue to try your luck!');
                    (msgYouWin.is(':visible') || (maxHi / _mFactor) < parseFloat(currentRate.val())) ? clickMIN() : clickX2();
                    roll(setWhat);
                }, timerStep);

            console.info('Start Balance: ' + parseFloat($.trim($('#balance').text())) * _mFactor);
            console.info('Calculated minBalance: ' + minBalance * _mFactor);
            return intervalID;
        };

        frBtcBody.append('<div id="frBtc-box" class="frBtc-toggled-form"><div><label for="frBtc-max-balance"><input id="frBtc-max-balance" type="number" placeholder="max balance, example 1200 (satoshi)"></label></div><br><div><label for="frBtc-maxHi"><input id="frBtc-maxHi" type="number" placeholder="max multiple, example 128 (satoshi)"></label></div><br><div><label for="frBtc-timerStep"><input id="frBtc-timerStep" type="number" placeholder="timer step, example 550 (ms)"></label></div><br><label for="frBtc-set-hi">HI</label><input type="radio" id="frBtc-set-hi" name="frBtc-set" value="setHi"><label for="frBtc-set-low">LOW</label><input type="radio" id="frBtc-set-low" name="frBtc-set" value="setLow"><label for="frBtc-set-random">RANDOM</label><input type="radio" id="frBtc-set-random" name="frBtc-set" value="setRandom"><hr><button id="frBtc-game-start">Start</button><hr><button id="frBtc-game-stop">Stop</button><hr><button id="frBtc-toggler">Collapse settings</button></div><style>' + styleStringDice + '</style>');
        frBtcBody.append('<div class="easy-roll"><h2>Автосборщик</h2><div class="sh"><input type="checkbox"' + (localStorage['ez-act'] == 1 ? ' checked' : '') + '><label><i></i></label></div></div><style>' + ER.style + '</style>');

        frBtcBody.on('click', '#frBtc-game-start', function () {
            let frBtcMaxBalance = $('#frBtc-max-balance').val(),
                frBtcMaxHi = $('#frBtc-maxHi').val(),
                frBtcTimerStep = $('#frBtc-timerStep').val(),
                frBtcSet = $('input[type="radio"]:checked').val();
            frBtcGlobalIntervalID = frBtcAutoGameIntervalID(frBtcMaxBalance, frBtcMaxHi, frBtcTimerStep, frBtcSet);
        });
        frBtcBody.on('click', '#frBtc-game-stop', function () {
            clearInterval(frBtcGlobalIntervalID);
        });
        frBtcBody.on('click', '#frBtc-toggler', function () {
            $('#frBtc-box').toggleClass('frBtc-toggled-form')
        })
        $('.easy-roll input').change(function () {
            localStorage['ez-act'] = localStorage['ez-act'] == 1 ? 0 : 1;
        });
        if (localStorage['ez-act'] == 1 && $(ER.dom).is(':visible')) {
            console.clear();
            console.log('Запуск автокликера - "ROLL" ...');
            console.info('Через ' + ER.time + ' сек., кликнет!');
            setTimeout(function () {
                $(ER.dom).click();
                console.info('-- клик "ROLL"!');
            }, ER.time);
        }
    });
}