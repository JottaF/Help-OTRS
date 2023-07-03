import { getChallengeToken, getPanelInfo, getTicket, setPanelInfo } from "./alert";

export function injectPanel() {
  if (!getPanelInfo()) {
    try {
      setPanelInfo(true);
      var challengeToken = getChallengeToken().toString();
      var ticket = getTicket();

      document.getElementsByClassName("alert")[0].classList.add("icPanelAdded");
      document
        .getElementsByClassName("span")[0]
        .classList.add("turnSpanVisible");
      document.getElementsByClassName("icon")[0].classList.add("moveIcon");

      const body = document.getElementsByTagName("body")[0];
      body.insertAdjacentHTML(
        "afterbegin",
        `
            <div class="icPanel">
                <div class="header">
                    <h2 class="title">Adicionar IC</h2>
                </div>
                <div class="options">
                    <button class="button"><a class="linkButton" href="https://suportedti.agu.gov.br/otrs/index.pl?ChallengeToken=${challengeToken}&Action=AgentLinkObject&Mode=Normal&SourceObject=Ticket&SourceKey=${ticket}&TargetIdentifier=ITSMConfigItem%3A%3A139&SEARCH%3A%3ANumber=&SEARCH%3A%3AName=biblioteca&SubmitSearch=Procurar&TypeIdentifier=AlternativeTo%3A%3ASource&SubmitLink=Procurar&AddIc" target="_blanck">Bib. Software</a></button>
                    <button class="button"><a class="linkButton" href="https://suportedti.agu.gov.br/otrs/index.pl?ChallengeToken=${challengeToken}&Action=AgentLinkObject&Mode=Normal&SourceObject=Ticket&SourceKey=${ticket}&TargetIdentifier=ITSMConfigItem%3A%3A168&SEARCH%3A%3ANumber=&SEARCH%3A%3AName=SDFURA0031&SubmitSearch=Procurar&TypeIdentifier=AlternativeTo%3A%3ASource&SubmitLink=Procurar&AddIc" target="_blanck">Reset de senha</a></button>
                    <button class="button"><a class="linkButton" href="https://suportedti.agu.gov.br/otrs/index.pl?ChallengeToken=${challengeToken}&Action=AgentLinkObject&Mode=Normal&SourceObject=Ticket&SourceKey=${ticket}&TargetIdentifier=ITSMConfigItem%3A%3A168&SEARCH%3A%3ANumber=&SEARCH%3A%3AName=SDF0432&SubmitSearch=Procurar&TypeIdentifier=AlternativeTo%3A%3ASource&SubmitLink=Procurar&AddIc" target="_blanck">Alt. na conta</a></button>
                    <button class="button"><a class="linkButton" href="https://suportedti.agu.gov.br/otrs/index.pl?ChallengeToken=${challengeToken}&Action=AgentLinkObject&Mode=Normal&SourceObject=Ticket&SourceKey=${ticket}&TargetIdentifier=ITSMConfigItem%3A%3A168&SEARCH%3A%3ANumber=&SEARCH%3A%3AName=SDF0814+&SubmitSearch=Procurar&TypeIdentifier=AlternativeTo%3A%3ASource&SubmitLink=Procurar&AddIc" target="_blanck">Desativar conta</a></button>
                    <button class="button"><a class="linkButton" href="https://suportedti.agu.gov.br/otrs/index.pl?ChallengeToken=${challengeToken}&Action=AgentLinkObject&Mode=Normal&SourceObject=Ticket&SourceKey=${ticket}&TargetIdentifier=ITSMConfigItem%3A%3A168&SEARCH%3A%3ANumber=&SEARCH%3A%3AName=SDFURA0117&SubmitSearch=Procurar&TypeIdentifier=AlternativeTo%3A%3ASource&SubmitLink=Procurar&AddIc" target="_blanck">Criar conta</a></button>
                    <button class="button"><a class="linkButton" href="https://suportedti.agu.gov.br/otrs/index.pl?Action=AgentLinkObject;SourceObject=Ticket;SourceKey=${ticket}" target="_blanck">Inserir manual</a></button>
                </div>
            </div>
            `
      );
    } catch (e) {
      console.log("Erro ao injetar painel: ", e);
    }
  } else {
    try {
      setPanelInfo(false);
      document
        .getElementsByClassName("alert")[0]
        .classList.remove("icPanelAdded");
      document
        .getElementsByClassName("span")[0]
        .classList.remove("turnSpanVisible");
      document.getElementsByClassName("icon")[0].classList.remove("moveIcon");
      document.getElementsByClassName("icPanel")[0].remove();
    } catch (e) {
      console.log("Erro ao remover o painel: ", e);
    }
  }
}
