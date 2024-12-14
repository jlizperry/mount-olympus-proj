let params = {
  // (add)
};

//time
let time1 = 0;
const amplitude = 0.05; 
const frequency = 0.6; 

const WORLD_SIZE = 2000;
let cloudParticles = [];
let cloudLayers = [];
let temple, statue1, main, pillar1; 
let ground; 

let backgroundMusic;
// for controls movements
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let moveUp = false; 
let moveDown = false;
let moveVelocity = 2;


function setupThree() {
  controls = new PointerLockControls(camera, renderer.domElement);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const light = new THREE.HemisphereLight( 0xfdd8d2, 0x5675c9, 2 );
  scene.add( light );
  // const light1 = new THREE.AmbientLight(0xfdd8d2, 2);
  // scene.add(light1);

  spotLight = new THREE.SpotLight(0xFFBF00 , 2.5, WORLD_SIZE, PI / 1, 1.0, 0.05);
  spotLight.position.set(280, 300, 510);
  spotLight.castShadow = true;
  scene.add(spotLight);

  spotLight2 = new THREE.SpotLight(0xFFBF00 , 2.5, WORLD_SIZE, PI / 1, 1.0, 0.05);
  spotLight2.position.set(-140, 500, 140);
  spotLight2.castShadow = true;
  scene.add(spotLight2);

  // //target
  // spotLightTarget = getBox();
  // scene.add(spotLightTarget);
  // spotLightTarget.position.set(0, 50, 0);
  // spotLightTarget.scale.set(30, 30, 30);
  // spotLightTarget.material = new THREE.MeshBasicMaterial({
  //   color: 0xFF00FF
  // });
  // spotLightTarget.visible = false;

  // let sphere = getSphere();
  // sphere.scale.set(10, 10, 10);
  // spotLight2.add(sphere);

 // scene.background = new THREE.Color(0x999999);
  ground = createGround();
  scene.add(ground);


  sky = createSky();
  scene.add(sky);

 

 // createTemple();
  createStatue1();
  createStatue2();
  createMain();
  createFountain();
  //temples 
  createTemple(new THREE.Vector3(300, 280, 510), 0.025, 3, Math.PI/ 180* -4);
  createTemple(new THREE.Vector3(-270,342,-80), 0.025, 2, Math.PI/ 180);
  createTemple(new THREE.Vector3(200,200,100), 0.025, 6, Math.PI/ 180);

  //pillars
  createPillar(new THREE.Vector3(-190,300,250), 8);
  createPillar(new THREE.Vector3(-295,285,180), 7);
  createPillar(new THREE.Vector3(320, 190, 410), 7);

  //second style pillars
  createPillar2(new THREE.Vector3(-275,230,-30), 6);
  createPillar2(new THREE.Vector3(-315,230,-110), 6);
  createPillar2(new THREE.Vector3(230,100,140), 5);
  createPillar2(new THREE.Vector3(250,100,80), 5);

  //stairs
 // createStairs(new THREE.Vector3(338,235,-188), 25, Math.PI/2.3);

  //bushes near pillars main
  createBush1(new THREE.Vector3(-190,300,250), 90, Math.PI/ 180* 90);
  createBush1(new THREE.Vector3(-220,300,250), 80, Math.PI/ 180* 60);
  createBush1(new THREE.Vector3(-140,300,270), 70, Math.PI/ 180* 80);
  createBush1(new THREE.Vector3(-295,280,185), 80, Math.PI/ 180* 60);
  createBush1(new THREE.Vector3(-275,280,150), 80, Math.PI/ 180* 60);
  createBush1(new THREE.Vector3(-270,290,210), 70, Math.PI/ 180* 60);
  createBush1(new THREE.Vector3(-260,290,220), 70, Math.PI/ 180* 60);

  //bushes near temple1
  createBush1(new THREE.Vector3(320, 190, 400), 70, Math.PI/ 180* 60);
  createBush1(new THREE.Vector3(330, 190, 400), 60, Math.PI/ 180* 60);
  createBush1(new THREE.Vector3(350, 180, 400), 60, Math.PI/ 180* 60);

  //bushes near statue2
  createBush1(new THREE.Vector3(-470, 210, -210), 60, Math.PI/ 180* 60);
  createBush1(new THREE.Vector3(-460, 183, -170), 90, Math.PI/ 180* 60);

  //bushes fountain
  createBush1(new THREE.Vector3(-510, 230, -300), 70, Math.PI/ 180* 60);
  createBush1(new THREE.Vector3(-480, 225, -300), 70, Math.PI/ 180* 60);
  
  //trees
  //createTree(new THREE.Vector3(-340,220,-80), 25, Math.PI/ 180);
  // music 
  const listener = new THREE.AudioListener();
  camera.add(listener);
  backgroundMusic = new THREE.Audio(listener);
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load('assets/mystic.mp3', (buffer) => {
    backgroundMusic.setBuffer(buffer);
    backgroundMusic.setLoop(true);
    backgroundMusic.setVolume(2); // Adjust volume as needed

    createRandomBushes(50); 
    createRandomBushes1(100); 
  });


  camera.position.set(-400, 600, 400);
  camera.lookAt(0,200,0);


  // createCloud();
  const cloudLayers = createCloudLayers();
  scene.add(cloudLayers);
}



