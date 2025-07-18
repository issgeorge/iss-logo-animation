// === SETUP SCENE ===

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(

  75, window.innerWidth / window.innerHeight, 0.1, 1000

);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// === LOGO MAP (pixel grid for 'iss') ===

const logoMap = [

  [0,0,1,0, 0,1,1,1, 0,1,1,1],

  [0,0,1,0, 1,1,0,0, 1,1,0,0],

  [0,0,1,0, 1,0,0,0, 1,0,0,0],

  [0,0,0,0, 0,1,1,0, 0,1,1,0],

  [0,0,0,0, 0,0,1,1, 0,0,1,1],

  [0,0,1,0, 0,0,0,1, 0,0,0,1],

  [0,0,1,0, 1,0,0,1, 1,0,0,1],

  [0,0,1,0, 0,1,1,1, 0,1,1,1],

];

// === TARGET POSITIONS ===

const targetPositions = [];

const spacing = 1.2;

const originX = -6;

const originY = 3;

for (let row = 0; row < logoMap.length; row++) {

  for (let col = 0; col < logoMap[row].length; col++) {

    if (logoMap[row][col] === 1) {

      targetPositions.push({

        x: originX + col * spacing,

        y: originY - row * spacing,

        z: 0

      });

    }

  }

}

const totalCubes = targetPositions.length;

// === CREATE CUBES ===

const colors = [0xff0000, 0x00a94f, 0x4285f4, 0xfbbc05]; // red, green, blue, yellow

const cubes = [];

const cubeSize = 1;

for (let i = 0; i < totalCubes; i++) {

  const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

  const material = new THREE.MeshBasicMaterial({

    color: colors[i % colors.length],

    transparent: true,

    opacity: 0

  });

  const cube = new THREE.Mesh(geometry, material);

  cube.position.set(

    (Math.random() - 0.5) * 40,

    (Math.random() - 0.5) * 40,

    (Math.random() - 0.5) * 40

  );

  cube.rotation.set(

    Math.random() * Math.PI,

    Math.random() * Math.PI,

    Math.random() * Math.PI

  );

  scene.add(cube);

  cubes.push(cube);

  // Fade in

  gsap.to(cube.material, {

    opacity: 1,

    duration: 1.5,

    delay: Math.random() * 2

  });

  // Chaotic movement

  gsap.to(cube.position, {

    duration: 2.5,

    x: cube.position.x + (Math.random() - 0.5) * 10,

    y: cube.position.y + (Math.random() - 0.5) * 10,

    z: cube.position.z + (Math.random() - 0.5) * 10,

    ease: "sine.inOut",

    yoyo: true,

    repeat: 1

  });

  // Funny rotation

  gsap.to(cube.rotation, {

    duration: 3,

    x: "+=" + Math.random() * 4,

    y: "+=" + Math.random() * 4,

    z: "+=" + Math.random() * 4,

    ease: "power1.inOut",

    yoyo: true,

    repeat: 1

  });

}

// === CAMERA ===

camera.position.z = 25;

// === FORM INTO LOGO ===

setTimeout(() => {

  cubes.forEach((cube, i) => {

    const target = targetPositions[i];

    if (!target) return;

    gsap.to(cube.position, {

      duration: 2,

      x: target.x,

      y: target.y,

      z: target.z,

      ease: "power3.out",

      delay: i * 0.015

    });

    gsap.to(cube.rotation, {

      duration: 2,

      x: 0,

      y: 0,

      z: 0,

      ease: "expo.out",

      delay: i * 0.015

    });

  });

}, 4000); // Start after chaos

// === RENDER LOOP ===

function animate() {

  requestAnimationFrame(animate);

  renderer.render(scene, camera);

}

animate();
