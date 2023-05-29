const qrcode = require('qrcode-terminal');
const {
    Client,
    MessageMedia
} = require('whatsapp-web.js');

const client = new Client();
let flag = false;

client.on('qr', qr => {
    qrcode.generate(qr, {
        small: true
    });
});

client.on('ready', async () => {
    console.log('Cliente listo!');
    flag = true;
});

client.initialize();

const menuStart = (message) => {
    client.sendMessage(message.from, `*Hola soy claro*
    _1. Plan prepago_
    _2. Plan PostPago_
    _3. Plan Hogar_
    _4. Plan Empresarial_
    _5. Plan Volver_
    _6. Plan Salir_
    `);
}
const menu = (message, messageUser) => {
    client.sendMessage(message.from, `*PLAN ${messageUser}*
    _1. Vender_
    _2. Financiar_
    _3. Afiliarse_
    _4. Volver_
    _5. Salir_`);
}
const menuExit = (message) => {
    client.sendMessage(message.from, 'Gracias, hasta pronto. \n');
}

let pantalla = -1;
let activo = 0;

client.on('message', message => {

    //menu 4
    if (activo === 0) {
        if (pantalla === 4) {
            if (message.body === '5') {
                menuExit(message);
                pantalla = -1;
                activo = 1;
            }
            if (message.body === '4') {
                menuStart(message);
                pantalla = 0;
                activo = 1;
            }
            if (message.body === '3') {
                client.sendMessage(message.from, 'Afilinado a plan Empresarial');
                activo = 1;
            }
            if (message.body === '2') {
                client.sendMessage(message.from, 'Financiando plan Empresarial');
                activo = 1;
            }
            if (message.body === '1') {
                client.sendMessage(message.from, 'Vender  plan Empresarial');
                activo = 1;
            }
        }
    }

    //menu 3
    if (activo === 0) {
        if (pantalla === 3) {
            if (message.body === '5') {
                menuExit(message);
                pantalla = -1;
                activo = 1;
            }
            if (message.body === '4') {
                menuStart(message);
                pantalla = 0;
                activo = 1;
            }
            if (message.body === '3') {
                client.sendMessage(message.from, 'Afilinado a plan Hogar');
                activo = 1;
            }
            if (message.body === '2') {
                client.sendMessage(message.from, 'Financiando plan Hogar');
                activo = 1;
            }
            if (message.body === '1') {
                client.sendMessage(message.from, 'Vender  plan Hogar');
                activo = 1;
            }
        }
    }

    //menu 2
    if (activo === 0) {
        if (pantalla === 2) {
            if (message.body === '5') {
                menuExit(message);
                pantalla = -1;
                activo = 1;
            }
            if (message.body === '4') {
                menuStart(message);
                pantalla = 0;
                activo = 1;
            }
            if (message.body === '3') {
                client.sendMessage(message.from, 'Afilinado a plan Postpago');
                activo = 1;
            }
            if (message.body === '2') {
                client.sendMessage(message.from, 'Financiando plan Postpago');
                activo = 1;
            }
            if (message.body === '1') {
                client.sendMessage(message.from, 'Vender  plan Postpago');
                activo = 1;
            }
        }
    }

    //menu 1
    if (activo === 0) {
        if (pantalla === 1) {
            if (message.body === '5') {
                menuExit(message);
                pantalla = -1;
                activo = 1;
            }
            if (message.body === '4') {
                menuStart(message);
                pantalla = 0;
                activo = 1;
            }
            if (message.body === '3') {
                client.sendMessage(message.from, 'Afilinado a plan prepago');
                activo = 1;
            }
            if (message.body === '2') {
                client.sendMessage(message.from, 'Financiando plan prepago');
                activo = 1;
            }
            if (message.body === '1') {
                client.sendMessage(message.from, 'Vender  plan prepago');
                activo = 1;
            }
        }
    }

    //principal menu
    if (activo === 0) {
        if (pantalla === 0) {
            if (message.body === '6') {
                menuExit(message);
                pantalla = -1;
                activo = 1;
            }
            if (message.body === '5') {
                menuStart(message);
                pantalla = 0;
                activo = 1;
            }
            if (message.body === '4') {
                menu(message, `EMPRESARIAL ☺`);
                pantalla = 4;
                activo = 1;
            }
            if (message.body === '3') {
                menu(message, `HOGAR ◘`);
                pantalla = 3;
                activo = 1;
            }
            if (message.body === '2') {
                menu(message, `POSTPAGO ○`);
                pantalla = 2;
                activo = 1;
            }
            if (message.body === '1') {
                menu(message, `PREPAGO ☻`);
                pantalla = 1;
                activo = 1;
            }
        }
    }

    //main
    if(activo === 0){
        if (pantalla === -1) {
            if (message.body === 'hola') {
                menuStart(message);
                pantalla = 0;
                activo = 1;
            }
        }
    }


    activo = 0;
});