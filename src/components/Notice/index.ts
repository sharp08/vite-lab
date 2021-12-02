import { onMounted, h, render, defineComponent, ref } from "vue";

import Notice from "./Notice.vue";

Notice._newInstance = cb => {
  const div = document.createElement("div");
  document.body.append(div);
  const Wrapper = defineComponent({
    setup() {
      const noticeRef = ref(); //  拿到组件的 ref

      onMounted(() => {
        console.log(Notice);
        console.log(noticeRef);

        cb({
          add: noticeRef.value.add
        });
      });
      return () =>
        h(Notice, {
          abc: "123123",
          ref: noticeRef
        });
    }
  });
  const vNode = h(Wrapper);
  render(vNode, div);
};

let instance; //  保持全局唯一

let Api = {
  info: () => {
    if (instance) {
      console.log("有实例");
      instance.add();
    } else {
      console.log("没有实例，创建实例");
      Notice._newInstance(inst => {
        instance = inst;
      });
    }
  }
};

export { Api };

// **************************************************************************************
// 以下为 antdv 中的实现过程简化
// import { onMounted, h, render, defineComponent } from "vue";
// import Notice from "./Notice.vue";

// const Notification = defineComponent({
//   render: () => h(Notice)
// });

// Notification.newInstance = cb => {
//   const div = document.createElement("div");
//   document.body.append(div);
//   const Wrapper = defineComponent({
//     setup() {
//       onMounted(() => {
//         cb({});
//       });
//       return () => h(Notification);
//     }
//   });
//   const vNode = h(Wrapper);
//   render(vNode, div);
// };

// let instance;
// let Api = {
//   info: () => {
//     if (instance) {
//       console.log("有实例");
//     } else {
//       console.log("没有实例，创建实例");
//       Notification.newInstance(inst => {
//         instance = inst;
//       });
//     }
//   }
// };

// export { Api };
