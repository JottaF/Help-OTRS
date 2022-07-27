"use strict"

if (document.readyState == "loading") document.addEventListener('DOMContentLoaded', init)
else init()

function init() {
    var isIcAdded = false
    var isCorrectPage = false
    const content = document.querySelectorAll(".WidgetSimple .Header")

    try {
        isCorrectPage = document.querySelector('.Headline').querySelector('h1').textContent.includes('Chamado#')
        
        for (let i = 0; i < content.length; i++) {
            if (content[i].getElementsByTagName('h2')[0].textContent.toString().includes('ConfigItem')) {
                isIcAdded = true
                console.log('Chamado com IC')
            }
        }
    } catch {}

    if (isCorrectPage && !isIcAdded) {
        const body = document.getElementsByTagName('body')[0]
        body.insertAdjacentHTML('afterbegin', 
        `
        <link rel="stylesheet" href="style.css">
        <div class="alert">
            <h1 class="icon">!</h1>
            <span class="span">
                IC não associado
            </span>
        </div>
        `)
    }
}