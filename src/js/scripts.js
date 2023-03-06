"use strict"

let checkedOptions = []
const regioes = []

export const getCheckedOptions = () => {
    return checkedOptions
}

function init() {
    addFunctions()
    loadData()
}

function addFunctions() {
    const selectAll = document.getElementById('selectAll')
    const regiao1 = document.getElementById('regiao1')
    const regiao2 = document.getElementById('regiao2')
    const regiao3 = document.getElementById('regiao3')
    const regiao4 = document.getElementById('regiao4')
    const regiao5 = document.getElementById('regiao5')

    regioes.push(regiao1, regiao2, regiao3, regiao4, regiao5)

    selectAll.addEventListener('click', () => {
        let status = selectAll.checked
        changenStatus(regiao1, status)
        changenStatus(regiao2, status)
        changenStatus(regiao3, status)
        changenStatus(regiao4, status)
        changenStatus(regiao5, status)
    })

    regiao1.addEventListener('click', () => {
        changenStatus(regiao1)
    })
    regiao2.addEventListener('click', () => {
        changenStatus(regiao2)
    })
    regiao3.addEventListener('click', () => {
        changenStatus(regiao3)
    })
    regiao4.addEventListener('click', () => {
        changenStatus(regiao4)
    })
    regiao5.addEventListener('click', () => {
        changenStatus(regiao5)
    })
}

function changenStatus(element, status = null) {
    if (status != null) {
        element.checked = status
    }

    if (element.checked) {
        if (!checkedOptions.includes(element.name))
            checkedOptions.push(element.name)
    } else {
        checkedOptions = checkedOptions.filter(e => {
            return e != element.name
        })
    }
    updateLocalStorageCheckedOptions()
}

function updateLocalStorageCheckedOptions() {
    localStorage.setItem('CheckedOptions', JSON.stringify(checkedOptions))
}

function loadData() {
    const local = localStorage.getItem('CheckedOptions')
    if (local != null) {
        checkedOptions.push(...JSON.parse(local))
    }

    console.log('load data');
    regioes.forEach(e => {
        console.log(e.name);
        if (checkedOptions.includes(e.name)) {
            console.log('tem ' + e.name);
            changenStatus(e, true)
        }
    })
}

if (document.readyState == "loading") document.addEventListener('DOMContentLoaded', init)
else init()

export { getCheckedOptions }