import React from 'react';
import speech from '@google-cloud/speech';
import fs from 'fs';


// Creates a client
const client = new speech.SpeechClient();

// The name of the audio file to transcribe
const fileName = '../assets/native-speaker-1.m4a';

// Reads a local audio file and converts it to base64
const file = fs.readFileSync(fileName);
const audioBytes = file.toString('base64');

// The audio file's encoding, sample rate in hertz, and BCP-47 language code
const audio = {
    content: audioBytes,
};
const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
};
const request = {
    audio: audio,
    config: config,
};

// Detects speech in the audio file
const [response] =  client.recognize(request);
const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
console.log(`Transcription: ${transcription}`);




class CloudSpeech extends React.Component {

    render() {
        return (
            <div>
               
            </div>
        )
    }
}

export default CloudSpeech;