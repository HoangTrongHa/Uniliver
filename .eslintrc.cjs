module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        '@nuxtjs/eslint-config-typescript',
        'plugin:prettier/recommended',
        'plugin:vue/vue3-essential',
        '@vue/standard'
    ],
    plugins: [],
    rules: {

    },
}