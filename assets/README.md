# 静态资源目录规范

## 目录说明

- `common/`：全局通用资源（logo、通用图标、占位图）
- `index/`：首页专用资源
- `profile/`：个人页专用资源
- `tabbar/`：底部导航图标资源

## 命名建议

- 使用小写 + 中划线：`kebab-case`
- 示例：`user-avatar.png`、`home-banner.webp`

## 使用方式

在页面中建议使用绝对路径引用：

```html
<image src="/assets/index/home-banner.png" mode="widthFix" />
```

## 体积建议

- 小图标优先使用矢量方案（如 iconfont/svg）
- 大图建议走 CDN，避免主包体积过大
