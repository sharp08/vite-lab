import { defineComponent, reactive, TransitionGroup } from "vue";

import moduleStyle from "./Notice.module.less";
import "./transition.less"; //  过渡样式

export default defineComponent({
  name: "Notice",
  props: ["abc"],
  setup(props, { expose }) {
    let noticeList = reactive<INotice[]>([]);
    const add = (params: INotice): void => {
      setTimeout(() => {
        const idx = noticeList.findIndex(item => item.createTime);
        noticeList.splice(idx, 1);
      }, params.duration);
      noticeList.push(params);
    };

    expose({ add });

    return () => (
      <div class={moduleStyle.notice}>
        <TransitionGroup name="fade">
          {noticeList.map((item, index) => (
            <div
              class={moduleStyle.notice__item}
              key={item.createTime}
              style={{ top: index * 60 + "px" }}
            >
              <span
                class={
                  moduleStyle.text + " " + moduleStyle["text--" + item.type]
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
