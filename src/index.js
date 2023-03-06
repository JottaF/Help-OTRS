import { addICAlert, homePageVerifier, icVerifier, pageVerifier } from './js/alert'
import { addCalendarAlert, getEvents } from './js/calendar'
import { AddTeamsLink } from './js/chatWithUser'


function init() {
    const content = document.querySelectorAll(".WidgetSimple .Header")

    const isIcAdded = icVerifier(content)
    const isCorrectPage = pageVerifier()

    if (isCorrectPage) {
        setTimeout(() => {
            console.log('link');
            AddTeamsLink()
        }, 1000)

        if (!isIcAdded)
            addICAlert()
    }
    console.log('reste');

    const events = getEvents()
    console.log(events);
    if (homePageVerifier && events.length > 0) {
        addCalendarAlert(events)
    }
}


if (document.readyState == "loading") document.addEventListener('DOMContentLoaded', init)
else init()