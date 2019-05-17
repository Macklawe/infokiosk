import { types } from 'mobx-state-tree';

import { CategoryItem, ICategoryItem } from './models/category/item';
import { PostItem, IPostItem } from './models/posts/item';

const Store = types
  .model('Store', {
    category: types.array(CategoryItem),
    posts: types.array(PostItem),
    ping: types.optional(types.boolean, false)
  })
  .actions(self => ({
    setPing: (ping: boolean) => {
      self.ping = ping;
    },
    setCategories(categories: Array<ICategoryItem>) {
      self.category.push(...categories);
    },
    setPosts(posts: Array<IPostItem>) {
      self.posts.push(...posts);
    },
    clearPosts: () => {
      let newArray: any = [];
      self.posts = newArray;
    }
  }));

export type IStore = typeof Store.Type;

export const store = Store.create({
  category: [],
  posts: [],
  ping: false
}) as IStore;
