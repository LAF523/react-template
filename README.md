# React 项目模板

面向现代浏览器的 React + TypeScript 单页应用模板，内置请求封装、Redux Toolkit、Ant Design、单元测试和提交规范。

## 技术基线

- Node.js `>= 22.12.0`（推荐使用 `nvm use`，版本由 `.nvmrc` 固定）
- React 19、Vite 8、TypeScript 6、Ant Design 6
- React Router 7、Redux Toolkit 2、Axios 1
- ESLint 9 flat config、Stylelint 16、Prettier 3、Vitest 4
- 仅支持现代浏览器：最近两个 Chrome、Edge、Firefox 和 Safari 版本

## 开始使用

```bash
nvm use
npm ci
npm run dev
```

若本地尚未存在 lockfile 对应的依赖，可首次使用 `npm install`；CI 和其他可复现环境一律使用 `npm ci`。

## 常用命令

```bash
npm run typecheck   # TypeScript 类型检查
npm run lint        # ESLint 检查，不改写文件
npm run lint:fix    # 自动修复可修复的 ESLint 问题
npm run stylelint   # CSS/Less 检查
npm run stylelint:fix
npm run test        # Vitest 监听模式
npm run test:run    # 单次执行单测
npm run coverage    # 覆盖率报告
npm run build       # 质量检查、类型检查和生产构建
npm run preview     # 预览 dist
```

## 环境变量与部署

环境文件位于 `env/`，客户端可访问的变量必须使用 `VITE_` 前缀。`VITE_BASE_PATH` 控制部署基础路径，默认值为
`/react-template/`；GitHub
Pages 工作流同样显式设置该值。部署到其他仓库或域名时，请修改对应环境变量，而不要改动构建配置。

## 工程约定

- 路径别名 `@/` 指向 `src/`。
- ESLint 配置位于 `eslint.config.js`，不再使用 `.eslintrc`。
- 预提交仅检查暂存文件；构建和 CI 不会运行带 `--fix` 的命令。
- gzip/brotli 应由 CDN 或 Web 服务器负责协商压缩，构建产物不再额外生成静态 `.gz` 文件。
