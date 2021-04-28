const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

class SpeechToTextSession extends EventTarget {
    constructor(parentEl) {
        super();
        this.parentEl = parentEl;
        this.resultsEl = document.createElement("span");
        this.parentEl.appendChild(this.resultsEl);
        this.recognition = new SpeechRecognition();
        this.recognition.interimResults = true;
        this.recognition.lang = "en-US";
        this.recognition.addEventListener("result", this.onResult.bind(this));
        this.recognition.addEventListener("end", this.onEnd.bind(this));
        this.recognition.start();
    }

    onResult(event) {
        const scrollBottom = document.body.offsetHeight - (window.scrollY + window.innerHeight);
        this.resultsEl.innerHTML = "";
        for (const res of event.results) {
            const text = document.createTextNode(res[0].transcript + " ");
            const span = document.createElement("span");
            span.appendChild(text);
            this.resultsEl.appendChild(span);
        }
        if (scrollBottom < 10) {
            window.scroll(window.scrollX, document.body.offsetHeight - window.innerHeight);
        }
    }

    onEnd() {
        this.dispatchEvent(new Event("end"));
    }
}

const runOneSession = (parentEl) => new Promise((resolve) => {
    const session = new SpeechToTextSession(parentEl);
    session.addEventListener("end", resolve);
})

window.addEventListener("DOMContentLoaded", async () => {
    const parentEl = document.getElementById("results");
    while(true) {
        await runOneSession(parentEl);
        console.log("SpeechToTextSession emitted 'end'.");
    }
});