export type Category = {
    id: number;
    name: string;
    description: string;
    parentId: number | null;
    children: Category[];
  };