var techPrimeController = {
    __name: 'jp.co.nssol.meganetaaan.techprime.PageController',
    _primeLogic: primeLogic,
    _$balloon: null,
    _primeQueue: null,
    count: 0,

    __ready : function(){
        this._$balloon = this.$find('#balloon');
        this._primeQueue = new Array();
        this.log.debug(this._$balloon, this.__name);
    },
    '#techChanContainer click': function(context, $el){
        'use strict';
        var i = this._primeLogic._getRandomInt(1, 10000);
        var message = i + 'は';
        message += this._primeLogic.isPrime(i) ? '素数だ!!' : '素数じゃない…';
        this.log.debug(message, this.__name);
    },

    '#primeNumber focus': function(context, $el){
        $el.val("");
    },

    '#primeForm submit': function(context, $el){
        'use strict';
        context.event.preventDefault();
        this._$balloon.stop().animate({"opacity" : "1.0"});
        this._$balloon.html("");
        this._$balloon.show()
        var i = this.$find('#primeForm input[name="primeNumber"]').val();
        this._primeQueue.push(i);
        var message = i + 'は';
        if(i.match(/^-?[0-9]+$/)){
            message += this._primeLogic.isPrime(i) ? '素数だよ!!' : '素数ではないよ…';
        }else{
            message += '整数ではないよ…';
        }
        var $sentence = $("<div></div>").addClass('sentence').text(message);//.hide();
        this._$balloon.append($sentence);
        this.log.debug(message, this.__name);
        this._speech(message, true)
        .done(this.own(function(){
            this._primeQueue.shift();
            if(this._primeQueue.length == 0){
                this.log.debug('no number left in the queue. fading out', this.__name);
                this._$balloon.fadeOut("slow");
            }
        }));
    },

    _speech: function(message, isInterrupt){
        'use strict';
        if(typeof isInterrupt === "undefined"){
            isInterrupt = false;
        }
        this.log.debug('_speech', this.__name);
        var dfd = this.deferred();
        var syaberi = new SpeechSynthesisUtterance();
        syaberi.volume = 1;
        syaberi.rate = 1.0;
        syaberi.pitch = 1.2;
        syaberi.text = message;
        syaberi.lang = 'ja-JP';
        syaberi.onend = this.own(function (event) {
            this.log.debug('speech end. time=' + event.elapsedTime + 's', this.__name);
            dfd.resolve();
        });
        if(isInterrupt){
            speechSynthesis.cancel();
        }
        speechSynthesis.speak(syaberi);
        return dfd.promise();
    }
};
h5.core.controller('body', techPrimeController);
