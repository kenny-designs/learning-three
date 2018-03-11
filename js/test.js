// set up our scene
var scene = new THREE.Scene();
var bgTexture = new THREE.TextureLoader().load('./images/background.jpg');
scene.background = bgTexture;
//scene.fog = new THREE.Fog(new THREE.Color('skyblue'), 0.1, 25);

// create our camera
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

// renders our scene
var renderer = new THREE.WebGLRenderer();
//renderer.setClearColor(scene.fog.color);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// load texture for cube
var texture = new THREE.TextureLoader().load('./images/cubeTex.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

// create our cube and put the texture on it
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { map: texture } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// lines!
var mat = new THREE.LineBasicMaterial( { color: 0x0000ff } );
var geo = new THREE.Geometry();
geo.vertices.push(new THREE.Vector3( -1, 0, 0) );
geo.vertices.push(new THREE.Vector3( 0, 1, 0) );
geo.vertices.push(new THREE.Vector3( 1, 0, 0) );
geo.vertices.push(new THREE.Vector3( 0, -1, 0) );
geo.vertices.push(new THREE.Vector3( -1, 0, 0) );

var line = new THREE.Line(geo, mat);
scene.add(line);

// load our font
var textMesh1, textMesh2;
var loader = new THREE.FontLoader();
loader.load( './fonts/helvetiker_regular.typeface.json', function ( font ) {

  var textGeo = new THREE.TextGeometry( 'C\nU\nB\nE', {
    font: font,
    size: 0.1,
    height: 0.025
  });

  var textMat = new THREE.MeshBasicMaterial({ color: 0xa9e6e7 });
  textMesh1 = new THREE.Mesh(textGeo, textMat);
  textMesh1.position.set(-0.5, 0.2, 1);

  textMesh2 = new THREE.Mesh(textGeo, textMat);
  textMesh2.position.set(0.5, 0.2, 1);

  scene.add(textMesh1);
  scene.add(textMesh2);

  // begin animation
  animate();
});

camera.position.z = 3;

function animate() {
  requestAnimationFrame( animate );

  cube.material.map.rotation += 0.005;

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  textMesh1.rotation.y += 0.01;
  textMesh2.rotation.y -= 0.01;

  renderer.render( scene, camera );
}
