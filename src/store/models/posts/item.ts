import { types } from 'mobx-state-tree';

export const PostItem = types.model('CategoryItem', {
  id: types.number,
  title: types.string,
  subtitle: types.string,
  x: types.number,
  y: types.number,
  video: types.string,
  titleImage: types.frozen({
    description: types.string,
    id: types.number,
    name: types.string
  })
});

export type IPostItem = typeof PostItem.Type;
