class FormPage {    
    get passwordField() {return $('input#passwd');}
    get emailField() {return $('input#email');}

    get rutField() { return $('input[name="rut"][type="text"]'); }
    get phoneNumberField() {return $('input[name="telephone"][type="tel"]');}
    get submitButton() {return $('button[type="submit"]');}
    get cancelButton() {return  $('button[type="reset"]');}
    get sectorsOfInterest() {return $$('div.custom-control');}
    get locationField() {return $('input[class="form-control"][type="text"]');}

    get dateField() {return $('input[name="date"][type="text"]');}
    get dateYear() {return $('a.mx-icon-last-year');}
    get dateMonth() {return $('a.mx-icon-last-month');}
    get dateDays() {return $$('td.cur-month');}

    get elementForScroll() {return $('img[class="img-fluid w-100"]');}
}

module.exports = new FormPage;