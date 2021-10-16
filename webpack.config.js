const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env = {}) => {
    const {mode = 'development'} = env;
    const isProd = mode === 'production';
    const getStyleLoaders = () => {
        return [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader']
    }
    const getPlugins = () => {
        const plugins = [new HtmlWebpackPlugin({
            title: "hello world",
            buildTime: new Date().toString(),
            template: "public/index.html"
        })]
        if (isProd) {
            plugins.push(new MiniCssExtractPlugin({
                filename: 'main-[hash:8].css'
            }))
        }
        return plugins
    }
    return {
        mode: isProd ? 'production' : "development",
        module: {
            rules: [
                // Loading Images
                {
                    test: /\.(png|jpg|gif|ico)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/img/',
                            name: '[name].[ext]'
                        }
                    }]
                },
                // CSS loader
                {
                    test: /\.css$/,
                    use: getStyleLoaders()
                },
                // SCSS loader
                {
                    test: /\.s[ca]ss$/,
                    use: [...getStyleLoaders(), "sass-loader"]
                }
            ]
        },
        plugins: getPlugins(),
        devServer: {
            open: true // open window browser
        }
    }
}