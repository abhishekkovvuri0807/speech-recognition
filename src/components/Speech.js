import React from 'react';


// initialising speech recognition of Web speech API and setting properties.
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const speechRecognition = new window.SpeechRecognition();
speechRecognition.lang = 'en-US';
speechRecognition.continous = true;
speechRecognition.interimResults = true;


class Speech extends React.Component {

    constructor() {
        super();
        this.state = {
            speech: false,
            output: ''
        }
        this.handleSpeech = this.handleSpeech.bind(this);
    }

    startListening = (event) => {
        this.setState({
            speech: true
        }, this.handleSpeech);
    }

    endListening = (event) => {
        this.setState({
            speech: false
        });
        speechRecognition.stop();
    }

    handleSpeech = (event) => {

        // condition to start or end the speech recognition.
        if (this.state.speech) {
            speechRecognition.start();
            // to again restart speech recognition on ending.
            speechRecognition.onend = () => {
                if (this.state.speech) {
                    speechRecognition.start();
                }
            }
        } else {
            speechRecognition.stop();
        }

        // output speech
        if (this.state.speech) {
            let finalTranscript = '';
            speechRecognition.onresult = (event) => {
                console.log(event);
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript + ' ';
                    }
                }
                this.setState({
                    output: finalTranscript
                });
            }
        }

        speechRecognition.onerror = event => {
            console.log("Some error occurred in speech recognition: " + event.error)
        }
    }

    render() {
        return (
            <div style={speechStyle.mainCss}>
                <h1>Speech Recognition</h1>
                <button onClick={this.startListening} style={speechStyle.buttonCss}>Start Speech Recognition</button>
                <button onClick={this.endListening} style={speechStyle.buttonCss}>Stop Speech Recognition</button>
                <div style={speechStyle.speechCss}>{this.state.output}</div>
            </div>
        )
    }
}



const speechStyle = {
    mainCss: {
        marginLeft: '100px'
    },
    headerCss: {
        textAlign: 'center'
    },
    buttonCss: {
        backgroundColor: '#0000CD',
        border: 'none',
        color: 'white',
        padding: '5px 5px',
        margin: '10px 5px 0 0',
        cursor: 'pointer',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
    },
    speechCss: {
        marginTop: '15px',
        align: 'center',
        height: '300px',
        width: '300px',
        border: '.5px solid black'
    }

}

export default Speech;
