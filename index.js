"use strict"

if (document.readyState == "loading") document.addEventListener('DOMContentLoaded', init)
else init()

function init() {
    const content = document.querySelectorAll(".WidgetSimple .Header")

    var isIcAdded = icVerifier(content)
    var isCorrectPage = pageVerifier()

    if (isCorrectPage && !isIcAdded) addAlert()
}

function getTicket() {
    try {
        const ticket = window.location.href.split('TicketID=')[1]
        
        if (ticket.length > 6) {
            return ticket.slice(0,6)
        }
    
        return ticket
    } catch (error) {
        console.log(error);
    }
}

function addAlert() {
    const body = document.getElementsByTagName('body')[0]
    var ticket = getTicket()

    body.insertAdjacentHTML('afterbegin', 
    `
    <a class="alert" title="Clique para adicionar o IC" href="https://suportedti.agu.gov.br/otrs/index.pl?Action=AgentLinkObject;SourceObject=Ticket;SourceKey=${ticket}" target="_blanck" alt=">
        <div class="alert">
            <h1 class="icon">!</h1>
            <span class="span">
                IC não associado
            </span>
        </div>
    </a>
    `)
}

function pageVerifier() {
    try {
        return document.querySelector('.Headline').querySelector('h1').textContent.includes('Chamado#')
    }   catch (error) {
        console.log(error);
    }
}

function icVerifier(content) {
    var isIcAdded = false
    
    for (let i = 0; i < content.length; i++) {
        try {
            if (content[i].getElementsByTagName('h2')[0]?.textContent.toString().includes('ConfigItem')) {
                isIcAdded = true
            }
        }  catch {}
    }
    return isIcAdded
}