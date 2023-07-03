export function icPageVerifier() {
    try {
        return document.querySelector('#LinkAddCloseLink') != null
    }   catch (error) {
        console.log(error);
    }
}

export function addIc() {
    if (document.getElementsByClassName('MessageBox Info').length == 0){
        if (document.URL.includes('AddIc')) {
            document.getElementById('LinkTargetKeys').click()
            document.getElementById('AddLinks').click()

            const body = document.querySelector('body')
            body.insertAdjacentHTML('afterbegin', 
            `
            <div class="loading">
                <span class="loader"></span>
            </div>
            `)
        }
    
    } else  {
        window.close()
    }
}