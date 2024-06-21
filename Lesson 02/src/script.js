//TO avoid gimbal lock
// object.rotation.reorder('yxz')

import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
// mesh.position.z = 1;
// mesh.position.x = 3.3;
mesh.position.set(0.3, 1, 1);

const group = new THREE.Group();
scene.add(group);
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);
group.add(cube1);
group.position.x = 1;

//Axes Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);
mesh.position.normalize();
console.log(mesh.position.length());
/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

mesh.scale.set(2, 1, 1);
/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);
// console.log(mesh.position.distanceTo(new THREE.Vector3(0, 0, 0)));
// console.log(mesh.position.distanceTo(camera.position));
camera.position.y = 1;
camera.position.x = 1;
camera.lookAt(mesh.position);
/**
 *
 *
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
