import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('silver');

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 30, 5);

function constrainCamera() {
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -17, 17);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -17, 17);
}

//render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//orbitControl
const controls = new OrbitControls(camera, renderer.domElement);
controls.listenToKeyEvents(window);
controls.enablePan = false;
controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = Math.PI / 2;

//material
let img = './image/PIC1.png';
let imageLoader = new THREE.TextureLoader();
let imageTexture = imageLoader.load(img);
let material1 = new THREE.MeshPhongMaterial({ map: imageTexture });

function pickImage() {
    const imgs = ['./image/1.png', './image/2.png', './image/3.png', './image/4.png', './image/5.png', './image/6.png'];

    img = imgs.shift();
    imgs.push(img);

    let imageTextures = [];
    const imageLoader = new THREE.TextureLoader();

    imgs.forEach(image => {
        const texture = imageLoader.load(image);
        imageTextures.push(texture);
    });

    cube.material = [
        new THREE.MeshPhongMaterial({ map: imageTextures[0] }),
        new THREE.MeshPhongMaterial({ map: imageTextures[1] }),
        new THREE.MeshPhongMaterial({ map: imageTextures[2] }),
        new THREE.MeshPhongMaterial({ map: imageTextures[3] }),
        new THREE.MeshPhongMaterial({ map: imageTextures[4] }),
        new THREE.MeshPhongMaterial({ map: imageTextures[5] })
    ];

    cube.material.needsUpdate = true;
}

//lighting
const pointLight = new THREE.AmbientLight(0xffffff, 2.0);
pointLight.position.set(400, 200, 300);
scene.add(pointLight);

////////////////////objects////////////////////
////////////////////objects////////////////////
////////////////////objects////////////////////

let floor;
let cube;
let ball;
let octahedron;
let ring;
let capsule;
let text;

//text//
// function createText(location) {
//     const loader = new FontLoader();

//     loader.load('./Roboto Medium_Regular.json', function (font) {

//         const geometry = new TextGeometry('1', {
//             font: font,
//             size: 0.5,
//             height: 0,
//         });

//         const material = new THREE.MeshBasicMaterial({ color: 'white' });
//         const textMesh = new THREE.Mesh(geometry, material);

//         textMesh.position.copy(location);
//         textMesh.position.y += 1;

//         scene.add(textMesh);
//     });
// }

function createFloor() {
    let size = { x: 40, y: 0.4, z: 40 };
    let pos = { x: 0, y: -2.5, z: 0 };

    const plane = new THREE.BoxGeometry(size.x, size.y, size.z);
    const materialPlane = new THREE.MeshPhongMaterial({ color: 'grey', wireframe: false, side: THREE.BackSide });

    floor = new THREE.Mesh(plane, materialPlane);
    floor.position.set(pos.x, pos.y, pos.z);
    scene.add(floor);
}

function createWall() {
    let size = { x: 39, y: 39, z: 0.4 };

    const materialWall = new THREE.MeshPhongMaterial({ color: 'grey' });

    const wallR = new THREE.Mesh(new THREE.BoxGeometry(size.x, size.y, size.z), materialWall);
    wallR.position.set(0, 18, 20);

    const wallL = new THREE.Mesh(new THREE.BoxGeometry(size.z, size.x, size.y), materialWall);
    wallL.position.set(-20, 18, 0);

    const wallD = new THREE.Mesh(new THREE.BoxGeometry(size.z, size.x, size.y), materialWall);
    wallD.position.set(20, 18, 0);

    const wallT = new THREE.Mesh(new THREE.BoxGeometry(size.x, size.y, size.z), materialWall);
    wallT.position.set(0, 18, -20);

    scene.add(wallR, wallT, wallL, wallD);
}

function createBox() {
    let size = { x: 3, y: 3, z: 3 };
    let pos = { x: 0, y: 0, z: 0 };

    const box = new THREE.BoxGeometry(size.x, size.y, size.z);

    cube = new THREE.Mesh(box, material1);
    cube.position.set(pos.x, pos.y, pos.z);
    scene.add(cube);
}

let balls = [];
function createSphere(location, color) {
    let radius = 2;

    const sphere = new THREE.SphereGeometry(radius, 32, 32);
    const materialSphere = new THREE.MeshPhongMaterial({ color: color, shininess: 20, });

    ball = new THREE.Mesh(sphere, materialSphere);
    ball.position.copy(location);
    scene.add(ball);

    balls.push(ball);
}

let octahedrons = [];
function createOctahedron(location, color) {
    const geoOct = new THREE.OctahedronGeometry(0.5);
    const materialOct = new THREE.MeshPhongMaterial({ color: color, shininess: 20 });

    const octahedron = new THREE.Mesh(geoOct, materialOct);
    octahedron.position.copy(location);
    scene.add(octahedron);

    return octahedron;
}

