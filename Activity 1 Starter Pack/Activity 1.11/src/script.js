import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import helvetiker from 'three/examples/fonts/helvetiker_regular.typeface.json'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
* Fonts + text + donuts hehe 
*/
const fontLoader = new FontLoader()

const font = fontLoader.parse(helvetiker)

// Matcap chubaness
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
material.wireframe = false

//3d text
const textGeometry = new TextGeometry(
    'Cassandra  Mae',
    {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
    }
)
textGeometry.center()
const text = new THREE.Mesh(textGeometry, material)
scene.add(text)

// gui db 
const params = {
    spinX: 0.3,
    spinY: 0.2,
    text: 'Cassandra  Mae'
}

function updateTextGeometry() {
    const newGeometry = new TextGeometry(
        params.text,
        {
            font: font,
            size: 0.5,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        }
    )
    newGeometry.center()
    text.geometry.dispose()
    text.geometry = newGeometry
}

gui.add(material, 'wireframe')
gui.add(params, 'spinX').min(0).max(2).step(0.01).name('star spin X')
gui.add(params, 'spinY').min(0).max(2).step(0.01).name('star spin Y')
gui.add(params, 'text').name('label').onFinishChange(updateTextGeometry)

// Donuts ni
// const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
// for(let i = 0; i < 100; i++)
// {
//     const donut = new THREE.Mesh(donutGeometry, material)
//     donut.position.x = (Math.random() - 0.5) * 10
//     donut.position.y = (Math.random() - 0.5) * 10
//     donut.position.z = (Math.random() - 0.5) * 10
//     donut.rotation.x = Math.random() * Math.PI
//     donut.rotation.y = Math.random() * Math.PI
//     const scale = Math.random()
//     donut.scale.set(scale, scale, scale)
//     scene.add(donut)
// }

// Stars around the text
const spinningObjects = []

function createStarGeometry(outerRadius = 0.3, innerRadius = 0.12, spikes = 5) {
    const shape = new THREE.Shape()
    const step = Math.PI / spikes
    let rot = -Math.PI / 2
    shape.moveTo(Math.cos(rot) * outerRadius, Math.sin(rot) * outerRadius)
    for (let i = 0; i < spikes; i++) {
        rot += step
        shape.lineTo(Math.cos(rot) * innerRadius, Math.sin(rot) * innerRadius)
        rot += step
        shape.lineTo(Math.cos(rot) * outerRadius, Math.sin(rot) * outerRadius)
    }
    const extrudeSettings = {
        depth: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.01,
        bevelSegments: 2
    }
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
}

const starGeometry = createStarGeometry()
for(let i = 0; i < 100; i++)
{
    const star = new THREE.Mesh(starGeometry, material)
    star.position.x = (Math.random() - 0.5) * 10
    star.position.y = (Math.random() - 0.5) * 10
    star.position.z = (Math.random() - 0.5) * 10
    star.rotation.x = Math.random() * Math.PI
    star.rotation.y = Math.random() * Math.PI
    const scale = 0.5 + Math.random() * 0.8
    star.scale.set(scale, scale, scale)
    scene.add(star)
    spinningObjects.push(star)
}

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Updte sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    //orbit controls
    controls.update()

    // galawin mo ang baso
    for (const obj of spinningObjects) {
        obj.rotation.x += params.spinX * deltaTime
        obj.rotation.y += params.spinY * deltaTime
    }

    // Render
    renderer.render(scene, camera)

   
    window.requestAnimationFrame(tick)
}

tick()