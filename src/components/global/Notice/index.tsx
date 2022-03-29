import { onMounted, h, render, defineComponent, ref } from "vue";

import NoticeCore from "./Notice";
import { AddType } from "./Notice";

type NoticeCoreType = InstanceType<typeof NoticeCore> & {
  add: AddType;
};

interface NoticeType {
  info: (str: string | INotice) => void;
  success: (str: string | INotice) => void;
  error: (str: string | INotice) => void;
}
interface Icb {
  add: AddType;
  destroy(): void;
}

type CbType = (inst: Icb) => void;

NoticeCore._newInstance = (cb: CbType) => {
  // 准备容器
  const div = document.createElement("div");
  div.setAttribute("id", "notice-container");
  document.body.append(div);

  const Wrapper = defineComponent({
    setup() {
      const noticeRef = ref<NoticeCoreType>(); //  拿到组件的 ref

      onMounted(() => {
        cb({
          add: noticeRef.value.add,
          destroy() {
            render(null, div);
            if (div.parentNode) {
              div.parentNode.removeChild(div);
            }
          }
        });
      });
      return () => <NoticeCore abc="123" ref={noticeRef} />;
    }
  });

  const vNode = h(Wrapper); //  转换成虚拟 dom 
  render(vNode, div); //  渲染到 div 上 render 这个方法是在 andv 的源码里看到的
};

let instance; //  保持全局唯一

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

  // 第一次调用 open 时创建 instance，后续不再进入
  if (!instance) {
    NoticeCore._newInstance((inst: Icb) => {
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
