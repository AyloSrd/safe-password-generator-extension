import PasswordGenerator from './PasswordGenerator.js'
import Display from './Display.js'

const secondaryForm =  document.querySelector("#generation-tab > form.small-form")
const saveForm = document.querySelector("#save-tab > form")
const password = document.getElementById('password')
const passwordCopy = document.getElementById('password-copy')

document.querySelector("#generation-tab > .form").addEventListener('submit', e => {
    e.preventDefault()
    const params = Array.from(document.querySelectorAll('#generation-tab > form > div > label> input[type=checkbox]:checked')).map(cbx => cbx.name)
    const pswdLength = Number(document.getElementById('pswd-length').value)
    console.log()
    const PswdGen = new PasswordGenerator()
    password.value = PswdGen.generate(params, pswdLength)
})

secondaryForm.addEventListener('submit', e => {
    e.preventDefault()
    passwordCopy.value = password.value
})

secondaryForm.addEventListener('reset', e => {
    e.preventDefault()
    password.select()
    document.execCommand('copy')
})

saveForm.addEventListener('submit', e => {
    e.preventDefault()
    const associatedName = document.getElementById('associated-name').value
    chrome.storage.sync.get(['sepg'], res => {
        const oldList = res.sepg ?? []
        const newList = [...oldList, {id: `${Math.random()}`, assName: associatedName, str: passwordCopy.value}]
        console.log(newList)
        chrome.storage.sync.set({sepg: newList}, () => {
            console.log('done')
          })
      })
})


