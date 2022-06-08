// 文本
import type { Ref } from "vue";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import type { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

function init(containerRef: Ref<HTMLDivElement>) {
  const renderSize = {
    width: 300,
    height: 200
  };

  // 渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(renderSize.width, renderSize.height);
  containerRef.value.insertBefore(
    renderer.domElement,
    containerRef.value.firstChild
  );

  // 镜头
  const fov = 25;
  const aspect = renderSize.width / renderSize.height;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 50, 0);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

  // 场景
  const scene = new THREE.Scene();

  // 光源
  {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);
  }

  // 要更新旋转角度的对象数组
  const objects = [];

  // 一球多用
  const radius = 1;
  const widthSegments = 6;
  const heightSegments = 6;
  const sphereGeometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments
  );

  // 为了让地球跟着太阳转，需要添加一个空的场景图
  // 如果只是将地球加到太阳的子节点，则地球会与太阳一样大，因此需要空的场景图来规避这个问题
  const solarSystem = new THREE.Object3D();
  scene.add(solarSystem);
  objects.push(solarSystem); //  太阳系旋转，注意区分下面的太阳自身旋转

  // 太阳
  const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
  sunMesh.scale.set(4, 4, 4); // 扩大太阳的大小
  solarSystem.add(sunMesh);
  objects.push(sunMesh); //  太阳自身旋转

  // 地球系
  const earthOrbit = new THREE.Object3D();
  earthOrbit.position.x = 8;
  solarSystem.add(earthOrbit); //  放入太阳系中，将随着太阳系旋转
  objects.push(earthOrbit); //  为了让月球能绕着地球旋转，因此自身需要地球系旋转

  // 地球
  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244
  });
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
  earthOrbit.add(earthMesh); //  地球放入地球系
  objects.push(earthMesh); //  地球自身旋转

  // 月球系
  const moonOrbit = new THREE.Object3D();
  moonOrbit.position.x = 2;
  earthOrbit.add(moonOrbit); //  月球系放入地球系，会绕着地球系旋转

  // 月球
  const moonMaterial = new THREE.MeshPhongMaterial({
    color: 0x888888,
    emissive: 0x222222
  });
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  moonMesh.scale.set(0.5, 0.5, 0.5);
  moonOrbit.add(moonMesh); //  月球放入月球系
  objects.push(moonMesh); //  月球自身旋转

  // 判断是否需要重新计算尺寸
  function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  // 触发渲染
  function render(time: number) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach(obj => {
      obj.rotation.y = time;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

export default () => {
  return {
    init
  };
};
