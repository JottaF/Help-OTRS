function getInfo(count = 1) {
    if (count == 10) {
        return null
    }

    let regex = /([0-9]+)/i
    const h1Chamado = document.querySelector('.Headline').querySelector('h1').textContent
    const numChamado = regex.exec(h1Chamado)[0]

    regex = /([A-Za-z]+( [A-Za-z]+)+)/i;
    const divTecName = document.querySelector('.UserAvatar').querySelector('div').textContent
    const tecName = regex.exec(divTecName)[0]

        let userName = ''
        let userEmail = ''

        const labels = document.querySelectorAll('label')

        for (let i = 0; i < labels.length; i++) {
            if (labels[i].textContent == 'Nome Completo:') {
                userName = labels[i].nextElementSibling.title
            }
            if (labels[i].textContent == 'E-mail:') {
                userEmail = labels[i].nextElementSibling.title
            }
        }

        if (userName == '' || userEmail == '') {
            setTimeout(function(){}, 1500)
            return getInfo(count++)
        }

        regex = /—\s(.*)/i
        const subject = regex.exec(h1Chamado)[1]

        return { numChamado, tecName, userName, userEmail, subject }
}

export function AddTeamsLink() {
    const {userEmail, userName, tecName, numChamado, subject} = getInfo()

    const label = document.createElement('label')
    label.textContent = 'Teams:'

    const p = document.createElement('p')
    p.title = 'Link para conversa no Teams'
    p.className = 'Value FixedValueSmall'

    const a = document.createElement('a')

    let greeting
    const currentHour = new Date().getHours()

    if (currentHour > 5 && currentHour < 12) {
        greeting = 'Bom dia'
    } else if (currentHour < 18) {
        greeting = 'Boa tarde'
    } else {
        greeting = 'Boa noite'
    }

    a.href = `https://teams.microsoft.com/l/chat/0/0?users=${userEmail}&message=${greeting} Sr(a) ${userName}! Meu nome é ${tecName}, Técnico de Suporte da Empresa Hepta. O motivo do meu contato é referente ao Chamado ${numChamado}, com assunto: ${subject}.`
    a.textContent = 'Conversar no Teams'
    a.target = '_blank'

    p.insertAdjacentElement('afterbegin', a)

    const div = document.createElement('div')
    div.className = 'Clear'

    const tables = document.getElementsByClassName('TableLike FixedLabelSmall Narrow')
    tables[tables.length - 1].insertAdjacentElement('afterbegin', label)
    label.insertAdjacentElement('afterend', p)
    p.insertAdjacentElement('afterend', div)
}