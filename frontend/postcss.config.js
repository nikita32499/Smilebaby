module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};

// const expandClassName = (className) => {
//     return className.replace(/(\w+):\((.*?)\)/g, (_, prefix, content) => {
//         return content
//             .split(' ')
//             .map((classPart) => `${prefix}:${classPart}`)
//             .join(' ');
//     });
// };

// const expandClassNamePlugin = () => {
//     return {
//         postcssPlugin: 'expand-class-name',
//         Rule(rule) {
//             // Обработка селекторов с className
//             rule.selector = expandClassName(rule.selector);

//             // Проходим по всем декларациям и проверяем их значения
//             rule.walkDecls((decl) => {
//                 decl.value = expandClassName(decl.value);
//             });
//         },
//     };
// };
// expandClassNamePlugin.postcss = true;

// module.exports = {
//     plugins: [expandClassNamePlugin, require('tailwindcss'), require('autoprefixer')],
// };
