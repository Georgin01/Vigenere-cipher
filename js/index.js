//Переменные используемые для вывода шифра
const output = document.getElementById('output');
const key = document.getElementById('key');
const message = document.getElementById('message');
const decode = document.getElementById('decode');

function vigenere(input) {
    let text, key, result = '';

    //Проверяем аргумент функции. Если аргумент - объект присваиваем зарание объявленные переменные
    if (typeof input === 'object'){
        text = input.msg;
        key = input.key;
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
        shift: key.value
    });
});
key.addEventListener("keyup", function(){
    let value = Number(this.value);
    output.textContent = vigenere({
        msg: message.value,
        shift: value
    });
});