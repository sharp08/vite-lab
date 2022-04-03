import { ref, onMounted } from "vue";

// 视频纵向填满，横向平移一段距离，确保视频中心
export function useVideo() {
  const videoRef = ref();
  onMounted(() => {
    const screenW = screen.availWidth;
    const videoW = videoRef.value.clientWidth;
    videoRef.value.style.transform = `translateX(${(videoW - screenW) / 2})`;
  });
  return videoRef;
}
