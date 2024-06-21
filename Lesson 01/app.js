import * as THREE from "three";
// console.log(THREE);
//Scene
const scene = new THREE.Scene();
const canvas = document.querySelector("canvas");
//Geometry

const Geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });

const mesh = new THREE.Mesh(Geometry, material);

scene.add(mesh);

const sizes = {
  width: 800,
  height: 600,
};

//camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);
camera.position.z = 3;
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
