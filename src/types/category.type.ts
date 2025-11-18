export type TCategory = {
  id: number;
  name: string;
  description: string | null;
  parentId: number | null;
  children?: TCategory[];
  slug?: string;
};

