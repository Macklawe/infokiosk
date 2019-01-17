export interface USER {
  notification: boolean;
  textNotification: string;
  typeNotification: string;
  blocks: Array<theme_block>;
}

export interface theme_block {
  id: number;
  name: string;
}

export interface MENU {
  left: boolean;
}

export interface CATEGORY {
  addDrawer: boolean;
  editDrawer: boolean;
  deleteDialog: boolean;
  selectIndex: number;
  selectName: string;
  data: Array<categories_data>;
}

export interface AddStateCat {
  logo: any;
}

export interface categories_data {
  id: number;
  block: { id: number; name: string };
  name: string;
  icon: string;
  status: boolean;
  parentId: number | null;
  children?: any;
}

export interface DEVICES {
  addDrawer: boolean;
  editDrawer: boolean;
  deleteDialog: boolean;
  selectIndex: number;
  selectName: string;
  data: Array<device_data>;
}

export interface FormDataDevice {
  id: number;
  deviceName: string;
  deviceIP: string;
  block: { id: number; name: string };
}

export interface FormDataCategories {
  id: number;
  catName: string;
  block: { id: number; name: string };
  parentId: { id: number; name: string };
  status: boolean;
}

export interface FormDataPosts {
  category: {
    id: number;
    block: {
      id: number;
      name: string;
    };
    name: string;
    icon: string;
    status: boolean;
  };
  title: string;
  subtitle: string;
  text: string;
  x: number;
  y: number;
  video: string;
  images: [
    {
      id: number;
      name: string;
      isTitle: boolean;
    }
  ];
}

export interface device_data {
  id: number;
  name: string;
  ip: string;
  block: { id: number; name: string };
}

export interface POSTS {
  addDrawer: boolean;
  editDrawer: boolean;
  imageDrawer: boolean;
  imageIndex: number | null;
  selectIndex: number;
  selectName: string;
  deleteDialog: boolean;
  isActiveMap: boolean;
  data: Array<posts_data>;
  infoPost: info_post | {};
}

export interface posts_data {
  id: number;
  title: string;
  subtitle: string;
  video: string;
  titleImage: { id: number; name: string };
  block: { id: number; name: string };
  category: { id: number; name: string; icon: string };
}

export interface LoginState {
  showPassword: boolean;
}

export interface PostsState {
  anchorEl: any;
  indexMenu: number;
  order: boolean;
  orderBy: string;
}

export interface AddState {
  x: number | null;
  y: number | null;
  initialX: number | null;
  initialY: number | null;
  initialValueX: number | null;
  initialValueY: number | null;
  valueX: number | null;
  valueY: number | null;
  logo: Array<any>;
  description: string;
}

export interface FormLogin {
  login: string;
  password: string;
}

export interface info_post {
  id: number;
  category: {
    id: number;
    name: string;
    icon: string;
    status: boolean;
  };
  title: string;
  subtitle: string;
  text: string;
  x: number;
  y: number;
  video: string;
  images: Array<{
    id: number;
    name: string;
    isTitle: boolean;
    description: string;
  }>;
  titleImage: { id: number; name: string; description: string };
  block: {
    id: number;
    name: string;
  };
}
