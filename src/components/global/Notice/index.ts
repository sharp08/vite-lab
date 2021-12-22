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
  info: (str: string | INotice) => void;
  success: (str: string | INotice) => void;
  error: (str: string | INotice) => void;
}

// 弹窗核心
const open = (params: string | INotice, type: string) => {
  let standardParams: INotice = {
    content: "",
    createTime: +new Date(),
    duration: 3000,
    type
  };

  if (typeof params === "string") {
    standardParams.content = params;
  } else {
    standardParams = {
      ...standardParams,
      ...params
    };
  }

  if (!instance) {
    NoticeCore._newInstance(inst => {
      instance = inst;
    });
  }
  instance.add(standardParams);
};

let Notice: NoticeType = {
  info: params => {
    open(params, "info");
  },
  success: params => {
    open(params, "success");
  },
  error: params => {
    open(params, "error");
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
