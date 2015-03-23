var primeLogic = {
    __name: 'jp.co.nssol.meganetaaan.techprime.PrimeLogic',
    DEFAULT_K: 20,

    isPrime: function(number, k){
        'use strict';
        if(typeof k === 'undefined'){
            k = this.DEFAULT_K;
        }
        var n = Math.abs(number);

        // 2 is a prime.
        if (n === 2){
            return true;
        }

        // 1 is not a prime.
        // Even numbers are not prime (except 2).
        if (n === 1 || n % 2 === 0){
            return false;
        }

        // make 2^s*d
        var d = n - 1;
        var s = 0;
        while (d % 2 === 0){
            d = d / 2;
            s++;
        }

        // determination cycle
        for(var i = 0; i < k; i++){
            var isProbablyPrime = false;

            // Choose a number randomly between 1 and n - 1
            var a = this._getRandomInt(1, n - 1);

            var r = this._modPow(a, d, n);
            if(r === 1 || r === n - 1){
                isProbablyPrime = true;
            }

            for(var j = 0; j < s; j++){
                r = this._modPow(r, 2, n);
                if(r === n - 1){
                    isProbablyPrime = true;
                }
            }

            if(!isProbablyPrime){
                return false;
            }
        }
        return true;
    },

    _modPow: function(x, k, m){
        'use strict';
        if(k === 0){
            return 1;
        }
        if(k % 2 === 0){
            return this._modPow(x * x % m, k / 2, m);
        } else {
            return this._modPow(x, k - 1, m) * x % m;
        }
    },

        _getRandomInt: function(min, max){
            'use strict';
            return Math.floor( Math.random() * (max- min + 1) ) + min;
        },
};
