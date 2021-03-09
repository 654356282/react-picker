module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2015,
  },
  rules: {
    "no-var": "error",
    indent: [
      "error",
      2,
      { SwitchCase: 1 }, // 首行缩进
    ],
    "keyword-spacing": [
      // 关键字缩进
      "error",
      {
        before: true,
        after: true,
      },
    ],
    "key-spacing": [
      "error",
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    "no-unreachable": [
      // 不允许在 return, throw, break添加代码
      "error",
    ],
    "spaced-comment": [
      // 注释后预留空格
      "error",
      "always",
    ],
    "space-before-function-paren": [
      // 括号与函数名加空格
      "error",
      "always",
    ],
    eqeqeq: [
      // 使用 ===
      "error",
      "always",
    ],
    "space-infix-ops": [
      // 拼接字符串预留空格
      "error",
      {
        int32Hint: false,
      },
    ],
    "no-multiple-empty-lines": [
      // 最大空行数
      "error",
      {
        max: 2,
      },
    ],
    "block-spacing": [
      // 大括号两边预留空格
      "error",
      "always",
    ],
    "array-bracket-spacing": [2, "never"],
    "brace-style": [2, "1tbs", { allowSingleLine: true }], // java风格的大括号
    "comma-spacing": [
      // 逗号前后的空格
      2,
      {
        before: false,
        after: true,
      },
    ],
    "comma-style": [2, "last"], // 逗号在行尾
    "linebreak-style": [
      "error",
      "unix", // 换行使用LF
    ],
    quotes: ["error"],
    "no-extra-semi": "error", // 禁止使用分号
    "semi-spacing": [
      // 分号前后空格
      "error",
      {
        before: false,
        after: true,
      },
    ],
    "no-console": "off",
  },
}
