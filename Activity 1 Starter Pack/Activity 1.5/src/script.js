import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * base
 */
// canvas
const canvas = document.querySelector('canvas.webgl')

// sizes
const sizes = {
    width: 800,
    height: 600
}

// scene
const scene = new THREE.Scene()

// axes
const axesHelper = new THREE.AxesHelper(3)

const axesColorsAttr = axesHelper.geometry.getAttribute('color')
for (let i = 0; i < axesColorsAttr.count; i++) {
    axesColorsAttr.setX(i, 1)
    axesColorsAttr.setY(i, 1)
    axesColorsAttr.setZ(i, 1)
}
axesColorsAttr.needsUpdate = true
scene.add(axesHelper)

// group
const group = new THREE.Group()
group.scale.y = 2
group.rotation.y = 0.2
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.ConeGeometry(0.7, 1, 4),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
)
cube1.position.x = - 1.5
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.ConeGeometry(0.7, 1, 4),
    new THREE.MeshBasicMaterial({ color: 0x808080 })
)
cube2.position.x = 0
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.ConeGeometry(0.7, 1, 4),
    new THREE.MeshBasicMaterial({ color: 0xC4A484 })
)
cube3.position.x = 1.5
group.add(cube3)

// cameras
// perspective
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// ortho
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
camera.position.z = 3
camera.lookAt(group.position)
scene.add(camera)

// cursor
const cursor = { x: 0, y: 0 }
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

// controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // rotate
    group.rotation.y = elapsedTime * 0.5

    // alt
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    // camera.position.y = cursor.y * 3
    // camera.lookAt(group.position)

    // update
    controls.update()

    // render
    renderer.render(scene, camera)

    // next
    window.requestAnimationFrame(tick)
}

tick()