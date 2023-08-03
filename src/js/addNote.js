import { addVerifyAllLink } from "./verifyRDM";

export function addNote() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.querySelector('#NewStateID').querySelectorAll('option').forEach(element => {
                if (element.value == 14) {
                    element.selected = true

                    document.querySelector('#Subject').setAttribute('value', 'Em atendimento')
                    document.querySelector('#Subject').textContent = 'Em atendimento'
            
                    const iframe = document.querySelector('#cke_RichText').querySelector('iframe')
                    const doc = iframe.contentDocument.querySelector('.cke_editable.cke_editable_themed.cke_contents_ltr.cke_show_borders')
                    doc.textContent = 'Em atendimento'
            
                    document.querySelector('#submitRichText').click()
                }
            })  
        }, 1500);
    });
}

function trEventlistener(table) {
    try {
        const contextMenu = document.getElementById('context-menu')

        Array.from(table.getElementsByTagName('tr')).forEach((element) => {
            function showRDMInfoAndCloseContextMenu() {
                contextMenu.style.display = 'none'
                document.querySelector('#link-chamado').removeAttribute('href')
            }
            
            element.addEventListener('contextmenu', e => {
                e.preventDefault()
                
                document.querySelector('#load-page').onclick = showRDMInfoAndCloseContextMenu

                const url = element.querySelector('.AsBlock.MasterActionLink').href.replace('Zoom', 'Note')  + ';AddNoteAuto'
                document.querySelector('#link-chamado').setAttribute('href', url)

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
    } catch (error) {
        console.log('Erro no trEventlistener:', error)
    }
}

export function tableObserver() {
    const tables = [document.querySelector('#Dashboard9902-Chamados-N2'), document.querySelector('#Dashboard9906-Chamados-Pendentes')]
    Array.from(tables).forEach(table => {
        try {
            trEventlistener(table)
            addVerifyAllLink(table)
    
            // Cria uma nova instância do MutationObserver
            const observer = new MutationObserver(() => {
                trEventlistener(table)
                addVerifyAllLink(table)
            })
    
            // Define as opções do MutationObserver
            const config = { attributes: true, childList: true, subtree: true }
    
            // Inicia a observação do elemento HTML com as opções definidas
            observer.observe(table, config)
        } catch (error) {
            console.log('Erro no Observer:', error)
        }
    })
}

export function injectContextMenu() {
    const html = `
    <div id="context-menu">
        <ul id="menu-list">
            <li id="load-page"><a id="link-chamado" target="_blank">Em atendimento</a></li>
        </ul>
    </div>
    `

    const body = document.getElementsByTagName('body')[0]
    body.insertAdjacentHTML('beforeend', html)
}