export function removeInService() {
  document.querySelectorAll(".MasterAction").forEach((e) => {
    try {
      if (
        e != undefined &&
        e.children[8].textContent.includes("Em Atendimento")
      ) {
        e.remove();
      }
    } catch (err) {
      console.warn(err);
    }
  });
}

export function createRemoveInServiceLink() {
  try {
    const ul = document.querySelectorAll(".Tab.Actions")[0];
    const p = document.createElement("p");
    p.id = "removeInService";
    p.textContent = "Remover Em Atendimento";
    p.style = "color: gray;cursor: pointer;";

    const li = document.createElement("li");
    li.appendChild(p);

    ul.appendChild(li);

    p.addEventListener("click", () => {
      removeInService();
    });
  } catch (err) {
    console.warn(err);
  }
}

export function removeInServiceObserver() {
  // Seleciona o elemento que você quer observar
  const targetNode = document.getElementById("Dashboard9902-Chamados-N2");

  // Define quais tipos de mutações você quer observar
  const config = { childList: true };

  // Callback que será executado quando uma mutação for detectada
  const callback = function (mutationsList, observer) {
    createRemoveInServiceLink()
  };

  // Cria uma instância de MutationObserver ligada ao callback
  const observer = new MutationObserver(callback);

  // Começa a observar o elemento alvo com as configurações definidas
  observer.observe(targetNode, config);

  // Para parar de observar em algum momento, você pode usar:
  // observer.disconnect();
}
