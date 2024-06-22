import * as THREE from "three";
import gsap from "gsap";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";
const canvas = document.querySelector("canvas");

const scene = new THREE.Scene();
const gui = new GUI();
gui.close();
scene.add(gui);
const debugObjects = {};
debugObjects.color = "#113161";
const folder = gui.addFolder("New Folder");
debugObjects.subdivision = 2;
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const Material = new THREE.MeshBasicMaterial({
  color: debugObjects.color,
  wireframe: true,
});
const mesh = new THREE.Mesh(boxGeo, Material);
scene.add(mesh);
folder.add(mesh.position, "x").min(0).max(2).step(0.001);
gui.addColor(debugObjects, "color").onChange(() => {
  Material.color.set(debugObjects.color);
});
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
gui
  .add(debugObjects, "subdivision")
  .min(1)
  .max(40)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObjects.subdivision,
      debugObjects.subdivision,
      debugObjects.subdivision
    );
  });
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
scene.add(camera);

camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
// const oc = new OrbitControls(camera, canvas);
// oc.enableDamping();
const clock = new THREE.Clock();
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;
const tick = () => {
  control.update();
  //   const elapsedTime = clock.elapsedTime();
  const elapsedTime = clock.getElapsedTime();
  //   oc.update();
  mesh.rotation.x = elapsedTime;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
