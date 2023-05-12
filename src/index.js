import { addICAlert, homePageVerifier, icVerifier, pageVerifier } from './js/alert'
import { addCalendarAlert, getEvents } from './js/calendar'
import { AddTeamsLink } from './js/chatWithUser'
import { icPageVerifier, addIc } from './js/addIc'
import { addNote, injectContextMenu, tableObserver } from './js/addNote'


function init() {
    const content = document.querySelectorAll(".WidgetSimple .Header")

    const isIcAdded = icVerifier(content)
    const isCallingPage = pageVerifier()
    const isIcPage = icPageVerifier()
    const isHomePage = homePageVerifier()
    
    if (isCallingPage) {
        setTimeout(() => {
            AddTeamsLink()
        }, 1000)
        
        if (!isIcAdded)
        addICAlert()
    }
    
    if (isHomePage) {
        injectContextMenu()
        tableObserver()
        
        const events = getEvents()
        if (events.length > 0)
        addCalendarAlert(events)
    }
    
    if (isIcPage) {
        try {
            addIc()
        } catch (e) {
            console.log('Erro ao adicionar IC: ',e);
        }
    }

    const isNotePage = document.URL.includes('AddNoteAuto')
    if (isNotePage) {
        addNote()
    }
}


if (document.readyState == "loading") document.addEventListener('DOMContentLoaded', init)
else init()