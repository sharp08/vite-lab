export interface INode {
  id: string;
  name: string;
  checked: boolean;
  pId: string;
  children: INode[];
}

export const source: INode[] = [
  {
    id: "1",
    name: "1",
    checked: false,
    pId: null,
    children: [
      {
        id: "1-1",
        name: "1-1",
        checked: false,
        pId: "1",
        children: [
          {
            id: "1-1-1",
            name: "1-1-1",
            checked: false,
            pId: "1-1",
            children: [
              {
                id: "1-1-1-1",
                name: "1-1-1-1",
                checked: false,
                pId: "1-1-1",
                children: []
              },
              {
                id: "1-1-1-2",
                name: "1-1-1-2",
                checked: false,
                pId: "1-1-1",
                children: []
              },
              {
                id: "1-1-1-3",
                name: "1-1-1-3",
                checked: false,
                pId: "1-1-1",
                children: []
              }
            ]
          },
          {
            id: "1-1-2",
            name: "1-1-2",
            checked: false,
            pId: "1-1",
            children: []
          },
          {
            id: "1-1-3",
            name: "1-1-3",
            checked: false,
            pId: "1-1",
            children: []
          }
        ]
      },
      {
        id: "1-2",
        name: "1-2",
        checked: false,
        pId: "1",
        children: [
          {
            id: "1-2-1",
            name: "1-2-1",
            checked: false,
            pId: "1-2",
            children: []
          },
          {
            id: "1-2-2",
            name: "1-2-2",
            checked: false,
            pId: "1-2",
            children: []
          },
          {
            id: "1-2-3",
            name: "1-2-3",
            checked: false,
            pId: "1-2",
            children: []
          }
        ]
      }
    ]
  }
];
