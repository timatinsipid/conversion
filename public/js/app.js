const cadForm = document.querySelector('#cad')
const usdForm = document.querySelector('#usd')
const cadPrice = document.querySelector('#cadPrice')
const usPrice = document.querySelector('#usPrice')
const cadm1 = document.querySelector('#cadmessage1')
const cadm2 = document.querySelector('#cadmessage2')
const usm1 = document.querySelector('#usmessage1')
const usm2 = document.querySelector('#usmessage2')


usdForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = usPrice.value
    const url = "/quote?amount=" + amount
    usm1.textContent = "loading"
    usm2.textContent = ""
    fetch(url)
    .then(response => response.json())
    .then(data => {
            if (data.error) { m1.textContent = data.error }
            else {
                const rate = parseFloat(data.quotes.USDCAD)
                usm1.textContent = "Live Rate " + rate 
                usm2.textContent = "CAD $"+(parseFloat(usPrice.value)*rate).toFixed(2)
            }
        })
})
    

cadPrice.addEventListener('blur', (e) => {
    e.preventDefault();
    const amount = parseFloat(cadPrice.value)
    const tax = amount*0.12
    const total = parseFloat(amount)+parseFloat(tax)
    cadm1.textContent = "Tax amount $" + tax.toFixed(2) 
    cadm2.textContent = "Total after tax $" + total.toFixed(2)
})