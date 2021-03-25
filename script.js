import PasswordGenerator from './PasswordGenerator.js'
import Display from './Display.js'

const secondaryForm =  document.querySelector("#generation-tab > form.small-form")
const saveForm = document.querySelector("#save-tab > form")
const password = document.getElementById('password')
const passwordCopy = document.getElementById('password-copy')
const storageSection =  document.getElementById('storage-tab')

const display = new Display()

const createItem = (id, assName, str) => {
    const itemContainer = document.createElement('div')
    const form = document.createElement('form')
    const assNameDisplay = document.createElement('label')
    const strDisplay = document.createElement('input')
    const copyButton = document.createElement('button')
    const deleteButton = document.createElement('button')
    copyButton.innerText= 'c'
    deleteButton.innerText = 'x'
    strDisplay.setAttribute('name', 'str')
    assNameDisplay.setAttribute('for', 'str');
    assNameDisplay.innerText = assName
    strDisplay.value = display.showOnScreen(str)
    form.appendChild(assNameDisplay)
    form.appendChild(strDisplay)
    itemContainer.appendChild(form)
    itemContainer.appendChild(copyButton)
    itemContainer.appendChild(deleteButton)
    return itemContainer
}

const populateStorageSection = () => {
    chrome.storage.sync.get(['sepg'], res => {
        if (res.sepg.length === 0 || res.sepg === undefined)  storageSection.innerText = 'no items'
        res.sepg.forEach(item => storageSection.appendChild(createItem(item.id, item.assName, item.str)))
      })
}

document.querySelector("#generation-tab > .form").addEventListener('submit', e => {
    e.preventDefault()
    const params = Array.from(document.querySelectorAll('#generation-tab > form > div > label> input[type=checkbox]:checked')).map(cbx => cbx.name)
    const pswdLength = Number(document.getElementById('pswd-length').value)
    console.log()
    const PswdGen = new PasswordGenerator()
    password.value = PswdGen.generate(params, pswdLength)
})

password.addEventListener('keydown', e => e.preventDefault())

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
        const newList = [...oldList, {id: `${Math.random()}`, assName: associatedName, str: display.putIn(passwordCopy.value)}]
        console.log(newList)
        chrome.storage.sync.set({sepg: newList}, () => {
            console.log('done')
          })
      })
})

populateStorageSection()