function updateThree() {
  updateClouds(); 
  //controls.update();

  // let angle = frame * 0.01;
  // let radDist = 500;
  // spotLightTarget.position.x = sin(angle) * radDist;
  // spotLightTarget.position.z = cos(angle) * radDist;
 
  // Update time
  time1 += 0.016; 
  // Calculate the sine wave offset
  const yOffset = Math.sin(time1 * frequency) * amplitude;

  camera.position.y += yOffset;

  if (moveForward) {
    controls.moveForward(moveVelocity);
  } else if (moveBackward) {
    controls.moveForward(-moveVelocity);
  }
  if (moveLeft) {
    controls.moveRight(-moveVelocity);
  } else if (moveRight) {
    controls.moveRight(moveVelocity);
  }
  if (moveUp) {
    camera.position.y += moveVelocity / 2;  // Slower vertical movement
  } else if (moveDown) {
    camera.position.y -= moveVelocity / 2; // Slower vertical movement
  }

  //horizontal boundary
  const boundaryLimit = WORLD_SIZE / 2 - 50; 
  camera.position.x = Math.max(-boundaryLimit, Math.min(boundaryLimit, camera.position.x));
  camera.position.z = Math.max(-boundaryLimit, Math.min(boundaryLimit, camera.position.z));

  // Prevent camera from going below ground level
  if (camera.position.y < 200) {
    camera.position.y = 200;
  }
  if (camera.position.y > 1500) {
    camera.position.y = 1500;
  }


}
 
function startBackgroundMusic() {
  if (backgroundMusic && !backgroundMusic.isPlaying) {
    backgroundMusic.play();
  }
}

function createGround() {
  const geometry = new THREE.PlaneGeometry(WORLD_SIZE,WORLD_SIZE,400,400);
  const textureLoader = new THREE.TextureLoader();
  const heightMap = textureLoader.load('assets/map5.png');
  const colorTexture = textureLoader.load('assets/rockkk.jpg');


  const material = new THREE.MeshStandardMaterial({
    color: 0x808080,
    side: THREE.DoubleSide,
    map: colorTexture,
    //wireframe: true,
    displacementMap: heightMap,
    displacementScale: 400, 
  })

  const mesh = new THREE.Mesh(geometry,material);
  mesh.rotation.x = -Math.PI/2;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.name = 'ground';
  return mesh; 
}


