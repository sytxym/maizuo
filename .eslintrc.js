module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential",
        // "plugin:@typescript-eslint/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        // "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "parser": "vue-eslint-parser",   // 添加这一句
    "plugins": [
        "vue",
        // "@typescript-eslint"
    ],
    "rules": {
        // 关闭名称校验
        'vue/multi-word-component-names': "off",
        "no-unused-vars":"off"
        // 添加组件命名忽略规则
        // "vue/multi-word-component-names": ["error", {
        //     "ignores": ["AppNavBar"]  //在这个数组中加入需要忽略的组件名
        // }]
    }
};
