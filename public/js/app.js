const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#message1')
const m2 = document.querySelector('#message2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    const url = "http://localhost:3000/weather?address=" + location
    m1.textContent = "loading"
    m2.textContent = ""
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) { m1.textContent = data.error }
            else {
                m1.textContent = data.location
                m2.textContent = data.forecast
            }
        })
    })
})