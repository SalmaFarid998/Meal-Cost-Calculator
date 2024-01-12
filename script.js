let rate = Number(document.getElementById('meal-rate').value)
let attendees = Number(document.getElementById('attendees').value)
let service = document.getElementById('service')
let excel = document.getElementById('excel')
let resultBox = document.getElementById('result')
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
                result= Math.ceil(result*1.056)
            }else{
                result = Math.ceil(result + 285)
            }
            display(result)
        }else if(checkState(service)==true&& checkState(excel)==false){
            result= Math.ceil(attendees*rate*1.14+attendees*rate*0.12)
            display(result)
        }else if(checkState(service)==false && checkState(excel)==true){
            result= attendees*rate*1.14
            
            if(result*0.056>285){
                result= Math.ceil(result*1.056)
            }else{
                result = Math.ceil(result + 285)
            }
            display(result)
        }else{
            result= Math.ceil(attendees*rate*1.14)
            display(result)
        }
    }else{
        error="Enter the meal value and attendees number"
        display(error)
    }

}
