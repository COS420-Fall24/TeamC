import React, {useState, useContext, useRef} from "react";

interface synthesisInterface{
    rate : number;
    voice : number;
    pitch : number;
    volume : number;
}


export function TTS({html}:{html:string}){

    const utteranceRef = useRef(new SpeechSynthesisUtterance());
    const [synthesis, setSynthesis] = useState<synthesisInterface>({rate : 1,voice : 0,pitch: 1,volume:1});

    const handleSpeak = () => {

        
        const div = document.createElement("div");
        div.innerHTML = html;

        const utterance = new SpeechSynthesisUtterance(div.innerText);
        if(utterance !== undefined && synthesis.pitch !== undefined && synthesis.rate !== undefined && synthesis.volume !== undefined && synthesis.voice !== undefined && utterance.voice !== undefined && utterance.rate !== undefined && utterance.pitch !== undefined && utterance.volume !== undefined){
        utterance.rate = synthesis.rate;
        utterance.pitch = synthesis.pitch;
        utterance.volume = synthesis.volume;
        utterance.voice = speechSynthesis.getVoices()[synthesis.voice];
        utteranceRef.current = utterance;

        }

        window.speechSynthesis.speak(utterance);
    }

    const voices = window.speechSynthesis.getVoices();

    return(
        <>
            {/* Added if statement to prevent a queue of TTS requests while one is already in progress */}
            <button 
                data-testid="tts" 
                style={{margin:"5px"}}
                onClick={() => {
                    if (!window.speechSynthesis.speaking) {
                        handleSpeak();
                    }
                }}
            >
                TTS
            </button>

            <select 
                id="ttsOption" 
                value={synthesis.voice} 
                onChange={(e) => {
                    if (!window.speechSynthesis.speaking) {
                        setSynthesis({...synthesis, voice: parseInt(e.target.value)})
                    }
                }}
            >
                {voices.map((voice, index) => (
                    <option key={index} value={index}>{voice.name}</option>
                ))}
            </select>

            {/* Speed */}
            <label className="ttsLabel" htmlFor="speed">Speed:</label>
            <input 
                className="ttsCtrl"
                name="speed"
                type="range"
                min="5"
                max="20"
                value={synthesis.rate * 10}
                onChange={(e) => setSynthesis({...synthesis, rate: parseInt(e.target.value)/10})}
            />

            {/* Pitch - Currently disabled */}
            {/* <input 
                type="range"
                min="5"
                max="20"
                value={synthesis.pitch * 10}
                onChange={(e) => setSynthesis({...synthesis, pitch: parseInt(e.target.value)/10})}
            /> */}

            {/* Volume */}
            <label className="ttsLabel" htmlFor="vol">Volume:</label>
            <input
                className="ttsCtrl"
                name="vol" 
                type="range"
                min="0"
                max="10"
                value={synthesis.volume * 10}
                onChange={(e) => setSynthesis({...synthesis, volume: parseInt(e.target.value)/10})}
            />
        </>
    )
}
