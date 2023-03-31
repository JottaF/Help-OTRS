function convertDate(hour) {
    const splitHour = hour.split(':')
    return new Date().setHours(splitHour[0],splitHour[1])
}

export function getEvents() {
    const today = new Date()
    const eventDetails = document.getElementsByClassName('EventDetails')
    const events = []

    for (let i = 0; i < eventDetails.length; i++) {
        const details = eventDetails[i].getElementsByClassName('Value')

        if (today.toLocaleDateString() == details[9].textContent.split(' ')[0]) {
            const estado = details[5].textContent
            const titulo = details[6].textContent
            const inicio = details[8].textContent.split(' ')[1]
            const termino = details[9].textContent.split(' ')[1]
            const link = eventDetails[i].getAttribute('id').split('-')[2]

            let minsToStart = (convertDate(inicio) - today.getTime()) / 1000 / 60
            console.log(titulo, inicio, minsToStart, convertDate(inicio), today);

            if (estado == 'Aguardando Validação' || estado == 'Em Atendimento') {
                console.log('if 1');
                continue
            }
            if (minsToStart >= 15) {
                console.log('if 2');
                continue
            }

            events.push({ estado, titulo, inicio, termino, link })
            

        }
    }
    return events.sort((a, b) => a.inicio.localeCompare(b.inicio))
}

export function addCalendarAlert(events) {
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

        pInicio.textContent = events[i].inicio
        pTermino.textContent = events[i].termino

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