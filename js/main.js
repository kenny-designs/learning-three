// object for our playfield
function PlayField() {
  this.geometry = new THREE.BoxGeometry(1, 1, 1);
  this.material = new THREE.MeshBasicMaterial({color: 0x88968a});
  this.cube = new THREE.Mesh(this.geometry, this.material);
  this.spinning = false;
  this.dir = '';

  this.NINETY_DEGREES = Math.PI / 2.0;

  this.rotSpeed = 0.05;

  this.lastX = 0;
  this.lastY = 0;

  this.rotX = 0;
  this.rotY = 0;

  // add listeners for rotation
  document.addEventListener('keydown', this.rotate.bind(this));
}

// spins cube based on user input
PlayField.prototype.rotate = function(event) {
  if(!this.spinning) {
    switch (event.keyCode) {
      case 37:
        this.dir = 'left';
        this.lastY = this.cube.rotation.y;
        break;

      case 38:
        this.dir = 'up';
        this.lastX = this.cube.rotation.x;
        break;

      case 39:
        this.dir = 'right';
        this.lastY = this.cube.rotation.y;
        break;

      case 40:
        this.dir = 'down';
        this.lastX = this.cube.rotation.x;
        break;
    }

    if (this.dir != '') {
      this.spinning = true;
    }
  }
};

PlayField.prototype.spin = function() {
  if (this.spinning) {
    switch (this.dir) {
      case 'left':
        this.cube.rotateY(-this.rotSpeed);
        this.rotY -= this.rotSpeed;
        if (this.rotY <= -this.NINETY_DEGREES) {
          this.cube.rotation.y = this.lastY - this.NINETY_DEGREES;
          this.rotY = 0;
          this.dir = '';
          this.spinning = false;
        }
        break;

      case 'up':
        this.cube.rotateX(this.rotSpeed);
        this.rotX += this.rotSpeed;
        if (this.rotX >= this.NINETY_DEGREES) {
          this.cube.rotation.x = this.lastX + this.NINETY_DEGREES;
          this.rotX = 0;
          this.dir = '';
          this.spinning = false;
        }
        break;

      case 'right':
        this.cube.rotateY(this.rotSpeed);
        this.rotY += this.rotSpeed;
        if (this.rotY >= this.NINETY_DEGREES) {
          this.cube.rotation.y = this.lastY + this.NINETY_DEGREES;
          this.rotY = 0;
          this.dir = '';
          this.spinning = false;
        }
        break;

      case 'down':
        this.cube.rotateX(-this.rotSpeed);
        this.rotX -= this.rotSpeed;
        if (this.rotX <= -this.NINETY_DEGREES) {
          this.cube.rotation.x = this.lastX - this.NINETY_DEGREES;
          this.rotX = 0;
          this.dir = '';
          this.spinning = false;
        }
        break;
    }
  }
};

// setup our scene
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let playField = new PlayField();
scene.add(playField.cube);

camera.position.z = 2;

// main game loop
function animate() {
  requestAnimationFrame( animate );

  // spin the cube
  playField.spin();

  renderer.render( scene, camera );
}
animate();
