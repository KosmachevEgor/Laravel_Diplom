import * as THREE from 'three'
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as TWEEN from '@tweenjs/tween.js'

const APP_URL = 'http://127.0.0.1:5173'

const scene = new THREE.Scene()
scene.background = new THREE.Color("hsl(208, 18%, 39%)")

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0.6, 0.27, 1)
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('main-canvas') })
const helper = new THREE.AxesHelper
scene.add(helper)
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
controls.target = new THREE.Vector3(0, 0, 0)
controls.enabled = true
controls.autoRotate = false
controls.update()
controls.enableDamping = true

const loader = new GLTFLoader()
let neck
loader.load(APP_URL + '/public/3d_models/Neck.glb', function (gltf) {
    const obj = gltf.scene
    neck = obj
    scene.add(neck)
})

const canvas = document.getElementById('main-canvas')
canvas.style.border = '2px solid red'

function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
}
function animate(time) {
    requestAnimationFrame(animate)
    resizeCanvasToDisplaySize()
    controls.update()
    TWEEN.update(time)
    renderer.render(scene, camera)
}

animate()
