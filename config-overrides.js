const { override, addWebpackAlias, addLessLoader } = require('customize-cra')
const path = require('path')
// const darkThemeVars = require('antd/dist/dark-theme');
// function resolve(dir) {
//     return path.join(__dirname, '.', dir)
// }
module.exports = override(
    addWebpackAlias({
        "@": path.resolve(__dirname, "src")
    }),
    // 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题
	addLessLoader({
    // javascriptEnabled: true,
		// modifyVars:{
    //   'hack': `true;@import "${require.resolve('antd/lib/style/color/colorPalette.less')}";`,
    //   ...darkThemeVars,
    //   '@primary-color':'#6e41ff',
    // },
		// localIdentName: '[local]--[hash:base64:5]' // use less-modules
  })
)