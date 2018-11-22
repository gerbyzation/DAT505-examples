var renderer, scene, camera;

const AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx, audioElement, source, analyser, bufferLength, dataArray;

  var cubes = [];
function init() {
  audioCtx = new AudioContext();
  audioElement = document.querySelector('audio');
  audioElement.play();
  source = audioCtx.createMediaElementSource(audioElement)
  analyser = audioCtx.createAnalyser();

  source.connect(analyser);
  source.connect(audioCtx.destination);

  analyser.fftSize = 256;
  bufferLength = analyser.frequencyBinCount;
  console.log({ bufferLength })
  dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);

  scene = new THREE.Scene();

  var W = window.innerWidth,
      H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(0, 55, 140);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 1000);
  scene.add(spotLight);
  //spotLight.castShadow = true;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

  //Create a new array that will store multiple cubes


  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -64; x <= 64; x += 1) { // Start from -45 and sequentially add one every 5 pixels
      var boxGeometry = new THREE.BoxGeometry(1, 1, 1);
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
      var box = new THREE.Mesh(boxGeometry, boxMaterial);

      //box.castShadow = true;

      box.position.x = x;
      box.position.z = 0;
      box.scale.y = dataArray[x + 524] / 20;

      scene.add(box);
      cubes.push(box);
  }

  document.body.appendChild(renderer.domElement);
}

function drawFrame(){
  requestAnimationFrame(drawFrame);
  console.log(dataArray[10])
  cubes.forEach(function(cube, i) {
    cube.scale.y = dataArray[i] / 10;
    cube.scale.z = dataArray[i] / 10;
  })

  analyser.getByteFrequencyData(dataArray);
  renderer.render(scene, camera);
}

init();
drawFrame();
