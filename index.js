const btn = document.getElementById("talk")
const content = document.getElementById("content")

function speak(text) {
    const textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.volume = 1;
    textSpeak.pitch = 1;
    textSpeak.rate = 1;

    window.speechSynthesis.speak(textSpeak);
}

function wish(){
    var day = new Date();
    var hour = day.getHours();

    if (hour > 0 && hour < 12) {
        speak('Good Morning Boss....');
    }
    else if (hour > 12 && hour < 17) {
        speak("Good Afternoon Sir.....");
    }
    else{
        speak("Good evening Master....")
    }
}

window.addEventListener('load', () =>{
    speak('Initializing JARVIS...')
    wish()
});

const speechRecognization = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition  = new speechRecognization()

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLocaleLowerCase())
}

btn.addEventListener('click', ()=>{
    speak("How can i help you....")
    content.textContent = "Listening....."
    recognition.start();
});

const takeCommand = (message) => {
    if (message.includes("hey") || message.includes('hello')) {
        speak("Hello Sir,  How May I Help You ?")
    }

    else if(message.includes("open instagram")){
        window.open("https://www.instagram.com/", "_blank")
        speak("Opening Instagram.....")
    }

    else if (message.includes("open google")) {
        window.open('https://www.google.com/' , "_blank")
        speak("Opening google.....")
    }

    else if (message.includes("open youtube")) {
        window.open('https://www.youtube.com/' , "_blank")
        speak("Opening Youtube.....")
    }
    
    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
	    speak(finalText);
  
    }

    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speak(finalText);
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speak(finalText);
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speak(finalText);
    }

    else if(message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speak(finalText);
    }

    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speak(finalText);
    }
}



