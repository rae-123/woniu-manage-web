var menus = [
  {
    action: "home",
    title: "首页",
    path:"/index",
    items: [{ title: "统计", path: "/dashboard" }]
  },
  {
    action: "apps",
    title: "课程管理",
    path:"/item",
    items: [
      //{ title: "分类管理", path: "/category" },
      { title: "商品分类", path: "/brand" },
      { title: "课程列表", path: "/list" },
      //{ title: "规格参数", path: "/specification" }
    ]
  },
  {
    action: "people",
    title: "用户管理",
    path:"/user",
    items: [
      { title: "用户列表", path: "/statistics" },
      //{ title: "会员管理", path: "/list" }
    ]
  },
  {
    action: "attach_money",
    title: "资讯管理",
    path:"/trade",
    items: [
      { title: "发布资讯", path: "/statistics" },
      { title: "资讯列表", path: "/order" },
      /*{ title: "物流管理", path: "/logistics" },
      { title: "促销管理", path: "/promotion" }*/
    ]
  },
  {
    action: "settings",
    title: "权限管理",
    path:"/authority",
    items: [
      { title: "权限管理", path: "/list" },
      { title: "角色管理", path: "/role" },
      { title: "人员管理", path: "/member" }
    ]
  }
]

export default menus;
