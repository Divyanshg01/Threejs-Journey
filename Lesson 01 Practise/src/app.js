import * as THREE from "three";
const canvas = document.querySelector("canvas");

const scene = new THREE.Scene();
const geo = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "blue" });

const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);

const sizes = {
  width: 600,
  height: 400,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
