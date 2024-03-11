export function Search() {
  let a = document.createElement('a')
  a.innerHTML = 'Abrir chamado'
  a.style = 'margin-left: .5rem; display: none; background-color: gray; padding: 0.4rem; border-radius: 2px; color: white; cursor: pointer; transition: all; height: auto; width: auto; text-indent: 0;'

  let input = document.createElement('input')
  input.type = 'text'
  input.placeholder = 'Chamado#'
  input.id = 'SearchCalled'
  input.size = 10
  input.title = 'Pesquisar chamado'
  input.style = 'margin-left: .5rem;'
  input.oninput = () => {
    if (input.value.trim().length < 8) {
      if (a.style.display !== 'none') {
        a.style.display = 'none'
        a.href = ''
      }
    } else {
      if (parseInt(input.value) < 96000025) {
        alert('Não é possível acessar esse chamado')
      } else {
        a.style.display = 'block'
        let ticketId = parseInt(input.value) - 96000025
        a.href = `https://suportedti.agu.gov.br/otrs/index.pl?Action=AgentTicketZoom;TicketID=${ticketId}`
      }
    }
  }

  try {
    const form = document.querySelector('#CISearch')
    form.appendChild(input)
    form.appendChild(a)
  } catch {}
}