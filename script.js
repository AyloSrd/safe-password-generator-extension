class PasswordGenerator {
    constructor() {
        this.uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.lowercase = 'abcdefghijklmnopqrstuvwxyz';
        this.numbers = '0123456789';
        this.symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
        this.password = ''
    }

    generate = (params, length) => {
        this.password = params.reduce((psw, p) => psw + this[p].charAt(Math.floor(Math.random() * this[p].length)), '')
        if (length) {
            const all = params.reduce((psw, p) => psw + this[p], '')
            for (let i = 0; i < length; i++) {
                this.password += all.charAt(Math.floor(Math.random() * all.length))
            }
        }
        const provPswd = this.password.split('')
        for (let i = provPswd.length - 1; i > 0; i--) {
             const j = Math.floor(Math.random() * (i + 1))
             const temp = provPswd[i]
             provPswd[i] = provPswd[j]
             provPswd[j] = temp
        }
        this.password = provPswd.join('')
        return this.password
    }
}

document.querySelector("#generation-tab > button").addEventListener('click', () => {
    console.log('clicked')
    const Pswd = new PasswordGenerator()
    document.getElementById('password').innerText = Pswd.generate(['uppercase', 'numbers', 'symbols', 'lowercase'], 50)
})