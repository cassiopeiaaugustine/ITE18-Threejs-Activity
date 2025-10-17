import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'lil-gui'

const parameters = {
    color: 0xff0000,
    spin: () => {
        gsap.to(mesh.rotation, {
            y: mesh.rotation.y + Math.PI * 2,
            
        })
    }
}


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: parameters.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
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
camera.position.z = 3
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
* Debug
*/
const gui = new dat.GUI()
gui.add(mesh.position, 'y').min(- 3).max(3).step(0.01).name('elevation') 
gui.add(mesh, 'visible')
gui.add(material, 'wireframe')
gui.addColor(parameters, 'color').onChange(() => {
    material.color.set(parameters.color)
})
gui.add(parameters, 'spin')


// Additional tweaks
const sceneFolder = gui.addFolder('Scene')
sceneFolder.addColor({ background: '#000000' }, 'background').name('background').onChange((v) => {
    renderer.setClearColor(v)
})

const scaleFolder = gui.addFolder('Scale')
scaleFolder.add(mesh.scale, 'x').min(0.1).max(5).step(0.01)
scaleFolder.add(mesh.scale, 'y').min(0.1).max(5).step(0.01)
scaleFolder.add(mesh.scale, 'z').min(0.1).max(5).step(0.01)

const rotationFolder = gui.addFolder('Rotation')
rotationFolder.add(mesh.rotation, 'x', 0, Math.PI * 2, 0.01)
rotationFolder.add(mesh.rotation, 'y', 0, Math.PI * 2, 0.01)
rotationFolder.add(mesh.rotation, 'z', 0, Math.PI * 2, 0.01)

const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera, 'fov').min(20).max(120).step(1).onChange(() => {
    camera.updateProjectionMatrix()
})

const actionsFolder = gui.addFolder('Actions')
actionsFolder.add({ reset: () => {
    mesh.position.set(0, 0, 0)
    mesh.scale.set(1, 1, 1)
    mesh.rotation.set(0, 0, 0)
}}, 'reset')




/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()