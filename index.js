"use strict"

if (document.readyState == "loading") document.addEventListener('DOMContentLoaded', init)
else init()

var isPanelAdded = false

function init() {
    const content = document.querySelectorAll(".WidgetSimple .Header")

    var isIcAdded = icVerifier(content)
    var isCorrectPage = pageVerifier()
    var isIcPage = isIcPageVerifier()

    console.log(isCorrectPage && !isIcAdded,isCorrectPage,isIcAdded);

    if (isCorrectPage && !isIcAdded) addAlert()
    if (isIcPage) setTimeout(addIc, 2000)
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

function getChallengeToken() {
    try {
        const logoutButton = document.getElementsByClassName('LogoutButton')[0]
        const challengeToken = logoutButton.href.toString().split('ChallengeToken=')[1]
        return challengeToken.replace(';','')
    }  catch (error) {
        console.log(error);
    }
}

function addAlert() {
    const body = document.getElementsByTagName('body')[0]
    const head = document.getElementsByTagName('head')[0]
    
    head.insertAdjacentHTML('afterbegin', 
    `
    <script>${injectPanel}</scrip
    `)

    body.insertAdjacentHTML('afterbegin', 
    `
    <div class="alert">
        <h1 class="icon">!</h1>
        <span class="span">
            IC não associado
        </span>
    </div>
    `)
    
    const alert = document.getElementsByClassName('alert')[0]
    alert.addEventListener('click', injectPanel)
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
        }  catch (error) {
            console.log(error);
        }
    }
    return isIcAdded
}

function isIcPageVerifier() {
    try {
        return document.getElementsByTagName('h1')[0].textContent.includes('Gerenciar links para Chamado#')
    }   catch (error) {
        console.log(error);
    }
}

function addIc() {
    if (document.getElementsByClassName('MessageBox Info').length == 0){
        document.getElementById('LinkTargetKeys').click()
        document.getElementById('AddLinks').click()
    } else {
        window.close()
    }
}

function injectPanel() {
    if (!isPanelAdded) {
        isPanelAdded = true
        var challengeToken = getChallengeToken().toString()
        var ticket = getTicket()
        console.log(challengeToken);
        console.log(ticket);

        document.getElementsByClassName('alert')[0].classList.add('icPanelAdded')
        document.getElementsByClassName('span')[0].classList.add('turnSpanVisible')
        document.getElementsByClassName('icon')[0].classList.add('moveIcon')

        var teste = 'asdfdf'

        const body = document.getElementsByTagName('body')[0]
        body.insertAdjacentHTML('afterbegin', 
        `
        <div class="icPanel">
            <div class="header">
                <h2 class="title">Adicionar IC</h2>
            </div>
            <div class="options">
                <button class="button"><a href="https://suportedti.agu.gov.br/otrs/index.pl?ChallengeToken=${challengeToken}&Action=AgentLinkObject&Mode=Normal&SourceObject=Ticket&SourceKey=${ticket}&TargetIdentifier=ITSMConfigItem%3A%3A139&SEARCH%3A%3ANumber=&SEARCH%3A%3AName=biblioteca&SubmitSearch=Procurar&TypeIdentifier=AlternativeTo%3A%3ASource&SubmitLink=Procurar" target="_blanck">Bib. Software</a></button>
                <button class="button"><a href="https://suportedti.agu.gov.br/otrs/index.pl?ChallengeToken=${challengeToken}&Action=AgentLinkObject&Mode=Normal&SourceObject=Ticket&SourceKey=${ticket}&TargetIdentifier=ITSMConfigItem%3A%3A168&SEARCH%3A%3ANumber=&SEARCH%3A%3AName=SDFURA0031&SubmitSearch=Procurar&TypeIdentifier=AlternativeTo%3A%3ASource&SubmitLink=Procurar" target="_blanck">Reset de senha</a></button>
                <button class="button"><a href="https://suportedti.agu.gov.br/otrs/index.pl?ChallengeToken=${challengeToken}&Action=AgentLinkObject&Mode=Normal&SourceObject=Ticket&SourceKey=${ticket}&TargetIdentifier=ITSMConfigItem%3A%3A168&SEARCH%3A%3ANumber=&SEARCH%3A%3AName=SDF0432&SubmitSearch=Procurar&TypeIdentifier=AlternativeTo%3A%3ASource&SubmitLink=Procurar" target="_blanck">Alt. na conta</a></button>
                <button class="button"><a href="https://suportedti.agu.gov.br/otrs/index.pl?ChallengeToken=${challengeToken}&Action=AgentLinkObject&Mode=Normal&SourceObject=Ticket&SourceKey=${ticket}&TargetIdentifier=ITSMConfigItem%3A%3A168&SEARCH%3A%3ANumber=&SEARCH%3A%3AName=SDF0814+&SubmitSearch=Procurar&TypeIdentifier=AlternativeTo%3A%3ASource&SubmitLink=Procurar" target="_blanck">Desativar conta</a></button>
                <button class="button"><a href="https://suportedti.agu.gov.br/otrs/index.pl?ChallengeToken=${challengeToken}&Action=AgentLinkObject&Mode=Normal&SourceObject=Ticket&SourceKey=${ticket}&TargetIdentifier=ITSMConfigItem%3A%3A168&SEARCH%3A%3ANumber=&SEARCH%3A%3AName=SDFURA0117&SubmitSearch=Procurar&TypeIdentifier=AlternativeTo%3A%3ASource&SubmitLink=Procurar" target="_blanck">Criar conta</a></button>
                <button class="button"><a href="https://suportedti.agu.gov.br/otrs/index.pl?Action=AgentLinkObject;SourceObject=Ticket;SourceKey=${ticket}" target="_blanck">Inserir manual</a></button>
            </div>
        </div>
        `)
    } else {
        isPanelAdded = false
        document.getElementsByClassName('alert')[0].classList.remove('icPanelAdded')
        document.getElementsByClassName('span')[0].classList.remove('turnSpanVisible')
        document.getElementsByClassName('icon')[0].classList.remove('moveIcon')
        document.getElementsByClassName('icPanel')[0].remove()
    }
}