function createTorus(position) {
    const torus = new THREE.TorusGeometry(0.2, 0.1, 16, 100);
    const materialTorus = new THREE.MeshPhongMaterial({ color: 'white' });

    ring = new THREE.Mesh(torus, materialTorus);
    ring.position.copy(position);
    ring.position.y += 1;
    scene.add(ring);
}

function createCapsule(position) {
    const cap = new THREE.CapsuleGeometry(0.1, 0.3, 10, 20);
    const materialCap = new THREE.MeshPhongMaterial({ color: 'white' });

    capsule = new THREE.Mesh(cap, materialCap);
    capsule.position.copy(position);
    capsule.position.y += 1;
    scene.add(capsule);
}

function createMultiple() {
    const floorSize = 35;
    const num = 6;

    const ballColors = ['yellow', 'blue', 'green', 'red', 'orange', 'purple'];

    for (let i = 0; i < num; i++) {
        const posX = Math.random() * floorSize - floorSize / 2;
        const posY = -0.5;
        const posZ = Math.random() * floorSize - floorSize / 2;

        const location = new THREE.Vector3(posX, posY, posZ);
        const color = ballColors[i];
        createSphere(location, color);
        const oct = createOctahedron(location, color);
        octahedrons.push(oct);
    }
}

let rotate = false;
function animate() {
    requestAnimationFrame(animate);

    //orbitControl
    controls.update();
    renderer.render(scene, camera);

    //rotate cube
    if (rotate) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }

    constrainCamera();
}

////////////////////render////////////////////
////////////////////render////////////////////
////////////////////render////////////////////
createFloor();
createWall();
createBox();
createMultiple();

animate();

////////////////////ANSWER////////////////////
////////////////////ANSWER////////////////////
////////////////////ANSWER////////////////////
let pickToggle = document.getElementById("item_pick");
let rotToggle = document.getElementById("item_rotate");
let enterButton = document.getElementById('enter');
let passwordInput = document.getElementById('password');

pickToggle.addEventListener('click', () => {
    pickImage();
});

rotToggle.addEventListener('click', () => {
    rotate = !rotate;
});

enterButton.addEventListener('click', () => {
    let enteredValue = passwordInput.value;

    if (enteredValue === '100111') {
        alert('ENSCAPE SUCCESS!!');

    } else {
        alert('BBB... WRONG KEY...');
    }
});

////////////////////raycaster////////////////////
////////////////////raycaster////////////////////
////////////////////raycaster////////////////////
let orbitEnabled = true;
let selectedObject = null;
let dragging = false;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function toggleOrbitControls(enabled) {
    controls.enabled = enabled;
    orbitEnabled = enabled;
}

window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);

function onMouseDown(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    for (let i = 0; i < octahedrons.length; i++) {
        const intersects = raycaster.intersectObject(octahedrons[i]);

        if (intersects.length > 0) {
            const clickedOct = intersects[0].object;
            const octahedronColor = octahedrons[i].material.color.getHex();

            if (octahedronColor === 0x0000ff || octahedronColor === 0x800080) {
                createTorus(clickedOct.position);
            } else {
                createCapsule(clickedOct.position);
            }
        }
    }

    // Define objects to be intersected for dragging
    const draggableObjects = [cube, ...balls];
    const draggableIntersects = raycaster.intersectObjects(draggableObjects, true);

    if (draggableIntersects.length > 0) {
        selectedObject = draggableIntersects[0].object;
        dragging = true;

        toggleOrbitControls(false);
    }
}

function onMouseMove(event) {
    if (dragging && selectedObject) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        if (selectedObject === cube) {
            const intersects = raycaster.intersectObject(floor);

            if (intersects.length > 0) {
                const intersectPoint = intersects[0].point;
                selectedObject.position.x = intersectPoint.x;
                selectedObject.position.z = intersectPoint.z;
            }
        } else {
            for (let i = 0; i < balls.length; i++) {
                if (selectedObject === balls[i]) {
                    const intersects = raycaster.intersectObject(floor);

                    if (intersects.length > 0) {
                        const intersectPoint = intersects[0].point;
                        selectedObject.position.x = intersectPoint.x;
                        selectedObject.position.z = intersectPoint.z;
                    }
                }
            }
        }
    }
}

function onMouseUp() {
    dragging = false;
    selectedObject = null;

    toggleOrbitControls(true);
}

////////////////////windowsize////////////////////
////////////////////windowsize////////////////////
////////////////////windowsize////////////////////
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
});
