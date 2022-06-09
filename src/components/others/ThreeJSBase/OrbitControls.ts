import type { Ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

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

  // 相机
  const fov = 45;
  const aspect = renderSize.width / renderSize.height;
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  // OrbitControls 可以让相机围绕某个点进行旋转和缩放
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 5, 0); //  目标点
  controls.update(); //  设置了目标点后，必须调用该方法进行更新

  // 设置场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  {
    const loader = new THREE.TextureLoader(); //  加载纹理用
    const texture = loader.load(
      "https://threejs.org/manual/examples/resources/images/checker.png" //  2×2 的小方块
    );
    texture.wrapS = THREE.RepeatWrapping; //   纹理重复，注释了看效果
    texture.wrapT = THREE.RepeatWrapping; //   纹理重复，注释了看效果
    texture.magFilter = THREE.NearestFilter; //  不知道干啥的，但不用会让图变得模糊

    const planeSize = 40;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize); //  平面几何图形，作为地面
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture, //  使用纹理作为材质
      side: THREE.DoubleSide //  双面材质
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5; //  旋转 90°，让地面变为水平的
    scene.add(mesh);
  }

  // 搞个正方体
  {
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(mesh);
  }

  // 搞个球
  {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(
      sphereRadius,
      sphereWidthDivisions,
      sphereHeightDivisions
    );
    const sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" });
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh);
  }

  // 用于 GUI
  class ColorGUIHelper {
    object: THREE.AmbientLight;
    prop: string;
    constructor(object: THREE.AmbientLight, prop: string) {
      this.object = object;
      this.prop = prop;
    }
    get value() {
      return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
      this.object[this.prop].set(hexString);
    }
  }

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.AmbientLight(color, intensity); //  环境光，可以理解为四面八方都有光
    scene.add(light);
    // 右上角的属性操作面板
    // const gui = new GUI();
    // gui.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
    // gui.add(light, "intensity", 0, 2, 0.01);
  }

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

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

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
