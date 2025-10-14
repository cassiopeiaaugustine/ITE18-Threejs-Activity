import * as THREE from 'three'

// canvas
const canvas = document.querySelector('canvas.webgl')

// scene
const scene = new THREE.Scene()

// axes
const axesHelper = new THREE.AxesHelper(2)
// white
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

// sizes
const sizes = {
    width: 800,
    height: 600
}

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// look

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)