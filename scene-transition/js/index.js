//Global variables
var renderer, scene, camera, composer, squareMain, octoMain, skeleton, particle;
var bar01, bar02;

var lookAtPos;
//Execute the main functions when the page loads
window.onload = function() {
  init();
  geometry();
  animate();
}

function init(){
  //Configure renderer settings-------------------------------------------------
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.autoClear = false;
  renderer.setClearColor(0x404040, 1.0);
  document.getElementById('canvas').appendChild(renderer.domElement);
  //----------------------------------------------------------------------------

  // Create an empty scene
  scene = new THREE.Scene();

  // Create a basic perspective camera
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
  camera.position.z = 400;
  scene.add(camera);

  // Create the lights
  var ambientLight = new THREE.AmbientLight(0x999999, 0.5);
  scene.add(ambientLight);

  var lights = [];
  lights[0] = new THREE.DirectionalLight( 0xffffff, 0.5);
  lights[0].position.set(1, 0, 0);
  lights[1] = new THREE.DirectionalLight( 0x11E8BB, 0.5);
  lights[1].position.set(0.75, 1, 0.5);
  lights[2] = new THREE.DirectionalLight( 0x8200C9, 0.5);
  lights[2].position.set(-0.75, -1, 0.5);
  scene.add(lights[0]);
  scene.add( lights[1] );
  scene.add( lights[2] );

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('click', function () {
    // check if looking at octo
    console.log(lookAtPos)
    if (lookAtPos.x == 300) {
      lookAtPos = squareMain.position
    } else if (lookAtPos.x == -300) {
      lookAtPos = octoMain.position;
    }
  })
}

//Keep everything appearing properly on screen when window resizes
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); //maintain aspect ratio
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function geometry(){
  //Create the geometric objects
  squareMain = new THREE.Object3D();
  squareMain.position.x = -300;
  var geometrySquare = new THREE.CubeGeometry(7, 7, 7);
  scene.add(squareMain);

  //Create the materials
  var octoMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });

  //Add materials to the mesh - octoMesh, skeletonMesh
  var squareMesh = new THREE.Mesh(geometrySquare, octoMaterial);
  squareMesh.scale.x = squareMesh.scale.y = squareMesh.scale.z = 16;
  squareMain.add(squareMesh);

  lookAtPos = squareMain.position

  octoMain = new THREE.Object3D();
  octoMain.position.x = 300;
  var geometryOcto = new THREE.OctahedronGeometry(7, 1);
  scene.add(octoMain);

  //Create the materials
  var octoMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });

  //Add materials to the mesh - octoMesh, skeletonMesh
  var octoMesh = new THREE.Mesh(geometryOcto, octoMaterial);
  octoMesh.scale.x = octoMesh.scale.y = octoMesh.scale.z = 16;
  octoMain.add(octoMesh);
}

// Render Loop
function animate(){
  requestAnimationFrame(animate);

  octoMain.rotation.x -= 0.0020;
  octoMain.rotation.y -= 0.0030;

  squareMain.rotation.x -= 0.0020;
  squareMain.rotation.y -= 0.0030;

  camera.lookAt(lookAtPos);

  // Render the scene
  renderer.clear();
  renderer.render(scene, camera);
}
