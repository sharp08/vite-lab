import type { Ref } from "vue";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh
} from "three";

function init(containerRef: Ref<HTMLDivElement>) {
  const renderSize = {
    width: 300,
    height: 200
  };
  const scene = new Scene(); //  创建场景
  // 创建透视摄像机
  const camera = new PerspectiveCamera(
    /**
     * 视野角度：值越大，视野越广，相应的内容就会变小
     */
    75,
    /**
     * 宽高比，一般设置为容器的宽高
     * 假设容器宽高为 200px,100px 并以此尺寸设置宽高比，假设这时看到的是一个正方形
     * 如果将宽高比设置为 300px/100px ，那么正方形视觉上会变 “窄”
     * 可以理解为，在指定的容器（200px）内塞入了更多的像素（300px）导致内部图形宽度变窄
     */
    renderSize.width / renderSize.height,
    /**
     * 近截面，相对相机而言，只展示近截面和远截面区间的内容
     */
    0.2,
    /**
     * 远截面
     */
    1000
  );

  // 创建渲染器
  const renderer = new WebGLRenderer();
  // 内容渲染的尺寸，即 canvas 的尺寸
  renderer.setSize(renderSize.width, renderSize.height);
  containerRef.value.appendChild(renderer.domElement); //  将创建的 canvas 放到容器中

  // 创建一个盒子几何体，几何中心位于坐标轴原点
  const geometry = new BoxGeometry(2, 2, 2);
  // 创建材质
  const material = new MeshBasicMaterial({ color: "orange" });
  // 创建网格，根据几何体和材质生成图形
  const cube = new Mesh(geometry, material);
  // 将图形放入场景
  scene.add(cube);

  /**
   * 调整相机位置，相机默认平行于z轴且朝向z轴负方向
   */
  camera.position.z = 5; //  沿着z轴正方向移5个单位，此时只能看到正方形一个面
  camera.position.y = 1.5; //  沿着y轴正方向移1.5个单位，相机视线依旧平行于z轴，此时可以看到正方形两个面，正面和顶面
  // camera.position.set(0, 1.5, 5); //  一次性设置多个位置
  // camera.lookAt( 0, 0, 0 );  //  设置相机朝向

  function animate() {
    cube.rotation.x += 0.01; //  沿着 x 轴旋转
    // cube.rotation.y += 0.01;
    // cube.rotation.z += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}

export default () => {
  return {
    init
  };
};
