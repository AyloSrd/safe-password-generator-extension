import PasswordGenerator from './PasswordGenerator.js'

document.querySelector("#generation-tab > form").addEventListener('submit', e => {
    e.preventDefault()
    const params = Array.from(document.querySelectorAll('#generation-tab > form > div > label> input[type=checkbox]:checked')).map(cbx => cbx.name)
    const pswdLength = Number(document.getElementById('pswd-length').value)
    console.log()
    const PswdGen = new PasswordGenerator()
    document.getElementById('password').value = PswdGen.generate(params, pswdLength)
})