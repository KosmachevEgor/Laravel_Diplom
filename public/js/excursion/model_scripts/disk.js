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

const loader = new GLTFLoader();
let models = []
loader.load(APP_URL + '/public/3d_models/Disk.glb', function (gltf) {
    const obj = gltf.scene
    models.push(obj)
    scene.add(obj)
    obj.children[0].children.forEach(item =>{
        item.material.transparent = true
        item.material.opacity = 0
        new TWEEN.Tween(item.material)
        .to({opacity: 1}, 500)
        .start()
    })
})

const canvas = document.getElementById('main-canvas')

var infoDiv = document.getElementById('info-div')
var title = document.getElementById('title')
var infoText = document.getElementById('info-text')

//MouseEvents
var timeout
var clickHandled = false
var lastClickedObject = null

function handleMouseDown() {
    timeout = setTimeout(function () {
        console.log("Long Click")
        clickHandled =true;
    }, 2000);
}
function handleMouseUp(event) {
    clearTimeout(timeout);

    if (!clickHandled) {
        const rect = canvas.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
        const mouseVector = new THREE.Vector3(x, y, 0.5)
        mouseVector.unproject(camera)
        const raycaster = new THREE.Raycaster(camera.position, mouseVector.sub(camera.position).normalize())
        const objectsToCheck = scene.children.filter(child => !(child instanceof THREE.Light || child instanceof THREE.Line))
        const intersects = raycaster.intersectObjects(objectsToCheck)
        const objects = objectsToCheck[0].children

        objects.forEach(item => {
            if (item.initialY === undefined) {
                item.initialY = item.position.y
            }
        })

        if (intersects.length > 0) {
            const firstIntersect = intersects[0].object
            if (lastClickedObject !== firstIntersect)
            {
                objects.forEach(item => {
                    new TWEEN.Tween(item.position)
                        .to({ y: item.initialY }, 2000)
                        .easing(TWEEN.Easing.Cubic.InOut)
                        .onComplete(() => {
                            if (item != firstIntersect) {
                                new TWEEN.Tween(item.position)
                                    .to({ y: item.position.y + (item.position.y > firstIntersect.position.y ? 0.5 : -0.5) }, 2000)
                                    .easing(TWEEN.Easing.Cubic.InOut)
                                    .start()
                            }
                        })
                        .start()
                });

                $.ajax({
                    url: 'http://127.0.0.1:8000/getAjax/' + firstIntersect.name,
                    type: 'GET',
                    success: function(data) {
                        title.innerText = firstIntersect.name
                        infoText.innerText = data[0].part_info
                        var coords = { x: canvas.width, y: 0 }
                        var infoDivWidth = infoDiv.getBoundingClientRect().width;
                        console.log(infoDivWidth)
                        new TWEEN.Tween(coords)
	                    .to({ x: canvas.width - infoDivWidth, y: 0 }, 1000)
                        .easing(TWEEN.Easing.Quadratic.Out)
	                    .onUpdate(function() {
		                infoDiv.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)')
	                    })
	                    .start()
                    }
               })
                lastClickedObject = firstIntersect;
            }
            else
            {
                objects.forEach(item => {
                    new TWEEN.Tween(item.position)
                        .to({ y: item.initialY }, 2000)
                        .easing(TWEEN.Easing.Cubic.InOut)
                        .start()
                })
                lastClickedObject = null;
            }
        }
    }
    clickHandled = false;
}
canvas.addEventListener('mousedown', handleMouseDown)
canvas.addEventListener('mouseup', handleMouseUp)

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
    TWEEN.update(time);
    renderer.render(scene, camera)
}

animate()
