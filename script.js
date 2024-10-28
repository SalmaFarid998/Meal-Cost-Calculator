let rate = Number(document.getElementById('meal-rate').value)
let attendees = Number(document.getElementById('attendees').value)
let service = document.getElementById('service')
let excel = document.getElementById('excel')
let resultBox = document.getElementById('result')
let detailsBox = document.getElementById('details')
let form = document.getElementById("form")
form.addEventListener("submit", function(e){e.preventDefault()})
form.addEventListener("click", calc)
document.getElementById('meal-rate').addEventListener("keyup",calc)
document.getElementById('attendees').addEventListener("keyup",calc)
service.addEventListener("click", toggleService)
excel.addEventListener("click", toggleExcel)



function toggleService(){
    service.classList.toggle('checked')
}
function toggleExcel(){
    excel.classList.toggle('checked')
}

function checkState(x){
   return x.classList.contains("checked")
}

function display(result){
    resultBox.innerHTML= `${result}`
}
function displayDetails(details){
    detailsBox.innerHTML = `${details}`
}

function calc(){
    resultBox.innerHTML= ""
    rate = Number(document.getElementById('meal-rate').value)
    attendees = Number(document.getElementById('attendees').value)
    service = document.getElementById('service')
    excel = document.getElementById('excel')
    // if fields are not empty
    if (rate != 0&&attendees!=0){
        // Excel and service 
        vatValue = 0.14
        
        if (checkState(service)){
            serviceValue = 0.12
        }else{
            serviceValue = 0
        }
        if (checkState(excel)){
            excelValue = 0.05
        }else{
            excelValue = 0
            excelAmount = 0
        }
        pureRate = attendees*rate
        result = Math.trunc(pureRate*(1+vatValue)*(1+serviceValue)*(1+excelValue))
        
        
        if (checkState(excel)){
            excelValue = 0.05
            if (pureRate*(1+serviceValue)*0.05>285){
                result = Math.trunc(pureRate*(1+vatValue)*(1+serviceValue)*(1+excelValue))
                excelAmount = pureRate*(1+serviceValue)*0.05
            }else{
                result = Math.trunc(((pureRate*(1+serviceValue))+250)*(1+vatValue))
                excelAmount = 250
            }
        }else{
            excelValue = 0
            excelAmount = 0
        }
        details = `Meals: ${pureRate}, Service: ${Math.trunc(pureRate*serviceValue)}, EXCEL: ${Math.trunc(excelAmount)}, VAT: ${Math.trunc(((pureRate*(1+serviceValue))+excelAmount)*vatValue)}`

 
            display(result);
            displayDetails(details);

    }else{
        // if fields are empty
        details = ""
        error="Enter the meal value and attendees number"
        display(error);
        displayDetails(details);
    }

}
