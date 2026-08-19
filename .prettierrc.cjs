module.exports = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: true,
  trailingComma: 'none',
  bracketSpacing: true,
  quoteProps: 'as-needed',
  proseWrap: 'always', // 超过最大宽度是否换行<always|never|preserve>，默认preserve
  arrowParens: 'avoid', // 在单独的箭头函数参数周围包括括号 always：(x) => x \ avoid：x => x
  requirePragma: false, //无需顶部注释即可格式化
  insertPragma: false, //在已被preitter格式化的文件顶部加上标注
  bracketSameLine: false, // 将>多行 HTML（HTML、JSX、Vue、Angular）元素放在最后一行的末尾，而不是单独放在下一行（不适用于自关闭元素）<bool>，默认false
  singleAttributePerLine: true // 在 HTML、Vue 和 JSX 中强制执行每行单个属性<bool>，默认false
};
