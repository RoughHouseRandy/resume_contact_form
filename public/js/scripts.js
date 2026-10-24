//variables to hold the checkbox and hide radio options 
let addBox = document.getElementById("add");
let radial = document.getElementById("radial");
radial.style.display = "none";

//event listener to display radio buttons when the add box is checked
addBox.onchange = () => {
    radial.style.display = "inline";
}

//event listener for submit button
document.getElementById("contact-form").onsubmit = () => {
    let isValid = true;

    //clears errors when input conditions are satisfied.
    clearErrors();

    //variables to hold input element values
    let fname = document.getElementById("fname").value.trim();
    let lname = document.getElementById("lname").value.trim();
    let email = document.getElementById("email").value.trim();
    let meet = document.getElementById("meeting").value;
    let specify = document.getElementById("specify").value.trim();
    let linkedInUrl = document.getElementById("linked").value.trim();
    let emailFormatButton = document.getElementsByName("email-format");
    let formatSelected = false;

    //Regex formats for email and url inputs
    const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    const urlRegex = new RegExp(/^(https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?)?$/);

    //Checks if first name field is empty
    if(fname === ""){
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    //Checks if last name field is empty
    if(lname === ""){
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    //checks if the select element is on the default value
    if(meet === "none"){
        document.getElementById("meet-err").style.display = "block";
        isValid = false;
    }

    //checks if the other option is selected and if the other input is empty
    if(meet === "other" && specify === ""){
        document.getElementById("other-err").style.display = "block";
        isValid = false;
    }

    //checks to see if the url is correct and if the input is not empty
    if(!urlRegex.test(linkedInUrl) && linkedInUrl !== ""){
        document.getElementById("url-err").style.display = "block";
        isValid = false;
    }

    //checks if any of the email buttons are checked.
    for(let i = 0; i < emailFormatButton.length; i++){
        if(emailFormatButton[i].checked){
            formatSelected = true;
        }
    }

    //checks to see if the add to mailing box is checked and if the format wasn't selected
    if(addBox.checked && formatSelected === false){
        document.getElementById("email-format-err").style.display = "block";
        isValid = false;
    }

    //checks to see if the email format is correct and if the email format is not empty
    if(!emailRegex.test(email) && email !== ""){
        document.getElementById("email-err").style.display = "block";
        isValid = false;
    }

    //checks to see if a format option was checked and if the email format is correct or the email input is empty
    if(formatSelected && (!emailRegex.test(email)|| email === "")){
        document.getElementById("email-err").style.display = "block";
        isValid = false;
    }

    //returns true if all checks are passed
    return isValid; 
}

// function to clear errors
function clearErrors(){
    let errors = document.getElementsByClassName("err");
    for(let i = 0; i < errors.length; i++){
        errors[i].style.display = "none";
    }
}