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
            function showRDMInfoAndCloseContextMenu() {
                showRDMInfo(element)
                element.setAttribute('rdm-info', true)
                contextMenu.style.display = 'none'
            }

            element.addEventListener('contextmenu', e => {
                e.preventDefault()

                document.querySelector('#load-rdm').onclick = showRDMInfoAndCloseContextMenu

                contextMenu.style.left = `${e.clientX}px`
                contextMenu.style.top = `${e.clientY + window.scrollY}px`
                contextMenu.style.display = 'block'

                document.addEventListener('click', hideContextMenu)
            })

            function hideContextMenu() {
                contextMenu.style.display = 'none'
                document.removeEventListener('click', hideContextMenu)
            }
        })
    } catch {}
}


async function showRDMInfo(element) {
    try {
        if (!element.getAttribute('rdm-info')) {
            const span = document.createElement('span')
            span.className = 'loader'
            
            const div = Array.from(element.getElementsByTagName('div')).find((e) => e.textContent === 'Pendente da Mudança')
            div.insertAdjacentElement('beforeend', span)

            const info = await getRDMInfo(element.getElementsByTagName('a')[0].href)

            span.className = 'info'
            span.textContent = `: ${info}`
        }
    } catch {}
}

export function addVerifyAllLink(table) {
    try {
        const ul = document.querySelectorAll('.Tab.Actions')[1]
        const table = document.querySelector('#Dashboard9906-Chamados-Pendentes-box')

        if (ul.children.length == 4) {
            const p = document.createElement('p')
            p.textContent = "Carregar todas as RDM's"
            p.style = "color: gray;cursor: pointer;"

            const li = document.createElement('li')
            li.appendChild(p)

            ul.appendChild(li)

            p.addEventListener('click', () => {
                Array.from(table.getElementsByTagName('tr')).forEach((element) => {
                    showRDMInfo(element)
                })
            })
        }
    } catch {}
}