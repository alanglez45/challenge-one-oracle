// Elements

// TextArea for typing
const inputText = document.querySelector('.input-text');
// TextArea for showing text
const outputText = document.querySelector('.output-text');
// Buttons
const btnEncriptar = document.querySelector('.btn-encriptar');
const btnDesencriptar = document.querySelector('.btn-desencriptar');
const btnCopy = document.querySelector('.btn-copiar');

// elements container for inserting a new node
const contenedor = document.querySelector('.contenedor');
const divBotones = document.querySelector('.botones');

// Aside elements
const asideAlerts = document.querySelector('.alerts');
const messageP = document.querySelector('.msj');

// TextArea final text
const finalTextDiv = document.querySelector('.final-text');

const pCopied = document.querySelector('.copiado');

// Events
document.addEventListener('DOMContentLoaded', () => {

    btnEncriptar.addEventListener('click', () => {
        if (entradaVacia()) {
            return;
        }
        const texto = inputText.value;

        if (validarEntrada(texto)) {
            encriptar(texto);
        } else {
            mostrarAlerta('Sólo letras minúsculas y sin acentos.');
            setTimeout(() => {
                const alert = document.querySelector('.alert');
                alert.remove();
            }, 4000);
        }
    });

    btnDesencriptar.addEventListener('click', () => {
        if (entradaVacia()) {
            return;
        }
        const texto = inputText.value;
        if (validarEntrada(texto)) {
            desencriptar(texto);
        } else {
            // mostrarAlerta('Sólo letras minúsculas y sin acentos.');
            // setTimeout(() => {
            //     const alert = document.querySelector('.alert');
            //     alert.remove();
            // }, 4000);
        }
    });

    btnCopy.addEventListener('click', copiarPortapapeles);
});

function entradaVacia() {
    const texto = inputText.value;
    if (texto.length < 1) {
        asideAlerts.classList.remove('hide');
        messageP.classList.remove('hide');
        finalTextDiv.classList.add('hide');
        return true;
    } else {
        return false;
    }
}

function validarEntrada(string) {
    const lowercaseOnly = /^([a-z]+[\s]*)+$/;
    return lowercaseOnly.test(string);
}

function mostrarAlerta(mensaje) {
    const alert = document.querySelector('.alert');
    if (!alert) {
        const p = document.createElement('p');
        p.classList.add('alert');
        const string = `
        <span class="icono-admiracion">!</span>
        ${mensaje}
    `;
        p.innerHTML = string;
        contenedor.insertBefore(p, divBotones);
    }

}

function encriptar(string) {
    let cadenaEncriptada = string;
    cadenaEncriptada = cadenaEncriptada
        .replaceAll('a', '1')
        .replaceAll('e', '2')
        .replaceAll('i', '3')
        .replaceAll('o', '4')
        .replaceAll('u', '5');

    cadenaEncriptada = cadenaEncriptada
        .replaceAll('1', 'ai')
        .replaceAll('2', 'enter')
        .replaceAll('3', 'imes')
        .replaceAll('4', 'ober')
        .replaceAll('5', 'ufat');

    outputText.value = cadenaEncriptada;
    finalTextDiv.classList.remove('hide');
    asideAlerts.classList.add('hide');
    messageP.classList.add('hide');
    console.log(cadenaEncriptada);
}

function desencriptar(string) {
    let cadenaEncriptada = string;
    cadenaEncriptada = cadenaEncriptada
        .replaceAll('ai', '1')
        .replaceAll('enter', '2')
        .replaceAll('imes', '3')
        .replaceAll('ober', '4')
        .replaceAll('ufat', '5');

    cadenaEncriptada = cadenaEncriptada
        .replaceAll('1', 'a')
        .replaceAll('2', 'e')
        .replaceAll('3', 'i')
        .replaceAll('4', 'o')
        .replaceAll('5', 'u');

    outputText.value = cadenaEncriptada;
    finalTextDiv.classList.remove('hide');
    asideAlerts.classList.add('hide');
    messageP.classList.add('hide');
    console.log(cadenaEncriptada);
}

function copiarPortapapeles() {
    navigator.clipboard.writeText(outputText.value)
        .then(() => {
            pCopied.classList.remove('hide');
            setTimeout(() => {
                pCopied.classList.add('hide');
            }, 3000);
        })
        .catch(() => {
            console.log('something went wrong!')
        });

}