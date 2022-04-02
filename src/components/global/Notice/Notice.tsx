import { defineComponent, reactive, TransitionGroup } from "vue";

import ms from "./Notice.module.less";
import "./transition.less"; //  过渡样式

export type AddType = (params: INotice) => void;

export default defineComponent({
  name: "Notice",
  props: ["abc"],
  setup(props, { expose }) {
    let noticeList = reactive<INotice[]>([]);
    const add: AddType = params => {
      setTimeout(() => {
        const idx = noticeList.findIndex(item => item.createTime);
        noticeList.splice(idx, 1);
      }, params.duration);
      noticeList.push(params);
    };
    
    // 暴露方法
    expose({ add });

    return () => (
      <div class={ms.notice}>
        <TransitionGroup name="fade">
          {noticeList.map((item, index) => (
            <div
              class={ms.notice__item}
              key={item.createTime}
              style={{ top: index * 60 + "px" }}
            >
              <span
                class={
                  ms.text + " " + ms["text--" + item.type]
                }
              >
                {item.content}
              </span>
            </div>
          ))}
        </TransitionGroup>
      </div>
    );
  }
});
