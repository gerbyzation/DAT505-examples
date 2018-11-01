var camera, scene, renderer, geometry, material, mesh;
var sphere;
var controls;

window.onload = function() {
  init();
  animate();
}

function init() {
	// Create a scene
	scene = new THREE.Scene();
	scene.add(new THREE.AmbientLight(0x333333));

	var light = new THREE.DirectionalLight(0xffffff, 0.8);
	light.position.set(5,3,5);
	scene.add(light);

	//Sphere params
	var radius  = 0.5,
		segments	= 32,
		rotation	= 6;

  sphere = createSphere(radius, segments);
	sphere.rotation.y = rotation;
	scene.add(sphere)

	// Create a WebGL Rendered
	renderer = new THREE.WebGLRenderer();
	// Set the size of the rendered to the inner width and inner height of the window
	renderer.setSize( window.innerWidth, window.innerHeight );

	// Add in the created DOM element to the body of the document
	document.body.appendChild( renderer.domElement );

	// Create a camera
	// 	Set a Field of View (FOV) of 75 degrees
	// 	Set an Apsect Ratio of the inner width divided by the inner height of the window
	//	Set the 'Near' distance at which the camera will start rendering scene objects to 2
	//	Set the 'Far' (draw distance) at which objects will not be rendered to 1000
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
	camera.position.z = 1.5;
	controls = new THREE.OrbitControls( camera, renderer.domElement );
}

function animate() {
	// Call the requestAnimationFrame function on the animate function
	// 	(thus creating an infinite loop)
	requestAnimationFrame( animate );

	sphere.rotation.y += 0.002;

	// Render everything using the created renderer, scene, and camera
	renderer.render( scene, camera );
}

//Function that includes the creation of the sphere (and its texture)
function createSphere(radius, segments) {
	return new THREE.Mesh(
		new THREE.SphereGeometry(radius, segments, segments),
		new THREE.MeshPhongMaterial({
			map:         THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'),
			//bumpMap:     THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
			//bumpScale:   0.005,
			//specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
			specular:    new THREE.Color('grey')
		})
	);
}
