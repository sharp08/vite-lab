// 扩展 console.log
export const extendConsole = (): void => {
  const core = (color: string, ...rest: unknown[]) => {
    const len = rest.length;
    const style = (color: string) =>
      `background:${color} ; padding: 1px; border-radius: 3px;  color: #fff`;

    switch (len) {
      case 1:
        console.log(`%c ${rest[0]} `, style(color));
        break;
      default:
        console.log(`%c ${rest[0]} `, style(color), ...rest.slice(1));
        break;
    }
  };

  window.log = {
    r: (...rest) => core("#ed4014", ...rest), //  red
    o: (...rest) => core("#ff9900", ...rest), //  orange
    d: (...rest) => core("#35495e", ...rest), //  dark
    g: (...rest) => core("#41b883", ...rest), //  green
    b: (...rest) => core("#2b85e4", ...rest) //  blue
  };
};
