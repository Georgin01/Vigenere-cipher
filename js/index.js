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

function vigenere(input) {
    let text, key, result = '';

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

    //В цикле делаем посимвольную проверку: Если данный симфол введенной строки есть в определенном масиве -
    //добавляем к результатирующей строке символ из того же массива но сдвинутый на номер буквы ключа в английском
    //алфавите и обрабатываем по модулю длинны массива.
    for (let i=0; i<text.length; i++){
        if (chars.includes(text[i])) result += chars[(chars.indexOf(text[i]) + engAlphabetLow.indexOf(key[key_iterator])) % chars.length];
        if (numbers.includes(text[i])) result += numbers[(numbers.indexOf(text[i]) + engAlphabetLow.indexOf(key[key_iterator])) % numbers.length];
        if (engAlphabetLow.includes(text[i])) result += engAlphabetLow[(engAlphabetLow.indexOf(text[i]) + engAlphabetLow.indexOf(key[key_iterator])) % engAlphabetLow.length];
        if (engAlphabetUp.includes(text[i])) result += engAlphabetUp[(engAlphabetUp.indexOf(text[i]) + engAlphabetLow.indexOf(key[key_iterator])) % engAlphabetUp.length];
        if (rusAlphabetLow.includes(text[i])) result += rusAlphabetLow[(rusAlphabetLow.indexOf(text[i]) + engAlphabetLow.indexOf(key[key_iterator])) % rusAlphabetLow.length];
        if (rusAlphabetUp.includes(text[i])) result += rusAlphabetUp[(rusAlphabetUp.indexOf(text[i]) + engAlphabetLow.indexOf(key[key_iterator])) % rusAlphabetUp.length];

        //Обнуление итератора ключа при достижении длинны самого ключа
        key_iterator = key_iterator + 1 === key.length ? 0 : key_iterator + 1;
    } 
    
    return result;
}

message.addEventListener("input", function(){
    let value = this.value;
    output.textContent = vigenere({
        msg: value,
        key: key.value
    });
});
key.addEventListener("keyup", function(){
    let value = this.value;
    output.textContent = vigenere({
        msg: message.value,
        key: value
    });
});