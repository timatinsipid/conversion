const cadForm = document.querySelector('#cad')
const usdForm = document.querySelector('#usd')
const cadPrice = document.querySelector('#cadPrice')
const usPrice = document.querySelector('#usPrice')
const cadm1 = document.querySelector('#cadmessage1')
const cadm2 = document.querySelector('#cadmessage2')
const currentRate = document.querySelector('#currentRate')
const currentRateForm = document.querySelector('#currentRateForm')
const usmessage = document.querySelector('#usmessage')

currentRateForm.addEventListener('submit', (rateEvent) => {
    rateEvent.preventDefault();
    const url = "/quotetest?amount=" + usPrice.value
    currentRate.textContent = "Updating"
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) { m1.textContent = data.error }
            else {
                const rate = parseFloat(data.quotes.USDCAD)
                currentRate.textContent = rate
            }
        })
})

usdForm.addEventListener('submit', (usEvent) => {
    usEvent.preventDefault();
    const amount = parseFloat(usPrice.value)
    const rate = currentRate.textContent
    const finalValue = (amount * rate).toFixed(2)
    usmessage.textContent = "CAD $" + finalValue
})


cadPrice.addEventListener('blur', (cadEvent) => {
    cadEvent.preventDefault();
    const amount = parseFloat(cadPrice.value)
    const tax = amount * 0.12
    const total = parseFloat(amount) + parseFloat(tax)
    cadm1.textContent = "Tax amount $" + tax.toFixed(2)
    cadm2.textContent = "Total after tax $" + total.toFixed(2)
})