// get audio context depending on browser
const AudioContext = window.AudioContext || window.webkitAudioContext;

// instanciate context
const audioCtx = new AudioContext();

// find and select audio HTML element
const audioElement = document.querySelector("audio")

// load sound from audio element
const source = audioCtx.createMediaElementSource(audioElement);

// create analyzer
const analyzer = audioCtx.createAnalyser();

// Track has two connections, one into analyzer
// and other into 'destination' to provide sound
source.connect(analyzer);
source.connect(audioCtx.destination);

// Analyzer uses Fast Fourier Transform (google that)
analyzer.fftSize = 2048; // default value

var bufferLength = analyzer.frequencyBinCount;
// As we are getting byte data we need an unsigned 8 bit integer array
// For getFloatTimeDomainData you need a Float32Array instead
var dataArray = new Uint8Array(bufferLength);
analyzer.getByteTimeDomainData(dataArray);

console.log({ bufferLength })

function loop() {
  requestAnimationFrame(loop)
  analyzer.getByteTimeDomainData(dataArray);
  console.log(
    dataArray[100] / 128,
    dataArray[200] / 128,
    dataArray[300] / 128,
    dataArray[400] / 128,
    dataArray[500] / 128,
    dataArray[600] / 128,
    dataArray[700] / 128,
    dataArray[800] / 128,
    dataArray[900] / 128,
    dataArray[1000] / 128
  )
}
loop();
