import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('silver');

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 30, 5);

let constrain = true;
function constrainCamera() {
    if (constrain) {
        camera.position.x = THREE.MathUtils.clamp(camera.position.x, -15, 15);
        camera.position.z = THREE.MathUtils.clamp(camera.position.z, -15, 15);
    }
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
let material1 = new THREE.MeshPhongMaterial({ map: imageTexture, shininess: 10, specular: '#ffffff' });

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
        new THREE.MeshPhongMaterial({ map: imageTextures[0], specular: '#ffffff' }),
        new THREE.MeshPhongMaterial({ map: imageTextures[1], specular: '#ffffff' }),
        new THREE.MeshPhongMaterial({ map: imageTextures[2], specular: '#ffffff' }),
        new THREE.MeshPhongMaterial({ map: imageTextures[3], specular: '#ffffff' }),
        new THREE.MeshPhongMaterial({ map: imageTextures[4], specular: '#ffffff' }),
        new THREE.MeshPhongMaterial({ map: imageTextures[5], specular: '#ffffff' })
    ];

    cube.material.needsUpdate = true;
}

//lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

// Add an ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

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
    const materialPlane = new THREE.MeshPhongMaterial({ color: 'grey', shininess: 5 });

    floor = new THREE.Mesh(plane, materialPlane);
    floor.position.set(pos.x, pos.y, pos.z);
    scene.add(floor);
}

function createWall() {
    let size = { x: 39, y: 39, z: 0.4 };

    const materialWall = new THREE.MeshPhongMaterial({ color: 'silver', shininess: 5 });

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
    let pos = { x: 0, y: 1, z: 0 };

    const box = new THREE.BoxGeometry(size.x, size.y, size.z);

    cube = new THREE.Mesh(box, material1);
    cube.position.set(pos.x, pos.y, pos.z);
    scene.add(cube);
}

let balls = [];
function createSphere(location, color, radius) {
    const sphere = new THREE.SphereGeometry(radius, 32, 32);
    const materialSphere = new THREE.MeshPhongMaterial({ color: color, shininess: 5, emissive: '#333333', specular: '#ffffff' });

    ball = new THREE.Mesh(sphere, materialSphere);
    ball.position.copy(location);
    ball.position.y += radius / 2;
    scene.add(ball);

    balls.push(ball);
}

let octahedrons = [];
function createOctahedron(location, color) {
    const geoOct = new THREE.OctahedronGeometry(0.5);
    const materialOct = new THREE.MeshPhongMaterial({ color: color, shininess: 5, specular: '#ffffff' });

    const octahedron = new THREE.Mesh(geoOct, materialOct);
    octahedron.position.copy(location);
    scene.add(octahedron);

    return octahedron;
}

function createTorus(position) {
    const torus = new THREE.TorusGeometry(0.2, 0.1, 16, 100);
    const materialTorus = new THREE.MeshPhongMaterial({ color: 'white', shininess: 5, specular: '#ffffff' });

    ring = new THREE.Mesh(torus, materialTorus);
    ring.position.copy(position);
    ring.position.y += 1;
    scene.add(ring);
}

function createCapsule(position) {
    const cap = new THREE.CapsuleGeometry(0.1, 0.3, 10, 20);
    const materialCap = new THREE.MeshPhongMaterial({ color: 'white', shininess: 5, specular: '#ffffff' });

    capsule = new THREE.Mesh(cap, materialCap);
    capsule.position.copy(position);
    capsule.position.y += 1;
    scene.add(capsule);
}

function createMultiple() {
    const floorSize = 35;
    const minDistance = 5;
    const num = 6;
    let radius = 2;
    let radiusIn = 0.3;

    const ballColors = ['yellow', 'blue', 'green', 'red', 'orange', 'purple'];

    for (let i = 0; i < num; i++) {
        let validPosition = false;
        let newModel;

        while (!validPosition) {
            const posX = Math.random() * floorSize - floorSize / 2;
            const posY = -0.5;
            const posZ = Math.random() * floorSize - floorSize / 2;

            const location = new THREE.Vector3(posX, posY, posZ);
            const distFromCenter = location.distanceTo(new THREE.Vector3(0, 0, 0));

            // Check if the new position is at least 5 units away from existing models and from the center
            let tooClose = false;
            for (let j = 0; j < octahedrons.length; j++) {
                const distBetweenModels = location.distanceTo(octahedrons[j].position);
                if (distBetweenModels < minDistance || distFromCenter < minDistance) {
                    tooClose = true;
                    break;
                }
            }

            if (!tooClose) {
                const color = ballColors[i];
                createSphere(location, color, radius);
                radius += radiusIn;
                newModel = createOctahedron(location, color);
                octahedrons.push(newModel);
                validPosition = true;
            }
        }
    }
}

