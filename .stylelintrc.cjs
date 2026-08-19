module.exports = {
  extends: ['stylelint-config-standard'],
  customSyntax: 'postcss-less',
  rules: {
    // 不允许使用位置函数，除ignoreFunctions数组下的元素
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: [
          'fade',
          'fadeout',
          'tint',
          'darken',
          'ceil',
          'fadein',
          'floor',
          'unit',
          'shade',
          'lighten',
          'percentage',
          '-',
          '~`colorPalette'
        ]
      }
    ],
    'no-descending-specificity': true
  },

  // 忽略以下文件的检查
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.json', '**/*.md']
};
