const myModal = new bootstrap.Modal('#register-modal');
const session = localStorage.getItem('session');
let logged = sessionStorage.getItem('logged');

chechLogged();

// LOGAR NO SISTEMA
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const checkSession = document.getElementById('session-check').checked;

    const account = getAccount(email);

    if(!account) {
        alert('Ops! Verifique o usuário ou a senha.');
        return;
    }

    if(account) {
        if(account.password !== password) {
            alert('Ops! Verifique o usuário ou a senha.');
            return;
        }

        saveSession(email, checkSession);

        window.location.href = 'home.html';
    }
})

//CRIAR CONTA
document.getElementById('create-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email-create-input').value;
    const password = document.getElementById('password-create-input').value;
    const passwordConfirm = document.getElementById('password-create-confirme').value;

    if(email.length < 5) {
        alert('Preencha o campo com um email valido.')
        return
    }

    if(password.length < 4) {
        alert('Preencha a senha com no mínimo 4 digitos.')
        return
    }

    if(passwordConfirm !== password) {
        alert('Ops! as senhas precisam ser iguais.');
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();

    alert('Conta criada com sucesso.');

});

function chechLogged() {
    if(session) {
        sessionStorage.setItem('logged', session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = 'home.html'
    }
}
function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data,saveSession) {
    if(saveSession) {
        localStorage.setItem('session', data);
    }

    sessionStorage.setItem('logged', data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return '';
}