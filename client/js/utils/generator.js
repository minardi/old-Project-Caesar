var Generator = (function () {
var strLettersArray = 'qwertyuiopasdfghjklzxcvbnm'.split(''),
    strNumbersArray = '0123456789'.split(''),
    strSymbolsArray = '!@#$%^&*()_+-={}[]:;|?<>/"\'~'.split('');

	function getRandom(min, max) {
		var range = max - min + 1;
		return Math.floor(Math.random() * range) + min;
	}

	function getRandomOfVariants(arrayVariants) {
		arrayVariants = arrayVariants ? arrayVariants : [];
		return arrayVariants.length > 0 ? arrayVariants[getRandom(0, arrayVariants.length - 1)] : null;
	}

	function generate() {
		var symbols = 2,
			numbers = 2,
			letters = 2,
			lettersUpper = 2,
			totalLength = symbols + numbers + letters + lettersUpper,
			result = '',
			objGeneratedCounter = {
				letters: 0,
				lettersUpper: 0,
				numbers: 0,
				symbols: 0
			},
			objVariantsSource = {
				letters: true,
				lettersUpper: true,
				numbers: true,
				symbols: true
			},
            arrayVariantsSource = [],
            typeChar = '',
            resultChar = '',
            typesHandlers = {};

		for (var i = 0; i < totalLength; i++) {

			if (objVariantsSource['letters'] && objGeneratedCounter.letters == letters) {
				objVariantsSource['letters'] = false;
			}

			if (objVariantsSource['lettersUpper'] && objGeneratedCounter.lettersUpper == lettersUpper) {
				objVariantsSource['lettersUpper'] = false;
			}

			if (objVariantsSource['numbers'] && objGeneratedCounter.numbers == numbers) {
				objVariantsSource['numbers'] = false;
			}

			if (objVariantsSource['symbols'] && objGeneratedCounter.symbols == symbols) {
				objVariantsSource['symbols'] = false;
			}

			arrayVariantsSource = [];
			for (var key in objVariantsSource) {

				if (objVariantsSource[key]) {
					arrayVariantsSource[arrayVariantsSource.length] = key;
				}
			}

			typeChar = getRandomOfVariants(arrayVariantsSource);
			resultChar = '';
			
			typesHandlers = {
				'letters': function () {
					resultChar = strLettersArray[getRandom(0, strLettersArray.length - 1)];
					objGeneratedCounter.letters++;
				},
				'lettersUpper': function () {
					resultChar = strLettersArray[getRandom(0, strLettersArray.length - 1)].toUpperCase();
					objGeneratedCounter.lettersUpper++;        
				},
				'numbers': function () {
					resultChar = strNumbersArray[getRandom(0, strNumbersArray.length - 1)];
					objGeneratedCounter.numbers++;
				},
				'symbols': function () {
					resultChar = strSymbolsArray[getRandom(0, strSymbolsArray.length - 1)];
					objGeneratedCounter.symbols++;
				}
			};

			typesHandlers[typeChar]();

			result += resultChar;
		}

			return result;
	}

	return {
		generatePassword: function () {
			return generate();
		}
	};
})();