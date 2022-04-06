import { Block } from "./Block";

type BlockType = InstanceType<typeof Block>;
interface IOptions {
  w: number;
  h: number;
}

class Paper {
  blockList: BlockType[];
  options: IOptions;

  constructor(options: IOptions) {
    this.blockList = [];
    this.options = options;
  }
  addBlock(block: BlockType) {
    this.blockList.push(block);
  }
}

export { Paper };
