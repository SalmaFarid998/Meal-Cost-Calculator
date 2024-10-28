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
        }
        pureRate = attendees*rate
        result = pureRate*(1+vatValue)*(1+serviceValue)*(1+excelValue)
        if (pureRate*(1+serviceValue)>285){
            result = pureRate*(1+vatValue)*(1+serviceValue)*(1+excelValue)
            excelAmount = pureRate*(1+vatValue)*(1+serviceValue)*0.05
        }else{
            result = ((pureRate*(1+serviceValue))+250)*(1+vatValue)
            excelAmount = 250
        }

        details = `Meals: ${attendees*rate}, VAT: ${Math.trunc(attendees*rate*0.14)}, Service: ${Math.ceil(attendees*rate*serviceValue)}, EXCEL: ${Math.ceil(excelAmount)}`

        // if(checkState(service)==true&&checkState(excel)==true){
        //     result= attendees*rate*1.14*0.12
        //     // minimum fees check
        //     if(result*0.05>285){
        //         details = `Meals: ${attendees*rate}, VAT: ${Math.trunc(attendees*rate*0.14)}, Service: ${Math.ceil(attendees*rate*0.12)}, EXCEL: ${Math.ceil(result*0.056)}`
        //         result= Math.ceil(result*1.056)
        //     }else{
        //         details = `Meals: ${attendees*rate}, VAT: ${Math.trunc(attendees*rate*0.14)}, Service: ${Math.ceil(attendees*rate*0.12)}, EXCEL: 285`
        //         result = Math.ceil(result + 285)
        //     }
            display(result);
            displayDetails(details);
            // service only
        // }else if(checkState(service)==true&& checkState(excel)==false){
        //     details = `Meals: ${attendees*rate}, VAT: ${Math.trunc(attendees*rate*0.14)}, Service: ${Math.ceil(attendees*rate*0.12)}`
        //     result= Math.ceil(attendees*rate*1.14+attendees*rate*0.12)
        //     display(result);
        //     displayDetails(details);
        //     //excel only
        // }else if(checkState(service)==false && checkState(excel)==true){
        //     result= attendees*rate*1.14
            
        //     if(result*0.056>285){
        //         details = `Meals: ${attendees*rate}, VAT: ${Math.trunc(attendees*rate*0.14)}, EXCEL: ${Math.ceil(result*0.056)}`
        //         result= Math.ceil(result*1.056)
        //     }else{
        //         details = `Meals: ${attendees*rate}, VAT: ${Math.trunc(attendees*rate*0.14)}, EXCEL: 285`
        //         result = Math.ceil(result + 285)
        //     }
        //     display(result);
        //     displayDetails(details);
        // }else{
        //     //no service or excel
        //     details = `Meals: ${attendees*rate}, VAT: ${Math.trunc(attendees*rate*0.14)}`
        //     result= Math.ceil(attendees*rate*1.14)
        //     display(result);
        //     displayDetails(details);
        // }
    }else{
        // if fields are empty
        details = ""
        error="Enter the meal value and attendees number"
        display(error);
        displayDetails(details);
    }

}
