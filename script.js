import PasswordGenerator from './PasswordGenerator.js'
import Display from './Display.js'

const generationSection = document.getElementById('generation-tab')
const secondaryForm =  document.querySelector("#generation-tab > form.small-form")
const saveTab = document.getElementById('save-tab')
const saveForm = document.querySelector("#save-tab > form")
const password = document.getElementById('password')
const passwordCopy = document.getElementById('password-copy')
const storageSection =  document.getElementById('storage-tab')

const display = new Display()

const emptySection = el => { while (el.firstChild) el.removeChild(el.firstChild) }

const deleteOneItem = id => chrome.storage.sync.get(['sepg'], res => chrome.storage.sync.set({sepg : res.sepg.filter(el => el.id !== id)}, () => populateStorageSection()))

const createItem = (id, assName, str) => {
    const itemContainer = document.createElement('div')
    const form = document.createElement('form')
    const assNameDisplay = document.createElement('label')
    const strDisplay = document.createElement('input')
    const copyButton = document.createElement('button')
    const deleteButton = document.createElement('button')
    copyButton.innerText = '📋'
    deleteButton.innerText = '❌'
    copyButton.className = 'neu'    
    deleteButton.className = 'neu'
    strDisplay.className = 'neu-in'
    strDisplay.setAttribute('name', 'str')
    strDisplay.type = 'text'
    strDisplay.readOnly = 'true'
    assNameDisplay.setAttribute('for', 'str');
    assNameDisplay.innerText = assName
    strDisplay.value = display.showOnScreen(str)
    copyButton.addEventListener('click', e => {
        e.preventDefault()
        strDisplay.select()
        document.execCommand('copy')
    })
    deleteButton.addEventListener('click', e => {
        e.preventDefault()
        deleteOneItem(id)
    })
    form.appendChild(assNameDisplay)
    form.appendChild(strDisplay)
    form.appendChild(copyButton)
    form.appendChild(deleteButton)
    itemContainer.appendChild(form)
    return itemContainer
}

const deleteAllDiv = (isActive) => {
    const container = document.createElement('div')
    container.className = 'glass'
    const deleteAllButton = document.createElement('button')
    deleteAllButton.innerText = 'delete all'
    deleteAllButton.className = 'neu on-glass danger'
    if(isActive) deleteAllButton.addEventListener('click', () => chrome.storage.sync.set({sepg: []}, () => populateStorageSection()))
    if(!isActive) deleteAllButton.disabled = true
    container.appendChild(deleteAllButton)
    return container
}

const populateStorageSection = () => {
    emptySection(storageSection)
    chrome.storage.sync.get(['sepg'], res => {
        if (res.sepg.length === 0 || res.sepg === undefined) {
         storageSection.innerText = 'no items'
         storageSection.appendChild(deleteAllDiv(false))
         return
        }
        res.sepg.forEach(item => storageSection.appendChild(createItem(item.id, item.assName, item.str)))
        storageSection.appendChild(deleteAllDiv(true))
      })
}

document.getElementById('generator-switcher').addEventListener('click', () => {
    emptySection(storageSection)
    storageSection.style.display = 'none'
    generationSection.style.display = 'block'
})

document.getElementById('fav-switcher').addEventListener('click', () => {
    generationSection.style.display = 'none'
    storageSection.style.display = 'block'
    populateStorageSection()
})

document.querySelector("#generation-tab > .form").addEventListener('submit', e => {
    e.preventDefault()
    const params = Array.from(document.querySelectorAll('#generation-tab > form > div > label> input[type=checkbox]:checked')).map(cbx => cbx.name)
    const pswdLength = Number(document.getElementById('pswd-length').value)
    const PswdGen = new PasswordGenerator()
    password.value = PswdGen.generate(params, pswdLength)
})

password.addEventListener('keydown', e => e.preventDefault())

secondaryForm.addEventListener('submit', e => {
    e.preventDefault()
    passwordCopy.value = password.value
    saveTab.style.left = '0'
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
            saveTab.style.left = '-500px'
            passwordCopy.value = ''
        })
    })
})

saveForm.addEventListener('reset', e => {
    e.preventDefault()
    saveTab.style.left = '-500px'
    passwordCopy.value = ''
})


