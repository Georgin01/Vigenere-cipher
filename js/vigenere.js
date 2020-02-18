import {isalpha} from "./utilities.js";

//Объявление функции шифра Вижинира
export function vigenere(input) {
    let text, keyword, flag, result = '';

    //Проверяем аргумент функции. Если аргумент - объект присваиваем зарание объявленные переменные.
    //Если ключ аргумента содержит запрещенные знаки - возвращаем ошибку.
    if (typeof input === 'object'){
        if (typeof input.key !== 'string' || !isalpha(input.key)){
            result = `Invalid keyword. Must be string and can only contain eng letters.`;
            return result;
        }
        else {
            text = input.msg;
            keyword = input.key.toLowerCase();
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

    //key_iterator служит для перебора символов ключа. Позже в цикле переменная обнуляется по достижению величины равной длинне ключа.
    //Это поможет имиитировать повторение ключа до заполнения им длинны введенного текста (по принципу шифрования Вижинира).
    let key_iterator = 0;

    //Функция для кодировки. Возвращает шифрованный символ исходя из входных данных
    function encoding(arr, char){
        //Формула : С[i] = (M[i] + K[i]) % N
        //С[i] - симфол шифра, M[i] - символ входящего текста, К[i] - символ ключа, N - длинна масива
        return arr[(arr.indexOf(char) + engAlphabetLow.indexOf(keyword[key_iterator])) % arr.length];
    }

    //Функция для декодирования. Возвращает розшифрованный символ исходя из входных данных
    function decoding(arr, char){
        //Формула : С[i] = (M[i] + N - K[i]) % N
        //С[i] - симфол розшифровки, M[i] - символ шифра, К[i] - символ ключа, N - длинна масива
        return arr[(arr.indexOf(char) + arr.length - engAlphabetLow.indexOf(keyword[key_iterator])) % arr.length];
    }

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
        key_iterator = key_iterator + 1 === keyword.length ? 0 : key_iterator + 1;
    }

    return result;
}