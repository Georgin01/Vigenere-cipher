//Функция для проверки ключа. Ключ должен включать исключительно английские буквы.
//Символы и знаки - запрещены!
export function isalpha(str) {
    return (/^[a-zA-Z]+$/).test(str);
}

//Експортируем вспомогательную функцию
//Последующие операции служат для вывода закодированного и розшифрованного сообщения
//"Вешаем" обработчик на каждое событие и применяем функцию шифрования к объекту вывода
export function outputFunc(message, shift, decode, output, vigenere) {
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
}