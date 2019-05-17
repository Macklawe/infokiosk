import { types } from 'mobx-state-tree';

const children = types.model('children', {});

export const CategoryItem = types.model('CategoryItem', {
  block: types.frozen({}),
  childrens: types.array(children),
  hasChildren: types.boolean,
  icon: types.string,
  id: types.number,
  isEmpty: types.boolean,
  name: types.string,
  parentId: types.maybeNull(types.number),
  status: types.boolean
});

export type ICategoryItem = typeof CategoryItem.Type;
