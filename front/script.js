let socket = io('http://localhost:3000', {
    transports: ['websocket', 'polling', 'flashsocket']
});
socket.on("emoji_receive", function (data) {
    animatedEmoticon(data);
});


const emitEmoji = (emoji) => {
    socket.emit("emoji", emoji);
}


///SOCKET



let animationContainer = null;

const getEmoticon = (emoticon) => {
    let emoticons = ["❤️", "👍", "🙏", "👏"];
    return emoticons.find((e) => e == emoticon);
};
const animatedEmoticon = (emoticon) => {
    let emoticonToAnimated = getEmoticon(emoticon);
    insertStyles(emoticonToAnimated);
};

const insertStyles = (emoticon) => {
    let size = Math.floor(Math.random() * (60 - 20 + 1) + 20);

    let emoticonElement = document.createElement("span");
    emoticonElement.innerText = emoticon;
    emoticonElement.style.fontSize = `${size}px`;
    emoticonElement.style.position = "absolute";
    emoticonElement.style.opacity = "0";
    emoticonElement.style.transition = "all 2s ease-out";

    setTimeout(() => insertAnimationStyles(emoticonElement), 150);
    addAndRemoveElement(emoticonElement, emoticon);
    requestAnimationFrame(insertAnimationStyles);
}


const insertAnimationStyles = (emoticonElement) => {


    if (emoticonElement.style) {
        emoticonElement.style.opacity = "100";
        emoticonElement.style.transform = 'translate3d(-10px,-250px,0px)';
        emoticonElement.style.webkitTransform = 'translate3d(-10px,-250px,0px)';
        emoticonElement.style.mozTransform = 'translate3d(-10px,-250px,0px)';
    }


}

const addAndRemoveElement = (emoticonElement, emoticon) => {
    let animationContainer = document.getElementById(emoticon);
    animationContainer.appendChild(emoticonElement);
    setTimeout(() => {
        emoticonElement.style.transition = "all 0.5s ease-out";
        emoticonElement.style.opacity = "0";
    }, 2000);
    setTimeout(() => {
        animationContainer.removeChild(emoticonElement);
    }, 3500);
}