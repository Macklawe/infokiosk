import { types } from 'mobx-state-tree';

export const Preview = types
  .model('Preview', {
    isShow: types.optional(types.boolean, false),
    image: types.optional(types.string, ''),
    firstTime: types.optional(types.boolean, true)
  })
  .actions(self => ({
    show: () => {
      self.isShow = true;
    },
    setImage: (image: any) => {
      self.image = image;
    },
    close: () => {
      self.isShow = false;
    },
    toggleFirstTime: () => {
      self.firstTime = false;
    }
  }));

export type IPreview = typeof Preview.Type;
