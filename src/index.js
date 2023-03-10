import { addICAlert, homePageVerifier, icVerifier, pageVerifier } from './js/alert'
import { addCalendarAlert, getEvents } from './js/calendar'
import { AddTeamsLink } from './js/chatWithUser'
import { tableObserver, injectContextMenu } from './js/verifyRDM'


function init() {
    const content = document.querySelectorAll(".WidgetSimple .Header")

    const isIcAdded = icVerifier(content)
    const isCorrectPage = pageVerifier()

    if (isCorrectPage) {
        setTimeout(() => {
            AddTeamsLink()
        }, 1000)

        if (!isIcAdded)
            addICAlert()
    }

    if (homePageVerifier) {
        injectContextMenu()
        tableObserver()

        const events = getEvents()
        if (events.length > 0)
            addCalendarAlert(events)
    }
}


if (document.readyState == "loading") document.addEventListener('DOMContentLoaded', init)
else init()