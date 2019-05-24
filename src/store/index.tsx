import { types } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';

import { CategoryItem, ICategoryItem } from './models/category/item';
import { PostItem, IPostItem } from './models/posts/item';
import { Preview } from './models/preview';

const Store = types
  .model('Store', {
    category: types.array(CategoryItem),
    posts: types.array(PostItem),
    ping: types.optional(types.boolean, false),
    postInfo: types.frozen({} as any),
    blockName: types.string,
    notification: types.boolean,
    preview: Preview,
    time: types.optional(types.number, 0)
  })
  .actions(self => ({
    setPing: (ping: boolean) => {
      self.ping = ping;
    },
    setCategories(categories: Array<ICategoryItem>) {
      (self.category as any) = [];
      self.category.push(...categories);
      (self.blockName as any) = categories[0].block.name;
    },
    setPosts(posts: Array<IPostItem>) {
      self.posts.push(...posts);
    },
    clearPosts: () => {
      let newArray: any = [];
      self.posts = newArray;
    },
    setPostInfo: (post: any) => {
      self.postInfo = post;
    },
    clearPostInfo: () => {
      self.postInfo = {};
    },
    closeNotification: () => {
      self.notification = false;
    },
    openNotification: () => {
      self.notification = true;
    },
    clearTime: () => {
      self.time = 0;
    },
    setTime: () => {
      self.time = self.time + 1;
    }
  }));

export type IStore = typeof Store.Type;

export const store = Store.create({
  category: [],
  posts: [],
  ping: false,
  postInfo: {},
  blockName: '',
  notification: false,
  preview: { isShow: false, image: '' }
}) as IStore;

makeInspectable(store);
