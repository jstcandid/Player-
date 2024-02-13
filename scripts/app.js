const canvas = document.querySelector('#canvas'),
  container = document.querySelector('.container'),
  context = canvas.getContext('2d'),
  audiofile = document.querySelector('#audiofile');

let source, analyser;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

audiofile.addEventListener('change', function () {
  const files = this.files;

  const audio = document.querySelector('#audio');
  audio.src = URL.createObjectURL(files[0]);
  const audioContext = new AudioContext();
  audio.load();
  audio.play();

  source = audioContext.createMediaElementSource(audio);
  analyser = audioContext.createAnalyser();
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 64;
  const bufferLength = analyser.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);
  const barWidth = canvas.width / bufferLength;
  let barHeight;
  let x;

  function animate() {
    x = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 2;
      context.fillStyle = 'navy';
      context.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth;
    }
    requestAnimationFrame(animate);
  }
  animate();
});
