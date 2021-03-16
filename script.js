import PasswordGenerator from './PasswordGenerator.js'

document.querySelector("#generation-tab > button").addEventListener('click', () => {
    const PswdGen = new PasswordGenerator()
    document.getElementById('password').innerText = PswdGen.generate(['uppercase', 'numbers', 'symbols', 'lowercase'], 50)
})