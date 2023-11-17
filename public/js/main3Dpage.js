import * as THREE from 'three';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const APP_URL = 'http://127.0.0.1:5173'

const scene = new THREE.Scene()
scene.background = new THREE.Color("hsl(210, 10%, 11%)")

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(2.04, 1.76, 3.12)

const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('main-canvas')})

const dLight1 = new THREE.DirectionalLight(0xffffff)
dLight1.position.set(0, 5, 5)
scene.add(dLight1)

const dLight2 = new THREE.DirectionalLight(0xffffff)
dLight2.position.set(0, 5, -5)
scene.add(dLight2)

const dLight3 = new THREE.DirectionalLight(0xffffff)
dLight2.position.set(5, 0, 5)
scene.add(dLight3)

const controls = new OrbitControls(camera, renderer.domElement)
controls.target = new THREE.Vector3(0, 0.525, 0)
controls.enabled = false
controls.autoRotate = true
controls.update()
controls.enableDamping = true

const loader = new GLTFLoader();
loader.load(APP_URL + '/public/3d_models/VertebraColumnDone.glb', function (gltf) {
    const obj = gltf.scene
    scene.add(obj)
})



const canvas = document.getElementById('main-canvas')
canvas.addEventListener('click', onMouseMove, false);
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
    }
}

function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
}

function animate() {
    requestAnimationFrame(animate)
    resizeCanvasToDisplaySize()
    controls.update()
    renderer.render(scene, camera)
    console.log(scene.children)
}
animate();