let rotate = false;
let rotateScene = false;

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

    if (rotateScene) {
        scene.rotation.y += 0.01;
    }

    for (let i = 0; i < octahedrons.length; i++) {
        octahedrons[i].rotation.y += 0.05;
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
let pickToggle = document.getElementById('item_pick');
let rotToggle = document.getElementById('item_rotate');
let unlockButton = document.getElementById('unlock')
let enterButton = document.getElementById('enter');
let wordsUnlock = document.getElementById('wordsUnlock');
let escaped = document.getElementById('wordsPass');
let partyMode = document.getElementById('effectCon');
let party = document.getElementById('wordsParty');
let submit = document.getElementById('submit');
let userId = document.getElementById('user');
let getResults = document.getElementById('showResults');

let passwordInput1 = document.getElementById('password1');
let passwordInput2 = document.getElementById('password2');
let passwordInput3 = document.getElementById('password3');
let passwordInput4 = document.getElementById('password4');
let passwordInput5 = document.getElementById('password5');
let passwordInput6 = document.getElementById('password6');

const failSound = new Audio("https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3");
const unlockSound = new Audio("https://codeskulptor-demos.commondatastorage.googleapis.com/descent/spring.mp3");
const successSound = new Audio("https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg");
const getKey = new Audio("https://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a");

pickToggle.addEventListener('click', () => {
    pickImage();
});

rotToggle.addEventListener('click', () => {
    rotate = !rotate;
});

unlockButton.addEventListener('click', () => {
    let boxValue1 = unlockPassword1.value.toUpperCase();
    let boxValue2 = unlockPassword2.value.toUpperCase();
    let boxValue3 = unlockPassword3.value.toUpperCase();
    let boxValue4 = unlockPassword4.value.toUpperCase();
    let boxValue5 = unlockPassword5.value.toUpperCase();
    let boxValue6 = unlockPassword6.value.toUpperCase();

    unlockPassword1.value = '';
    unlockPassword2.value = '';
    unlockPassword3.value = '';
    unlockPassword4.value = '';
    unlockPassword5.value = '';
    unlockPassword6.value = '';

    if (
        boxValue1 === "B" &&
        boxValue2 === "Y" &&
        boxValue3 === "P" &&
        boxValue4 === "R" &&
        boxValue5 === "O" &&
        boxValue6 === "G"
    ) {
        getKey.play();

        pickToggle.style.display = 'block';
        rotToggle.style.display = 'block';

        unlockButton.innerText = "☑️"
        unlockButton.disabled = true;
        wordsUnlock.innerText = "BOX UNWRAPPED!"

    } else {
        failSound.play();
    }
})

enterButton.addEventListener('click', () => {
    let enteredValue1 = passwordInput1.value;
    let enteredValue2 = passwordInput2.value;
    let enteredValue3 = passwordInput3.value;
    let enteredValue4 = passwordInput4.value;
    let enteredValue5 = passwordInput5.value;
    let enteredValue6 = passwordInput6.value;

    passwordInput1.value = '';
    passwordInput2.value = '';
    passwordInput3.value = '';
    passwordInput4.value = '';
    passwordInput5.value = '';
    passwordInput6.value = '';

    if (enteredValue1 === '0' &&
        enteredValue2 === '0' &&
        enteredValue3 === '1' &&
        enteredValue4 === '0' &&
        enteredValue5 === '1' &&
        enteredValue6 === '1') {

        constrain = false;
        rotateScene = true;

        camera.position.set(100, 100, 5);

        stopTimer()

        confetti({
            particleCount: 200,
            spread: 300,
            origin: { y: 0.5 },
        });

        unlockSound.play();

        setTimeout(function () {
            successSound.play();
        }, 1500);

        enterButton.innerText = "🗝️"
        enterButton.disabled = true;
        escaped.innerText = "ESCAPE SUCCESS!"

        party.style.display = 'block';
        partyMode.style.display = 'block';
        userId.style.display = 'block';
        submit.style.display = 'block';
        getResults.style.display = 'block';

    } else {
        failSound.play();
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

            if (octahedronColor === 0xFFFF00 || octahedronColor === 0xFF0000 || octahedronColor === 0x0000FF) {
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

////////////////////auto timer////////////////////
////////////////////auto timer////////////////////
////////////////////auto timer////////////////////
let timer = { minutes: 0, seconds: 0 };
let timerInterval;

function formatTime(value) {
    let formattedValue = '';
    if (value < 10) {
        formattedValue = '0' + value;
    } else {
        formattedValue = '' + value;
    }
    return formattedValue;
}

function setTimer() {
    const minutes = formatTime(timer.minutes);
    const seconds = formatTime(timer.seconds);
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.textContent = "_" + minutes + ":" + seconds;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer.seconds++;

        if (timer.seconds === 60) {
            timer.seconds = 0;
            timer.minutes++;

            if (timer.minutes === 60) {
                timer.minutes = 0;
                timer.hours++;
            }
        }

        setTimer();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}


window.addEventListener('load', () => {
    startTimer();

    partyMode.addEventListener('click', () => {
        confetti({
            particleCount: 300,
            spread: 300,
            origin: { y: 0.5 },
        });
        successSound.play();
    })

    ////////////////////see results////////////////////
    ////////////////////see results////////////////////
    ////////////////////see results////////////////////
    submit.addEventListener('click', () => {
        let id = userId.value;
        let minutes = formatTime(timer.minutes);
        let seconds = formatTime(timer.seconds);
        console.log(id);

        if (id.trim() !== '') {
            let data = {
                "userID": id,
                "minutes": minutes,
                "seconds": seconds
            }
            let jsonData = JSON.stringify(data);

            fetch('/userData', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: jsonData
            })
                .then(response => response.json())
                .then(data => { console.log(data) })
        }
        userId.value = '';
    })

    getResults.addEventListener('click', () => {
        fetch('/storageData')
            .then(response => response.json())
            .then(data => {
                console.log(data.data)
                document.getElementById('displayResults').innerHTML = '';
                data.data.reverse();

                for (let i = 0; i < data.data.length; i++) {
                    let string = data.data[i].ID + " NAILED the game in " + data.data[i].timeM + " minutes " + data.data[i].timeS + " seconds, " + data.data[i].date;
                    let element = document.createElement('p');
                    element.innerHTML = string;
                    document.getElementById('displayResults').appendChild(element);
                }
            })
    })
});

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
