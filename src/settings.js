module.exports = {
    title: 'Vue Element Admin',

    /**
     * @type {boolean} true | false
     * @description Whether show the settings right-panel
     */
    showSettings: true,
    /**
     * @types {boolean} true | false
     */
    /**
     * @type {boolean} true | false
     * @description Whether need tagsView
     */
    tagsView: true,

    /**
     * @type {boolean} true | false
     * @description Whether fix the header
     */
    fixedHeader: false,

    /**
     * @type {boolean} true | false
     * @description Whether show the logo in sidebar
     */
    sidebarLogo: true,

    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    errorLog: 'production',

    // 注册的主题
    theme: {
        list: [{
                title: 'admin 经典',
                name: 'd2',
                preview: 'theme/d2/preview@2x.png'
            },
            {
                title: '紫罗兰',
                name: 'violet',
                preview: 'theme/violet/preview@2x.png'
            },
            {
                title: '简约线条',
                name: 'line',
                backgroundImage: 'theme/line/bg.jpg',
                preview: 'theme/line/preview@2x.png'
            },
            {
                title: '流星',
                name: 'star',
                backgroundImage: 'theme/star/bg.jpg',
                preview: 'theme/star/preview@2x.png'
            },
            {
                title: 'Tomorrow Night Blue (vsCode)',
                name: 'tomorrow-night-blue',
                preview: 'theme/tomorrow-night-blue/preview@2x.png'
            }
        ]
    }
}