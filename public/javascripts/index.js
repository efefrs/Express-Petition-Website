const User = require('../models/User');

function appendAlert(message, type) {
    const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("")
  
    alertPlaceholder.append(wrapper)
  }

function validateEmail() {
    const email = document.getElementById("email").value;
    console.log(email);
    const atCheck = email.includes("@");
    const nameCheck = email.substr(0, email.indexOf('.'));
    const comCheck = email.endsWith(".com");
    if (!email) {
        appendAlert("Must include an email!", "danger");
        return false;
    } else if (!atCheck) {
        appendAlert("Invalid email! Missing @ symbol", "danger")
        return false;
    } else if (nameCheck < 5 || nameCheck > 20) {

        appendAlert("Invalid email! Name must be 5-20 characters followed by a period", "danger")
        return false;
    } else if (!comCheck) {
        appendAlert("Invalid email! Missing .com", "danger")
        return false;
    }
    else {
        return true;
    }
}

async function sqlSearchEmail(email) {
    console.log("hello");
    const user = await User.findEmail(email);
    if (user !== null) {
        return false;
    } else {
        return true;
    }
}

function validateCredentials() {
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const firstnameCheck = firstname.length;
    const lastnameCheck = lastname.length;
    if (!firstname) {
        appendAlert("Must include a first name!", "danger");
        return false;
    } else if (firstnameCheck < 5 || firstnameCheck > 20) {
        appendAlert("Invalid first name! Name must be 5-20 characters", "danger")
        return false;
    } else if (!lastname) {
        appendAlert("Must include a last name!", "danger");
        return false;
    } else if (lastnameCheck < 5 || lastnameCheck > 20) {
        appendAlert("Invalid last name! Name must be 5-20 characters", "danger")
        return false;
    } else if (!validateEmail()){
        return false;
    } else {
        if (!sqlSearchEmail(email)) {
            appendAlert("Email already used!", "danger");
            return false;
        } else {
            return true;
        }
    }
}

// at least 5 characters for the first and last name
// check midterm submission ^