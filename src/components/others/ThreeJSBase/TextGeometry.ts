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

  // 镜头相关
  const fov = 40;
  const aspect = renderSize.width / renderSize.height;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 40;

  // 场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);

  // 光源1
  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }
  // 光源2
  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(1, -2, -4);
    scene.add(light);
  }

  const objects = []; //  保存创建的图形
  const spread = 15;

  // 将图形放入场景
  function addObject(x: number, y: number, obj) {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
  }

  // 创建材质
  function createMaterial() {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = 0.5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
  }

  // 加载文字资源及创建 Mesh
  {
    const loader = new FontLoader();
    // 资源加载promise化
    function loadFont(url: string) {
      return new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });
    }

    // 准备好 mesh
    async function doit() {
      const font = await loadFont(
        // 这个资源在本地 node_modules/three/examples/fonts 中也可以找到
        "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
      );
      const geometry = new TextGeometry("coffee", {
        font: font as Font,
        size: 5, //  字体大小，默认值为100。
        height: 3, //  挤出文本的厚度。默认值为50。
        curveSegments: 12, //  （表示文本的）曲线上点的数量。默认值为12。
        bevelEnabled: true, //  是否开启斜角，默认为false
        bevelThickness: 0.15, //  文本上斜角的深度，默认值为20。
        bevelSize: 0.3, //  斜角与原始文本轮廓之间的延伸距离。默认值为8。
        bevelSegments: 5 //  斜角的分段数。默认值为3。
      });

      // 默认是左侧旋转
      const mesh1 = new THREE.Mesh(geometry, createMaterial());
      addObject(-0.5, 0, mesh1);

      // 中心旋转
      const mesh2 = new THREE.Mesh(geometry, createMaterial());
      geometry.computeBoundingBox(); //  需要主动计算一下图形的边界，从而执行下一步的根据中心旋转
      geometry.boundingBox.getCenter(mesh2.position).multiplyScalar(-1);

      const parent = new THREE.Object3D();
      parent.add(mesh2);

      addObject(0.5, 0, parent);
    }

    doit();
  }

  // 当 canvas 尺寸变化了要重新设置渲染器尺寸
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

  // 渲染
  function render(time: number) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();    //  属性发生变化后，通过该方法使之生效
    }

    objects.forEach((obj, idx) => {
      const speed = 0.5 + idx * 0.05;
      const rot = time * speed;
      obj.rotation.x = rot;
      obj.rotation.y = rot;
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
