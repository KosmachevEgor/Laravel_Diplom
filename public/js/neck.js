import * as THREE from 'three';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';


const objURL = document.getElementById('object').getAttribute('data-attr');
console.log(objURL);


const APP_URL = 'http://127.0.0.1:8000';
const container = document.getElementById('container1');
//////////SCENEBLOCK/////////////////////
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfe3dd);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(1, .3, 1);
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas1')});
const dLight1 = new THREE.DirectionalLight(0xffffff);
dLight1.position.set(0, 5, 5);
scene.add(dLight1);
const dLight2 = new THREE.DirectionalLight(0xffffff);
dLight2.position.set(0, 5, -5);
scene.add(dLight2);
const dLight3 = new THREE.DirectionalLight(0xffffff);
dLight2.position.set(5, 0, 5);
scene.add(dLight3);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 0, 0);
controls.enabled = false;
controls.minDistance = 1;
controls.maxDistance = 2;
controls.update();
controls.enableDamping = true;
//////////////////////////////
const loader = new GLTFLoader();
loader.load(objURL, function (gltf) {
    const obj = gltf.scene;
    scene.add(obj);
});
const button360 = document.createElement('button');
button360.style.cssText = 'position: absolute;left: 35%;top: calc(var(--index)*.5);' +
    ' border-radius: calc(var(--index)*0.75); width: calc(var(--index)*2.5); height: calc(var(--index)*1.5);' +
    'font-size: calc(var(--index)*0.75); transform: translate:(-50%,0)';
button360.innerHTML = '360°';
container.append(button360);

button360.addEventListener('click', () => {
    if (!controls.enabled) {
        controls.enabled = true;
        button360.style.color = 'white';
        button360.style.backgroundColor = 'green';
    } else {
        controls.enabled = false;
        button360.style.color = 'red';
        button360.style.backgroundColor = 'white';
    }
});

const canvas = document.getElementById('canvas1');
const divChanging = document.getElementById('changingInfo');
divChanging.id = 'changingText';
divChanging.style.cssText = 'position: absolute; left: 70.1%;' +
    'border: 1px solid white;';
divChanging.style.pointerEvents = 'true';
divChanging.hidden = true;

const infoDiv = document.createElement('div');
infoDiv.style.cssText = 'color: black; position: absolute; left: 1px; top: 1px; background: rgba(255, 255, 0, 0.4);';

infoDiv.innerHTML = '<p style="font-size: calc(var(--index)*0.5)">Для получения информации нажмите <br> на интересующую вас область</p>'
container.append(infoDiv);

canvas.addEventListener('click', onMouseMove, false);
var infoArray = new Map([
    //Neck
    ['C1', 'infoC1'],
    ['C2', 'infoC2'],
    ['C3', 'infoC3'],
    ['C4', 'infoC4'],
    ['C5', 'infoC5'],
    ['C6', 'infoC6'],
    ['C7', 'infoC7'],
    ['Disk', 'infoDisk'],
    //Disk
    ['Plast', 'PlastInfo'],
    ['ClosePlast', 'ClosePlastInfo'],
    ['Rings', 'RingsInfo'],
    ['Rings', 'RingsInfo'],
    ['Core', 'CoreInfo'],
    ['Shell', 'ShellInfo'],
]);
var objectArray = new Map([
    ['disk1', 'Disk'],
    ['disk2', 'Disk'],
    ['disk3', 'Disk'],
    ['disk4', 'Disk'],
    ['disk5', 'Disk'],
    ['Cube_6', 'Plast'],
    ['Cube_5', 'ClosePlast'],
    ['Cube_4', 'Rings'],
    ['Cube_3', 'Rings'],
    ['Cube_2', 'Core'],
    ['Cube_1', 'Shell'],
    ['C1', 'C1'],
    ['C2', 'C2'],
    ['C3', 'C3'],
    ['C4', 'C4'],
    ['C5', 'C5'],
    ['C6', 'C6'],
    ['C7', 'C7'],
]);
const header = document.createElement("h2");
const content = document.createElement('p');
const changingLink = document.createElement('a');
divChanging.append(header);
divChanging.append(content);
divChanging.append(changingLink);

function onMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const mouseVector = new THREE.Vector3(x, y, 0.5);
    mouseVector.unproject(camera);
    const raycaster = new THREE.Raycaster(camera.position, mouseVector.sub(camera.position).normalize());
    const objectsToCheck = scene.children.filter(child => !(child instanceof THREE.Light || child instanceof THREE.Line));

    const intersects = raycaster.intersectObjects(objectsToCheck);
    if (intersects.length > 0) {
        const firstIntersect = intersects[0];
        console.log(firstIntersect);
        divChanging.hidden = false;
        if(objectArray.get(firstIntersect.object.name) === 'Disk'){
            changingLink.href = 'http://127.0.0.1:8000/excursion3d/Intervertebral%20disc';
        } else if(objectArray.get(firstIntersect.object.name) === 'Plast'){
            changingLink.href = 'http://127.0.0.1:8000/excursion3d/Nucleus%20pulposus';
        } else if(objectArray.has(firstIntersect.object.name)){
            changingLink.href = 'http://127.0.0.1:8000/excursion3d/Vertebra';
        }
        changingLink.innerText = 'See this 3D model';
        content.innerText = infoArray.get(objectArray.get(firstIntersect.object.name));
        header.innerText = objectArray.get(firstIntersect.object.name);
    }
}
function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}
function animate() {
    requestAnimationFrame(animate);
    resizeCanvasToDisplaySize();
    controls.update();
    renderer.render(scene, camera);
}
animate();
/*function convertToGlobal(div, camera) {
    const rect = div.getBoundingClientRect();
    const divX = rect.left;
    const divY = rect.top;
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    const normalizedX = (divX / canvasWidth) * 2 - 1;
    const normalizedY = (divY / canvasHeight) * -2 + 1;
    const vector = new THREE.Vector3(normalizedX, normalizedY, .75);
    return vector.unproject(camera);
}*/
