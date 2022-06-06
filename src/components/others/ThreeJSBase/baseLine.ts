import type { Ref } from "vue";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Line,
  LineBasicMaterial,
  Vector3,
  BufferGeometry
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
    45,
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
    1,
    /**
     * 远截面
     */
    500
  );

  // 创建渲染器
  const renderer = new WebGLRenderer();
  // 内容渲染的尺寸，即 canvas 的尺寸
  renderer.setSize(renderSize.width, renderSize.height);
  containerRef.value.appendChild(renderer.domElement); //  将创建的 canvas 放到容器中

  // 创建点，根据点画线
  const points = [];
  points.push(new Vector3(-10, 0, 0));
  points.push(new Vector3(0, 10, 0));
  points.push(new Vector3(10, 0, 0));

  // 创建线的几何图形
  const geometry = new BufferGeometry().setFromPoints(points);
  // 创建材质
  const material = new LineBasicMaterial({ color: "orange" });
  // 创建线，此处类似于创建盒子时的 Mesh
  const line = new Line(geometry, material);
  // 将图形放入场景
  scene.add(line);

  /**
   * 调整相机位置，相机默认平行于z轴且朝向z轴负方向
   */
  camera.position.set(0, 0, 50);
  camera.lookAt(0, 0, 0);

  // 渲染
  renderer.render(scene, camera);
}

export default () => {
  return {
    init
  };
};
