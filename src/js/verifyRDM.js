async function getRDMLinks(url) {
    const response = await fetch(url)
    const html = await response.text()
    const parser = new DOMParser()
    const document = parser.parseFromString(html, 'text/html')

    const elements = document.querySelectorAll('.AsBlock.LinkObjectLink')
    const links = Array.from(elements).map(element => {
        if (element.title.includes('Chamado')) { 
            return element.href 
        }
        return null
    }).filter(title => title != null)

    return links
}

async function getRDMInfo(url) {
    try {
        const response = await fetch(url)
        const html = await response.text()
        const parser = new DOMParser()
        const document = parser.parseFromString(html, 'text/html')

        const tables = document.querySelectorAll('.DataTable')
        const span = tables[tables.length -1].getElementsByTagName('span')[1]

        return span.textContent
    } catch {}
}

function trEventlistener(table) {
    try {
        const contextMenu = document.getElementById('context-menu')

        Array.from(table.getElementsByTagName('tr')).forEach((element) => {
            element.addEventListener('contextmenu', e => {
                e.preventDefault()

                document.querySelector('#load-rdm').addEventListener('click', () => {
                    showRDMInfo(element)
                })

                contextMenu.style.left = `${e.clientX}px`
                contextMenu.style.top = `${e.clientY + window.scrollY}px`
                contextMenu.style.display = 'block'

                element.removeEventListener('contextmenu', ()=>{})
            })

            document.addEventListener('click', () => {
                contextMenu.style.display = 'none'

                document.querySelector('#load-rdm').addEventListener('click', () => { })
            })
        })
    } catch {}
}

async function showRDMInfo(element) {
    try {
        if (!element.getAttribute('rdm-info')) {
            const info = await getRDMInfo(element.getElementsByTagName('a')[0].href)
    
            Array.from(element.getElementsByTagName('div')).forEach(div => {
                if (div.textContent == 'Pendente da Mudança') {
                    div.textContent += `: ${info}`
                    element.setAttribute('rdm-info', true)
                }
            })
        }
    } catch {}
}

export function tableObserver() {
    try {
        const table = document.querySelector('#Dashboard9906-Chamados-Pendentes-box')
        trEventlistener(table)

        // Cria uma nova instância do MutationObserver
        const observer = new MutationObserver(() => {
            trEventlistener(table)
        })

        // Define as opções do MutationObserver
        const config = { attributes: true, childList: true, subtree: true }

        // Inicia a observação do elemento HTML com as opções definidas
        observer.observe(table, config)
    } catch {}
}

export function injectContextMenu() {
    const html = `
    <div id="context-menu">
    <ul>
        <li id="load-rdm">Carregar estado da RDM</li>
    </ul>
    </div>
    `

    const body = document.getElementsByTagName('body')[0]
    body.insertAdjacentHTML('beforeend', html)
}