"use strict"

function getTicket() {
    try {
        const ticket = window.location.href.split('TicketID=')[1]

        if (ticket.length > 6) {
            return ticket.slice(0, 6)
        }

        return ticket
    } catch (error) {
        console.log(error);
    }
}

export function addICAlert() {
    const body = document.getElementsByTagName('body')[0]
    const ticket = getTicket()

    body.insertAdjacentHTML('afterbegin',
        `
    <a class="alert" title="Clique para adicionar o IC" href="https://suportedti.agu.gov.br/otrs/index.pl?Action=AgentLinkObject;SourceObject=Ticket;SourceKey=${ticket}" target="_blanck">
        <div class="alert">
            <h1 class="icon">!</h1>
            <span class="span">
                IC Não Associado!
            </span>
        </div>
    </a>
    `)
}

export function pageVerifier() {
    try {
        return document.querySelector('.Headline').querySelector('h1').textContent.includes('Chamado#')
    } catch (error) {

    }
}

export function icVerifier(content) {
    let isIcAdded = false

    for (let i = 0; i < content.length; i++) {
        try {
            if (content[i].getElementsByTagName('h2')[0]?.textContent.toString().includes('ConfigItem')) {
                isIcAdded = true
            }
        } catch (err) {
            console.log('icVerifier error: ' + err);
        }
    }
    return isIcAdded
}

export function homePageVerifier() {
    try {
        return document.URL == 'https://suportedti.agu.gov.br/otrs/index.pl?Action=AgentDashboard'
    } catch (error) {
        return false
    }
}