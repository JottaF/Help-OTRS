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
        const head = document.getElementsByTagName('head')[0]

        head.insertAdjacentHTML('beforeend',
        `
        <script>
            function getTicket() {
                const ticket = window.location.href.split('TicketID=')[1]
                
                if (ticket.length > 6) {
                    return ticket.slice(0,6)
                }
                const tk = getChallengeToken()
                console.log(ticket,tk)
            
                return ticket
            }
            
            function getChallengeToken() {
                const logoutButton = document.getElementsByClassName('LogoutButton')[0]
                const challengeToken = logoutButton.href.toString().split('ChallengeToken=')[1]
                return challengeToken.replace(';','')
            }
        </script>
        `
        )

        body.insertAdjacentHTML('afterbegin', 
        `
        <link rel="stylesheet" href="style.css">
        <div class="alert" onclick=getTicket>
            <h1 class="icon">!</h1>
            <span class="span">
                IC não associado
            </span>
        </div>
        `)
    }
}

function getTicket() {
    const ticket = window.location.href.split('TicketID=')[1]
    
    if (ticket.length > 6) {
        return ticket.slice(0,6)
    }
    const tk = getChallengeToken()
    console.log(ticket,tk)

    return ticket
}

function getChallengeToken() {
    const logoutButton = document.getElementsByClassName('LogoutButton')[0]
    const challengeToken = logoutButton.href.toString().split('ChallengeToken=')[1]
    return challengeToken.replace(';','')
}