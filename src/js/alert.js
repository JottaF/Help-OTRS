"use strict";

import { injectPanel } from "./injectPanel";

let isPanelAdded = false;

export function getTicket() {
  try {
    const ticket = window.location.href.split("TicketID=")[1];

    if (ticket.length > 6) {
      return ticket.slice(0, 6);
    }

    return ticket;
  } catch (error) {
    console.log(error);
  }
}

export function getChallengeToken() {
  try {
    const logoutButton = document.getElementsByClassName("LogoutButton")[0];
    const challengeToken = logoutButton.href
      .toString()
      .split("ChallengeToken=")[1];
    return challengeToken.replace(";", "");
  } catch (error) {
    console.log(error);
  }
}

export function addICAlert() {
  const body = document.getElementsByTagName("body")[0];
  const ticket = getTicket();

  body.insertAdjacentHTML(
    "afterbegin",
    `
        <div class="alert">
            <h1 class="icon">!</h1>
            <span class="span">
                IC Não Associado!
            </span>
        </div>
    `
  );

  const alert = document.getElementsByClassName("alert")[0];
  alert.addEventListener("click", injectPanel);
}

export function pageVerifier() {
  try {
    return document
      .querySelector(".Headline")
      .querySelector("h1")
      .textContent.includes("Chamado#");
  } catch (error) {}
}

export function icVerifier(content) {
  let isIcAdded = false;

  for (let i = 0; i < content.length; i++) {
    try {
      if (
        content[i]
          .getElementsByTagName("h2")[0]
          ?.textContent.toString()
          .includes("ConfigItem")
      ) {
        isIcAdded = true;
      }
    } catch (err) {
      console.log("icVerifier error: " + err);
    }
  }
  return isIcAdded;
}

export function homePageVerifier() {
  try {
    return document.querySelector('#nav-Dashboard').classList.contains('Selected')
  } catch (error) {
    return false;
  }
}

export function getPanelInfo() {
  return isPanelAdded;
}

export function setPanelInfo(state) {
  isPanelAdded = state;
}

export function addNoteLink() {
  window.onload = () => {
    try {
      let link = document.querySelector('#nav-Note').querySelector('a').href
      console.log(link);
      if (link) {
        let li = document.createElement('li')
        let a = document.createElement('a')
  
        a.href = link.replace('Zoom', 'Note') + ';AddNoteAuto'
        a.textContent = 'Em atendimento'
        li.append(a)
        document.querySelector('.Actions').append(li)
      }
    } catch (error) {
      console.log('Não foi possível criar o link "Em atendimento".', error)
    }
  }
}