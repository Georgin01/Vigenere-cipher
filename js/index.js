//Переменные используемые для вывода шифра
const output = document.getElementById('output');
const key = document.getElementById('key');
const message = document.getElementById('message');
const decode = document.getElementById('decode');

//Функция для проверки ключа. Ключ должен включать исключительно английские буквы.
//Символы и знаки - запрещены!
function isalpha(str) {
    return (/^[a-zA-Z]+$/).test(str);
}

//Объявление функции шифра Вижинира
function vigenere(input) {
    let text, key, flag, result = '';

    //Проверяем аргумент функции. Если аргумент - объект присваиваем зарание объявленные переменные.
    //Если ключ аргумента содержит запрещенные знаки - возвращаем ошибку.
    if (typeof input === 'object'){
        if (typeof input.key !== 'string' || !isalpha(input.key)){
            result = `Invalid keyword. Must be string and can only contain eng letters.`;
            return result;
        }
        else {
            text = input.msg;
            key = input.key.toLowerCase();
            flag = input.flag
        }
    }
    else {
        result = 'Error!';
        return result;
    }

    //Сохраняем наши алфавиты в переменные разбивая на массив
    const rusAlphabetUp = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('');
    const rusAlphabetLow = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split('');
    const engAlphabetUp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const engAlphabetLow = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const numbers = '0123456789'.split('');
    const chars = '-=~\"\'#$%&*^:<>?/!{(|)}.\\, '.split('');

    //Функция для кодировки. Возвращает шифрованный символ исходя из входных данных
    function encoding(arr, char){
        //Формула : С[i] = (M[i] + K[i]) % N
        //С[i] - симфол шифра, M[i] - символ входящего текста, К[i] - символ ключа, N - длинна масива
        return arr[(arr.indexOf(char) + engAlphabetLow.indexOf(key[key_iterator])) % arr.length];
    }

    //Функция для декодирования. Возвращает розшифрованный символ исходя из входных данных
    function decoding(arr, char){
        //Формула : С[i] = (M[i] + N - K[i]) % N
        //С[i] - симфол розшифровки, M[i] - символ шифра, К[i] - символ ключа, N - длинна масива
        return arr[(arr.indexOf(char) + arr.length - engAlphabetLow.indexOf(key[key_iterator])) % arr.length];
    }

    //key_iterator служит для перебора символов ключа. Позже в цикле переменная обнуляется по достижению величины равной длинне ключа.
    //Это поможет имиитировать повторение ключа до заполнения им длинны введенного текста (по принципу шифрования Вижинира).
    let key_iterator = 0;

    //В цикле делаем посимвольную проверку: Если данный симфол введенной строки есть в определенном масиве -
    //добавляем к результатирующей строке символ из того же массива но сдвинутый на номер буквы ключа в английском
    //алфавите и обрабатываем по модулю длинны массива.
    for (let i=0; i<text.length; i++){

        //Делаем проверку флага. Если флаг больше 0, то выполняем процес кодирования, в обратном случае - розшифровка.
        if (flag > 0){
            if (chars.includes(text[i])) result += encoding(chars, text[i]);
            if (numbers.includes(text[i])) result += encoding(numbers, text[i]);
            if (engAlphabetLow.includes(text[i])) result += encoding(engAlphabetLow, text[i]);
            if (engAlphabetUp.includes(text[i])) result += encoding(engAlphabetUp, text[i]);
            if (rusAlphabetLow.includes(text[i])) result += encoding(rusAlphabetLow, text[i]);
            if (rusAlphabetUp.includes(text[i])) result += encoding(rusAlphabetUp, text[i]);

        }else {
            if (chars.includes(text[i])) result += decoding(chars, text[i]);
            if (numbers.includes(text[i])) result += decoding(numbers, text[i]);
            if (engAlphabetLow.includes(text[i])) result += decoding(engAlphabetLow, text[i]);
            if (engAlphabetUp.includes(text[i])) result += decoding(engAlphabetUp, text[i]);
            if (rusAlphabetLow.includes(text[i])) result += decoding(rusAlphabetLow, text[i]);
            if (rusAlphabetUp.includes(text[i])) result += decoding(rusAlphabetUp, text[i]);
        }

        //Обнуление итератора ключа при достижении длинны самого ключа
        key_iterator = key_iterator + 1 === key.length ? 0 : key_iterator + 1;
    } 
    
    return result;
}

message.addEventListener("input", function(){
    let value = this.value;
    output.textContent = vigenere({
        msg: value,
        key: key.value,
        flag: 1
    });
});
key.addEventListener("keyup", function(){
    let value = this.value;
    output.textContent = vigenere({
        msg: message.value,
        key: value
    });
});
decode.addEventListener("input", function(){
    let value = this.value;
    output.textContent = vigenere({
        msg: value,
        key: key.value,
        flag: 0
    });
});