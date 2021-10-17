
const path = require('path')  // absolute paths in configuration file.
// const terserrPlugin = require('terser-webpack-plugin'); // in production mode this plugin is included by default
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports = {
    // entry: './src/index.js',
    entry:{
        "hello-world":"./src/hello-world.js",
        "show-image":"./src/show-image.js"
    },
    output: {
        filename: '[name].[contenthash].js', //file name of the output build process
        path: path.resolve(__dirname, './dist'), //absolute file path of the folder where the above filename will be placed
        publicPath: "/static/"
    },
    mode:"production",
    optimization:{
        splitChunks:{
            chunks:"all",
            minSize:1000
        }
    },
    module: {
        /*
            Rules have at least two properties 'test', where you can specify a regular expression that will match certain conditions.
            In the type you can specify which module type to use once the test condition is successfull.
        */
        rules: [
            {
                test: /\.(jpg|png)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 2 * 1024 //8kb
                    }
                }
            },
            {
                test: /\.txt/,
                type: 'asset/source',

            },
            {
                test: /\.css/,
                /*
                    'style-loader' should be used if you want to inline your css into the JavaScript bundle.
                    MiniCssExtractPlugin.loader would generate a seperate file for css.
                    css-loder reads the content of the css  file and return that css and then the style loader injects the css into the page using style tag.
                    The css-loader takes a CSS file and returns the CSS with imports and url(...) resolved via webpack's "require" functionality.
                */
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                     'css-loader'
                ]

            },
            {
                test: /\.scss$/,
                /*
                    sass-loader will convert sass into css.
                    you also need to install node-sass  
                    node-sass is a package that allows you to compile .scss files to css as part of the build process.                 
                */
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
                //the above line is equivalent to use: [ { loader: 'style-loader '},{loader:'css-loader'},{loader:'sass-loader'} ]

            },
            {
                test: /\.js$/,
                /*
                This will be applicable to all javascript files except those which are placed under node_modules folder.
                */
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        // env preset compiles ECMAscript version 6 to latest down to ECMAscript 5
                        presets: ['@babel/env'],
                        // Babel preset is simply a collection of Babel plugins
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }

            },{
                test:/\.hbs$/,
                use:[
                    "handlebars-loader"
                ]
            }
        ]
    },
    plugins: [
        //this is used to reduce the filesize of the bundle file.
        //  new terserrPlugin(),//included by default.
         //this would extract our css into a seperate file
        new MiniCssExtractPlugin(
            {
                filename:'[name].[contenthash].css'
            }
        ),
        new CleanWebpackPlugin(
            {
                //*delete all the files in dist folder
                //"**/*",
                //too delete files outside of dist
                cleanAfterEveryBuildPatterns:[path.join(process.cwd(),'test/*')]
            }
        ),
        new HtmlWebpackPlugin({
            filename:"hello-world.html",
            title:"welcome to the webpack world",
            description:"This is hello-world page",
            template:"src/page-template.hbs",
            minify:false,
            chunks:["hello-world"]
            
        }),
        new HtmlWebpackPlugin({
            filename:"show-image.html",
            title:"welcome to the webpack world",
            description:"This is a show image page",
            template:"src/page-template.hbs",
            chunks:["show-image"],
            minify:false
            
        })
    
    ], //the reason for a creating a new instance of plugin is that the same plugin can be used across multiple places with different configuration.
    

}