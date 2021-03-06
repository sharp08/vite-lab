export default function createLive2D() {
  L2Dwidget.init({
    model: {
      jsonPath:
        // "https://unpkg.com/live2d-widget-model-hijiki@1.0.5/assets/hijiki.model.json",
        // "https://unpkg.com/live2d-widget-model-tororo@1.0.5/assets/tororo.model.json",
        "https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json",
      // "https://unpkg.com/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json",
      scale: 1
    },
    display: {
      // 居左
      position: "right",
      // 宽度
      width: 200,
      // 高度
      height: 400,
      // 距左右
      hOffset: 35,
      // 距下
      vOffset: -20
    },

    mobile: {
      // 移动端，false为关闭
      show: true,
      scale: 0.5
    },

    dialog: {
      // 开启对话框，false为关闭
      enable: false,
      script: {
        // // 每空闲 10 秒钟，显示一条一言
        // "every idle 10s": "$hitokoto$",
        // // 当触摸到角色身体
        // "tap body": "哎呀！别碰我！",
        // // 当触摸到角色头部
        // "tap face": "人家已经不是小孩子了！"
      }
    }
  });
}
