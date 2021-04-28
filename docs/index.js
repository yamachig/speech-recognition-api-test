const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

const onResult = event => {
    const resultsEl = document.getElementById("results");
    const scrollBottom = document.body.offsetHeight - (window.scrollY + window.innerHeight);
    console.log(document.body.scrollTop)
    resultsEl.innerHTML = "";
    for (const res of event.results) {
        const text = document.createTextNode(res[0].transcript);
        const span = document.createElement("span");
        span.appendChild(text);
        resultsEl.appendChild(span);
    }
    if (scrollBottom < 10) {
        window.scroll(window.scrollX, document.body.offsetHeight - window.innerHeight);
    }
};
recognition.addEventListener("result", onResult);

window.addEventListener("DOMContentLoaded", () => {
    recognition.start();
});