function createSky(){
  const textureLoader = new THREE.TextureLoader();
  const skyTexture = textureLoader.load("assets/skyOption.jpg");
  const geometry = new THREE.SphereGeometry(2000,32,16);
  const material = new THREE.MeshStandardMaterial({
    map: skyTexture,
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(geometry,material);
  return mesh; 
}

// function createTemple(){
//   const loader = new GLTFLoader();
//   const templeModel = loader.load('assets/temple.gltf');
// }

function createMain() {
  const loader = new GLTFLoader();
  loader.load('assets/kiosk.glb', (gltf) => {
    temple = gltf.scene;
    scene.add(temple);
    temple.position.set(-140, 375, 140);
    temple.scale.set(13, 13, 13);
    temple.rotation.z += Math.PI/ 180* 4;
    temple.rotation.y += Math.PI/ 180* -60;
     
  });
}

// function createTemple() {
//   const loader = new GLTFLoader();
//   loader.load('assets/temple2.glb', (gltf) => {
//     temple = gltf.scene;
//     scene.add(temple);
//     temple.position.set(300, 280, 510);
//     temple.scale.set(0.025, 0.025, 0.025);
//     temple.rotation.y += 3;
//     temple.rotation.z += Math.PI/ 180* -4;
     
//   });
// }

function createTemple(position, scale, rotationy, rotationz) {
  const loader = new GLTFLoader();
  loader.load('assets/temple2.glb', (gltf) => {
    const temple = gltf.scene.clone(); 
    scene.add(temple);
    temple.position.copy(position);
    temple.scale.set(scale, scale, scale);
    temple.rotation.y += rotationy;
    temple.rotation.z += rotationz;
  });
}


function createPillar(position, scale) {
  const loader = new GLTFLoader();
  loader.load('assets/column1.glb', (gltf) => {
    const pillar = gltf.scene.clone(); 
    scene.add(pillar);
    pillar.position.copy(position);
    pillar.scale.set(scale, scale, scale);
  });
}

function createPillar2(position, scale) {
  const loader = new GLTFLoader();
  loader.load('assets/column2.glb', (gltf) => {
    const pillar2 = gltf.scene.clone(); 
    scene.add(pillar2);
    pillar2.position.copy(position);
    pillar2.scale.set(scale, scale, scale);
  });
}

function createStairs(position, scale, rotation) {
  const loader = new GLTFLoader();
  loader.load('assets/stairs.glb', (gltf) => {
    const stair = gltf.scene.clone(); 
    scene.add(stair);
    stair.position.copy(position);
    stair.scale.set(scale, scale, scale);
    stair.rotation.y = rotation;
  });
}

function createBush1(position, scale, rotation) {
  const loader = new GLTFLoader();
  loader.load('assets/thyme_bush.glb', (gltf) => {
    const bush = gltf.scene.clone(); 
    scene.add(bush);
    bush.position.copy(position);
    bush.scale.set(scale, scale, scale);
    bush.rotation.y = rotation;
  });
}

//random bushes
function loadHeightmap() {
  return new Promise((resolve) => {
    const loader = new THREE.TextureLoader();
    loader.load('assets/map5.png', (texture) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = texture.image.width;
      canvas.height = texture.image.height;
      context.drawImage(texture.image, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      resolve(imageData);
    });
  });
}

async function createRandomBushes(count) {
  const heightmapData = await loadHeightmap();
  const loader = new GLTFLoader();
  loader.load('assets/thyme_bush.glb', (gltf) => {
    const bushTemplate = gltf.scene;

    for (let i = 0; i < count; i++) {
      const bush = bushTemplate.clone();

      // Random position within the world bounds
      const x = Math.random() * WORLD_SIZE - WORLD_SIZE / 2;
      const z = Math.random() * WORLD_SIZE - WORLD_SIZE / 2;

      // Calculate the y position based on the height map
      const y = getHeightAtPosition(x, z, heightmapData);

      bush.position.set(x, y, z);

      // Random scale and rotation
      const scale = 40 + Math.random() * 60; // Scale between 40 and 100
      bush.scale.set(scale, scale, scale);
      bush.rotation.y = Math.random() * Math.PI * 2;

      scene.add(bush);
    }
  });
}

async function createRandomBushes1(count) {
  const heightmapData = await loadHeightmap();
  const loader = new GLTFLoader();
  loader.load('assets/grass_04.glb', (gltf) => {
    const bushTemplate = gltf.scene;

    for (let i = 0; i < count; i++) {
      const bush = bushTemplate.clone();

      // Random position within the world bounds
      const x = Math.random() * WORLD_SIZE - WORLD_SIZE / 2;
      const z = Math.random() * WORLD_SIZE - WORLD_SIZE / 2;

      // Calculate the y position based on the height map
      const y = getHeightAtPosition(x, z, heightmapData);

      bush.position.set(x, y, z);

      // Random scale and rotation
      const scale = 15 + Math.random() * 25; // Scale between 40 and 100
      bush.scale.set(scale, scale, scale);
      bush.rotation.y = Math.random() * Math.PI * 2;

      scene.add(bush);
    }
  });
}


function getHeightAtPosition(x, z, heightmapData) {
  const width = heightmapData.width;
  const height = heightmapData.height;

  // Convert world coordinates to heightmap coordinates
  const hx = Math.floor((x + WORLD_SIZE / 2) / WORLD_SIZE * (width - 1));
  const hz = Math.floor((z + WORLD_SIZE / 2) / WORLD_SIZE * (height - 1));

  // Get the height value from the heightmap
  const index = (hz * width + hx) * 4; // 4 channels (RGBA)
  const heightValue = heightmapData.data[index] / 255; // Normalize to 0-1

  // Scale the height value to match the terrain
  return heightValue * 400; // Adjust this value to match your terrain's height scale
}





function createTree(position, scale, rotation) {
  const loader = new GLTFLoader();
  loader.load('assets/tree.glb', (gltf) => {
    const tree = gltf.scene.clone(); 
    scene.add(tree);
    tree.position.copy(position);
    tree.scale.set(scale, scale, scale);
    tree.rotation.z = rotation;
  });
}


function createStatue1() {
  const loader = new GLTFLoader();
  loader.load('assets/xenophon.glb', (gltf) => {
    statue1 = gltf.scene;
    scene.add(statue1);
    statue1.position.set(300, 248, 515);
    statue1.scale.set(3.5, 3.5, 3.5);
   // statue1.rotation.z += Math.PI/ 180* 2;
    statue1.rotation.y += Math.PI/ 180* -95;
  });
}

function createStatue2() {
  const loader = new GLTFLoader();
  loader.load('assets/aspasia.glb', (gltf) => {
    statue2 = gltf.scene;
    scene.add(statue2);
    statue2.position.set(-450, 200, -200);
    statue2.scale.set(50, 50, 50);
   // statue1.rotation.z += Math.PI/ 180* 2;
    statue2.rotation.y += Math.PI/ 180* -85;
  });
}

function createFountain() {
  const loader = new GLTFLoader();
  loader.load('assets/fountain.glb', (gltf) => {
    fountain = gltf.scene;
    scene.add(fountain);
    fountain.position.set(-510, 255, -390);
    fountain.scale.set(0.15,0.15,0.15);
    fountain.rotation.z += Math.PI/ 180* -2;
    fountain.rotation.y += Math.PI/ 180* -85;
  });
}

function getSphere() {
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshBasicMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function getBox() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true; //default is false
  mesh.receiveShadow = true;
  return mesh;
}


function createCloudLayers() {
    const cloudTexture = new THREE.TextureLoader().load('assets/cloud.png');
    const cloudMaterial = new THREE.MeshLambertMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.65,
        depthWrite: false
    });
    const cloudGroup = new THREE.Group();
    const layerCount = 6;
    const layerHeight = 40;
    const groundSize = 2000;
    const minRadius = (Math.sqrt(2 * groundSize * groundSize) / 2) * 0.6;
    const maxRadius = minRadius * 1.5;

    for (let i = 0; i < layerCount; i++) {
        const layer = new THREE.Group();
        const cloudCount = 45;
        for (let j = 0; j < cloudCount; j++) {
            const cloudGeometry = new THREE.PlaneGeometry(600, 600);
            const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
            const angle = Math.random() * Math.PI * 2;
            const radius = minRadius + Math.random() * (maxRadius - minRadius);
            cloud.position.set(
                Math.cos(angle) * radius,
                Math.random() * layerHeight,
                Math.sin(angle) * radius
            );
            cloud.rotation.x = -Math.PI / 2;
            cloud.rotation.z = Math.random() * Math.PI * 2;
            const scale = 0.8 + Math.random() * 0.4;
            cloud.scale.set(scale, scale, scale);
            layer.add(cloud);
        }
        layer.position.y = i * layerHeight;
        cloudGroup.add(layer);
        cloudLayers.push(layer); // Store each layer in the array
    }
    return cloudGroup;
}

