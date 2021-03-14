module.exports = {
  devServer: {
    host: '0.0.0.0',
    public: process.env.VUE_APP_DEV_HOST,
  },
  "transpileDependencies": [
    "vuetify"
  ]
}