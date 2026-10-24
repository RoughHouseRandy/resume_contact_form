let addBox = document.getElementById("add");
let radial = document.getElementById("radial");
radial.style.display = "none";

addBox.onchange = () => {
    radial.style.display = "inline";
}

document.getElementById("contact-form").onsubmit = () => {
    let isValid = true;
    
    clearErrors();
    let fname = document.getElementById("fname").value.trim();
    let lname = document.getElementById("lname").value.trim();
    let email = document.getElementById("email").value.trim();
    let meet = document.getElementById("meeting").value;
    let specify = document.getElementById("specify").value.trim();
    
    let linkedInUrl = document.getElementById("linked").value.trim();
    let emailFormatButton = document.getElementsByName("email-format");
    let formatSelected = false;

    const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    const urlRegex = new RegExp(/^(https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?)?$/);

    if(fname === ""){
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    if(lname === ""){
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }
    if(meet === "none"){
        document.getElementById("meet-err").style.display = "block";
        isValid = false;
    }
    if(meet === "other" && specify === ""){
        document.getElementById("other-err").style.display = "block";
        isValid = false;
    }

    if(!urlRegex.test(linkedInUrl) && linkedInUrl !== ""){
        document.getElementById("url-err").style.display = "block";
        isValid = false;
    }

    for(let i = 0; i < emailFormatButton.length; i++){
        if(emailFormatButton[i].checked){
            formatSelected = true;
        }
    }
    if(addBox.checked){
        
    }

    if(addBox.checked && formatSelected === false){
        document.getElementById("email-format-err").style.display = "block";
        isValid = false;
    }
    if(!emailRegex.test(email) && email !== ""){
        document.getElementById("email-err").style.display = "block";
        isValid = false;
    }

    if(formatSelected && (!emailRegex.test(email)|| email === "")){
        document.getElementById("email-err").style.display = "block";
        isValid = false;
    }

    return isValid; 
}

function clearErrors(){
    let errors = document.getElementsByClassName("err");
    for(let i = 0; i < errors.length; i++){
        errors[i].style.display = "none";
    }
}