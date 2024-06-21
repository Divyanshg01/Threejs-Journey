import * as THREE from "three";
import gsap from "gsap";
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

camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
gsap.to(mesh.rotation, {
  x: 1,
});
const clock = new THREE.Clock();
const tick = () => {
  //   const elapsedTime = clock.getElapsedTime();
  //   mesh.position.x = Math.sin(elapsedTime);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
