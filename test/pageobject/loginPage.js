class LoginPage {
    get submitButton() { return $('button#SubmitLogin > span'); }
    get passwordField() {return $('input#passwd');}
    get emailField() {return $('input#email');}
}

module.exports = new LoginPage;