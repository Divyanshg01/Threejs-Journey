import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const dooralphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorheightTexture = textureLoader.load("/textures/door/height.jpg");
const doornormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doormetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorroughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const matcapsTexture = textureLoader.load("/textures/matcaps/1.png");
const gradientTexture = textureLoader.load("/textures/matcaps/3.png");
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapsTexture.colorSpace = THREE.SRGBColorSpace;
/**
 * Objects
 */
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;
// material.transparent = true;
// material.map = doorColorTexture;
// material.color = new THREE.Color("green");
// material.opacity = 0.5;
// material.alphaMap = dooralphaTexture;
// material.side = THREE.DoubleSide;

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapsTexture;

gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;
const material = new THREE.MeshStandardMaterial();
material.metalness = 1;
material.roughness = 1;
material.map = doorColorTexture;
material.aoMap = doorambientOcclusionTexture;
material.displacementMap = doorheightTexture;
material.gradientMap = gradientTexture;
material.displacementScale = 0.1;
material.roughnessMap = doorroughnessTexture;
material.normalMap = doornormalTexture;
// material.normalMap.set(0.5, 0.5);
material.transparent = true;
material.alphaMap = dooralphaTexture;
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
);
sphere.position.x = -1.5;
torus.position.x = 1.5;
scene.add(sphere, plane, torus);

/**
 * Environment Map
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load("/textures/environmentMap/2k.hdr", (evm) => {
  evm.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = evm;
  scene.environment = evm;
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;
  sphere.rotation.x = -0.15 * elapsedTime;
  plane.rotation.x = -0.15 * elapsedTime;
  torus.rotation.x = -0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
