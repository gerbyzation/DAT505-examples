# Import models from 3D software

A brief description on how to use a 3D model, in the lectures Maya has been used but this should work in similar ways for other 3D applications or using different export formats than `obj`, refer to THREE.js documentation for this.

**Note**: Make sure you are using a recent version of THREE.js, some of the examples use outdates versions that give errors. As of writing the lastest version is *98*.

Refer to `model-import-demo` and `model-import-example` for demonstation of how to import just an object, and object + material.

## Export model from Maya

First go to Windows > Settings/Preferences > Plugin Manager and search for `obj`. It should display `objExport.bundle`, make sure 'Loaded' is checked. Without this we won't be able to export as an OBJ file.

With that done, we export the model by going to File > Export All. Give it a filename, and make sure to select `OBJExport` as 'Files of Type'. Select your directory to export to and it should export an `.obj` and `.mtl` file with your chosen name. If not there yet copy these into your THREE.js project directory.

## Importing OBJ into THREE.js

To import the `.obj` file into THREE.js we'll need to add the contents of https://raw.githubusercontent.com/mrdoob/three.js/master/examples/js/loaders/OBJLoader.js into our project. Save the contents as `OBJLoader.js` in your project and add a script tag in your index.html to include this (after THREE.js script tag, before loading your own code). For example if your javascript files are in the `js` folder you'd add `<script src="js/OBJLoader.js"></script>` in your `index.html` to include it.

The code we need to load the object is as follow:

```js
var loader = new THREE.OBJLoader();
loader.load(
  'model.obj', // Replace this with your filename/location
  function (mesh) {
    scene.add(mesh);
  }
)
```
The callback function will receive the model as a mesh, which we can add to our scene.

## Loading `.mtl` texture

Our Maya export also produced an `.mtl` file, which is the material as created in Maya. To add this to our imported object we'd first need to import the material.

For this we need another dependency, repeat the steps from above for https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/MTLLoader.js, save this as `MTLLoader.js` and include it in `index.html` with a script tag.

Now we can load the material first, and add it to our object:
```js
var materialLoader = new THREE.MTLLoader()
materialLoader.load('model.mtl', function (material) {
  var objLoader = new THREE.OBJLoader()
  objLoader.setMaterials(material)
  objLoader.load(
    'model.obj',
    function (object) {
      scene.add(object);
    }
  )
})
```
This will assign the material to our mesh and should display now :)
