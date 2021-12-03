import { onMounted, h, render, defineComponent, ref } from "vue";

import NoticeCore from "./Notice.vue";

NoticeCore._newInstance = cb => {
  const div = document.createElement("div");
  document.body.append(div);
  const Wrapper = defineComponent({
    setup() {
      const noticeRef = ref(); //  拿到组件的 ref
      onMounted(() => {
        cb({
          add: noticeRef.value.add,
          distroy() {
            render(null, div);
            if (div.parentNode) {
              div.parentNode.removeChild(div);
            }
          }
        });
      });
      return () =>
        h(NoticeCore, {
          abc: "123123",
          ref: noticeRef
        });
    }
  });

  const vNode = h(Wrapper);
  render(vNode, div); //  render 这个方法是在 andv 的源码里看到的
};

let instance; //  保持全局唯一

interface NoticeType {
  info: (str: string) => void;
}

let Notice: NoticeType = {
  info: str => {
    if (instance) {
      console.log("有实例");
      instance.add(str);
    } else {
      console.log("没有实例，创建实例");
      NoticeCore._newInstance(inst => {
        instance = inst;
      });
    }
  }
};

export { Notice };

// **************************************************************************************
// 以下为 antdv 中的实现过程简化
// import { onMounted, h, render, defineComponent } from "vue";
// import NoticeCore from "./NoticeCore.vue";

// const Notification = defineComponent({
//   render: () => h(NoticeCore)
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
