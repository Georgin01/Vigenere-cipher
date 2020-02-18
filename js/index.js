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

    //Проверяем аргумент функции. Если аргумент - объект присваиваем зарание объявленные переменные
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