// set up our scene
var scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');
scene.fog = new THREE.Fog(new THREE.Color('skyblue'), 0.1, 25);

// create our camera
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

// renders our scene
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(scene.fog.color);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// load texture
var texture = new THREE.TextureLoader().load('./images/cubeTex.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { map: texture } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

var mat = new THREE.LineBasicMaterial( { color: 0x0000ff } );
var geo = new THREE.Geometry();
geo.vertices.push(new THREE.Vector3( -1, 0, 0) );
geo.vertices.push(new THREE.Vector3( 0, 1, 0) );
geo.vertices.push(new THREE.Vector3( 1, 0, 0) );
geo.vertices.push(new THREE.Vector3( 0, -1, 0) );
geo.vertices.push(new THREE.Vector3( -1, 0, 0) );

var line = new THREE.Line(geo, mat);
scene.add(line);

camera.position.z = 3;

function animate() {
  requestAnimationFrame( animate );

  cube.material.map.rotation += 0.005;

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );
}
animate();