function updateClouds() {
    const time = Date.now() * 0.0002;
    cloudLayers.forEach((layer, index) => {
        const speed = 0.4 + index * 0.05; // Different speed for each layer
        const radius = 50 + index * 10; // Different radius for each layer
        layer.position.x = Math.cos(time * speed) * radius;
        layer.position.z = Math.sin(time * speed) * radius;
        
        // Rotate individual clouds
        layer.children.forEach((cloud, cloudIndex) => {
            cloud.rotation.z += 0.0001 * (cloudIndex % 2 === 0 ? 1 : -1); // Alternate rotation direction
        });
    });
  }





//controls
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);


function onKeyDown(event) {
 controls.lock(); // *** this should be triggered by user interaction
 switch (event.code) {
   case 'ArrowUp':
   case 'KeyW':
     moveForward = true;
     break;
   case 'ArrowLeft':
   case 'KeyA':
     moveLeft = true;
     break;
   case 'ArrowDown':
   case 'KeyS':
     moveBackward = true;
     break;
   case 'ArrowRight':
   case 'KeyD':
     moveRight = true;
     break;
   case 'Space' :
    moveUp = true;
    break;
  case 'ShiftLeft':
    moveDown = true;
    break;
 }
};


function onKeyUp(event) {
 switch (event.code) {
   case 'ArrowUp':
   case 'KeyW':
     moveForward = false;
     break;
   case 'ArrowLeft':
   case 'KeyA':
     moveLeft = false;
     break;
   case 'ArrowDown':
   case 'KeyS':
     moveBackward = false;
     break;
   case 'ArrowRight':
   case 'KeyD':
     moveRight = false;
     break;
   case 'Space' : 
    moveUp = false;
    break;
   case 'ShiftLeft' :
    moveDown = false; 
    break;
 }
};

document.addEventListener('click', startBackgroundMusic);

