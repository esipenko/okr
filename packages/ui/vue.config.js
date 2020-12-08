module.exports = {
    transpileDependencies: ["vuetify"],
    devServer: {
        proxy: {
            "^/api": {
                target: process.env.VUE_APP_URL,
                changeOrigin: true,
                pathRewrite: { "^/api": "" },
            },
        },
    },
};
