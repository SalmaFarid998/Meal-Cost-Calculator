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
    
    if (rate != 0&&attendees!=0){
        if(checkState(service)==true&&checkState(excel)==true){
            result= attendees*rate*1.14+attendees*rate*0.12
            if(result*0.056>285){
                details = `Meals: ${attendees*rate}, VAT: ${Math.trunc(attendees*rate*0.14)}, Service: ${Math.ceil(attendees*rate*0.12)}, EXCEL: ${Math.ceil(result*0.056)}`
                result= Math.ceil(result*1.056)
            }else{
                details = `Meals: ${attendees*rate}, VAT: ${Math.trunc(attendees*rate*0.14)}, Service: ${Math.ceil(attendees*rate*0.12)}, EXCEL: 285`
                result = Math.ceil(result + 285)
            }
            display(result);
            displayDetails(details);
        }else if(checkState(service)==true&& checkState(excel)==false){
            details = `Meals: ${attendees*rate}, VAT: ${Math.trunc(attendees*rate*0.14)}, Service: ${Math.ceil(attendees*rate*0.12)}`
            result= Math.ceil(attendees*rate*1.14+attendees*rate*0.12)
            display(result);
            displayDetails(details);
        }else if(checkState(service)==false && checkState(excel)==true){
            result= attendees*rate*1.14
            
            if(result*0.056>285){
                details = `Meals: ${attendees*rate}, VAT: ${Math.trunc(attendees*rate*0.14)}, EXCEL: ${Math.ceil(result*0.056)}`
                result= Math.ceil(result*1.056)
            }else{
                details = `Meals: ${attendees*rate}, VAT: ${Math.trunc(attendees*rate*0.14)}, EXCEL: 285`
                result = Math.ceil(result + 285)
            }
            display(result);
            displayDetails(details);
        }else{
            details = `Meals: ${attendees*rate}, VAT: ${Math.trunc(attendees*rate*0.14)}`
            result= Math.ceil(attendees*rate*1.14)
            display(result);
            displayDetails(details);
        }
    }else{
        error="Enter the meal value and attendees number"
        display(error)
    }

}
