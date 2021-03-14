// function generate(length = 12) {
//     var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     var lowercase = 'abcdefghijklmnopqrstuvwxyz';
//     var numbers = '0123456789';
//     var symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
//     var all = uppercase + lowercase + numbers + symbols;
//     var password = '';
//     for (var index = 0; index < length; index++) {
//         var character = Math.floor(Math.random() * all.length);
//         password += all.charAt(character);
//     }
//     return password;
// }

class PasswordGenerator {
    constructor(params, length) {
        this.params = params
        this.length = length
        this.uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.lowercase = 'abcdefghijklmnopqrstuvwxyz';
        this.numbers = '0123456789';
        this.symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
        this.all = this.uppercase + this.lowercase + this.numbers + this.symbols;
        this.password = ''
    }

    generate = () => {
        for (var index = 0; index < this.length; index++) {
            var character = Math.floor(Math.random() * this.all.length);
            this.password += this.all.charAt(character);
        }
        return this.password
    }
}

document.querySelector("#generation-tab > button").addEventListener('click', () => {
    console.log('clicked')
    const Psw = new PasswordGenerator('yoo', 12)
    console.log(Psw.generate())
    document.getElementById('password').innerText = Psw.generate()
})