"use strict"
import { getCheckedOptions } from './scripts'

function init() {
    const content = document.querySelectorAll(".WidgetSimple .Header")

    const isIcAdded = icVerifier(content)
    const isCorrectPage = pageVerifier()

    if (isCorrectPage && !isIcAdded) addICAlert()

    const events = getEvents()
    if (homePageVerifier && events.length > 0) addCalendarAlert(events)
}

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

function addICAlert() {
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

function pageVerifier() {
    try {
        return document.querySelector('.Headline').querySelector('h1').textContent.includes('Chamado#')
    } catch (error) {

    }
}

function icVerifier(content) {
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

function homePageVerifier() {
    try {
        return document.URL == 'https://suportedti.agu.gov.br/otrs/index.pl?Action=AgentDashboard'
    } catch (error) {

    }
}

function convertDate(date) {
    let oldDate = date[0]
    let time = date[1]

    let newDate = oldDate.split('/').reverse().join('-')

    return new Date(`${newDate} ${time} GMT-0300`)
}

function getEvents() {
    const today = new Date()
    const eventDetails = document.getElementsByClassName('EventDetails')
    const filter = getCheckedOptions()
    console.log('filter ', filter);
    const events = []

    for (let i = 0; i < eventDetails.length; i++) {
        const details = eventDetails[i].getElementsByClassName('Value')

        if (today.toLocaleDateString() == details[9].textContent.split(' ')[0]) {
            const estado = details[5].textContent
            const titulo = details[6].textContent
            const inicio = details[8].textContent.split(' ')
            const termino = details[9].textContent.split(' ')
            const link = eventDetails[i].getAttribute('id').split('-')[2]

            let minsToStart = (convertDate(inicio) - today) / 1000 / 60

            if (estado == 'Aguardando Validação' || estado == 'Em Atendimento')
                return false
            if (minsToStart > 15)
                return false
            if (filter)
                filter.forEach(element => {
                    if (titulo.includes(element)) {
                        let horaInicio = inicio[1]
                        let horaFim = termino[1]
                        events.push({ estado, titulo, horaInicio, horaFim, link })
                    }
                })

        }
    }

    return events
}

function addCalendarAlert(events) {
    const body = document.getElementsByTagName('body')[0]

    let alert = document.createElement('div')
    let container = document.createElement('div')
    let footer = document.createElement('div')
    let h1 = document.createElement('h1')
    let img = document.createElement('img')
    let span = document.createElement('span')
    let agendamentos = document.createElement('div')

    body.appendChild(alert)
    alert.appendChild(container)
    alert.appendChild(footer)
    footer.appendChild(h1)
    footer.appendChild(span)
    h1.appendChild(img)

    alert.setAttribute('class', 'alert events')
    h1.setAttribute('class', 'icon')
    img.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/3652/3652191.png')
    span.setAttribute('class', 'span')
    span.innerHTML = 'Agendamentos'
    agendamentos.setAttribute('class', 'agendamentos')
    footer.setAttribute('class', 'footer')
    container.setAttribute('class', 'container')

    for (let i = 0; i < events.length; i++) {
        let evento = document.createElement('a')
        let horario = document.createElement('div')
        let pInicio = document.createElement('p')
        let pTermino = document.createElement('p')

        evento.setAttribute('class', 'evento')
        evento.setAttribute('href', `https://suportedti.agu.gov.br/otrs/index.pl?Action=AgentTicketZoom;TicketID=${events[i].link}`)
        evento.setAttribute('target', '_blanck')
        horario.setAttribute('class', 'horario')
        evento.appendChild(horario)

        horario.appendChild(pInicio)
        horario.appendChild(pTermino)

        pInicio.textContent = events[i].horaInicio
        pTermino.textContent = events[i].horaFim

        let titulo = document.createElement('p')
        let estado = document.createElement('p')
        evento.appendChild(titulo)
        evento.appendChild(estado)

        titulo.textContent = events[i].titulo
        estado.textContent = events[i].estado

        agendamentos.appendChild(evento)
    }

    alert.addEventListener('mouseenter', () => {
        container.appendChild(agendamentos)
    }, false)

    alert.addEventListener('mouseleave', () => {
        try {
            container.removeChild(agendamentos)
        } catch (err) {
            console.log('Error: ' + err);
        }
    }, false)
}

if (document.readyState == "loading") document.addEventListener('DOMContentLoaded', init)
else init()