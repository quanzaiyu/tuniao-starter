// https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md
module.exports = {
  rules: {
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复bug
        'perf', // 优化
        'style', // 样式调整
        'docs', // 文档更新
        'test', // 单元测试
        'refactor', // 代码重构
        'chore', // 杂项
        'ci', // 集成
        'revert', // 回退
        'workflow', // 工作流
        'merge', // 合并分支
        'wip', // 开发中
        'release', // 发布版本
      ],
    ],
  },
}
