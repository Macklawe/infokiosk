import { types } from 'mobx-state-tree';

export const CategoryItem = types.model('CategoryItem', {
  block: types.frozen({ id: types.number, name: types.string }),
  childrens: types.frozen([]),
  hasChildren: types.boolean,
  icon: types.string,
  id: types.number,
  isEmpty: types.boolean,
  name: types.string,
  parentId: types.maybeNull(types.number),
  status: types.boolean
});

export type ICategoryItem = typeof CategoryItem.Type;
