//*** AQUI PONEMOS LA DIRECCION DEL SERVIDOR*/
let socket = io('http://localhost:3000', {
    transports: ['websocket', 'polling', 'flashsocket']
});
//*** ESCUCHAMOS EL EVENTO "EMOJI_RECEIVE" */
socket.on("emoji_receive", function (data) {
    //*** CUANDO ESTE SE LANCE RECIBIMOS LA DATA QUE ES EL EMOJI */
    //*** Y LANZAMOS LA FUNCION ANIMITEDEMOTICON PASANDOLE EL EMOJI */
    animatedEmoticon(data);
});

//*** CON ESTA FUNCION MANDAMOS EL EMOJI AL SERVIDOR EMITIENDO EL EVENTO "EMOJI" */
const emitEmoji = (emoji) => {
    socket.emit("emoji", emoji);
}


///ANIMACION
let animationContainer = null;
//*** ESTE EVENTO RECIBE UN EMOJI */
const animatedEmoticon = (emoticon) => {
    //*** SE PASA EL EMOJI A OTRA FUNCION  DONDE SE LE PONDRA LOS ESTILOS
    //** AL HTML */

    insertStyles(emoticon);
};



const insertStyles = (emoticon) => {
    //*** CREAMOS UN TAMAÑO DINAMICO PARA EL EMOJI */
    let size = Math.floor(Math.random() * (60 - 20 + 1) + 20);
    //*** CREAMOS UN ELEMENTO HTML NUEVO */
    let emoticonElement = document.createElement("span");
    //*** LE PASAMOS EL EMOJI COMO TEXTO */
    emoticonElement.innerText = emoticon;
    //*** LE PONEMOS EL TAMAÑO DINAMICO MEDIANTE EL CSS Y DEMAS PROPIEDADES */
    //*** NO TOQUES NADA QUE LA FRIEGAS */
    emoticonElement.style.fontSize = `${size}px`;
    emoticonElement.style.position = "absolute";
    emoticonElement.style.opacity = "0";
    emoticonElement.style.transition = "all 2s ease-out";

    //*** ACA SE HACE UNA "ESPERA" PARA AÑADIR ELEMENTOS PARA LA ANIMACION */
    setTimeout(() => insertAnimationStyles(emoticonElement), 150);
    //*** ACA SE AGREGA EL ELEMENTO HTML CREADO AL BODY Y SE ELIMINA AL RATO */
    addAndRemoveElement(emoticonElement, emoticon);
    //*** ESTA VAINA VI QUE ERA NECESARIA PERO CREO QUE FUNCIONA SIN ESTO, PERO DEJALO XD */
    requestAnimationFrame(insertAnimationStyles);
}


const insertAnimationStyles = (emoticonElement) => {
    //*** AGREGANDO LOS ESTILOS PARA LA ANIMACION COMO LA OPACIDAD Y EL MOVIMIENTO */
    if (emoticonElement.style) {
        emoticonElement.style.opacity = "100";
        emoticonElement.style.transform = 'translate3d(-10px,-250px,0px)';
        emoticonElement.style.webkitTransform = 'translate3d(-10px,-250px,0px)';
        emoticonElement.style.mozTransform = 'translate3d(-10px,-250px,0px)';
    }


}
//*** RECIBIMOS EL ELEMENTO CREADO JUNTO AL EMOJI */
const addAndRemoveElement = (emoticonElement, emoticon) => {
    //*** BUSCAMOS EL HTML DONDE SE CREARAN LOS EMOJIS ANIMADOS */
    //*** ESTA LINEA ES LA QUE CAMBIA PARA CENTRAR O NO AL EMOJI */
    //*** EN VEZ DE "animationContainer" LE PASAS EL emoticon QUE RECIBES ARRIBA */
    //** QUEDARIA ASI: */
    //** let animationContainer = document.getElementById(emoticon);
    //** ASI LOS EMOJIS NACEN DESDE SU MISMO LUGAR*/
    let animationContainer = document.getElementById("animationContainer");
    //**INSERTAMOS EL ELEMENTO CREADO */
    animationContainer.appendChild(emoticonElement);
    //** UNA ESPERA PARA DESAPARECER EL EMOJI CON ANIMACION */
    setTimeout(() => {
        emoticonElement.style.transition = "all 0.5s ease-out";
        emoticonElement.style.opacity = "0";
    }, 2000);
    //** UNA ESPERA PARA ELIMINAR EL ELEMENTO CREADO */
    setTimeout(() => {
        animationContainer.removeChild(emoticonElement);
    }, 3500);
}