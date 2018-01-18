function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('login');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
        })
        .state('dashboard.welcome', {
            url: '/welcome',
            templateUrl: 'views/dashboard/nav-welcome.html',
        })
        .state('dashboard.articles', {
            url: '/articles/:page/:size',
            templateUrl: 'views/dashboard/nav-articles.html',
            params: {
                'page': '1',
                'size': '10',
                'id': '',
                'title' : '',
                'author' : '',
                'status' : '',
                'type' : '',
                'startAt' : '',
                'endAt' : ''
            },
        })
        .state('dashboard.articlesDetail', {
            url: '/articlesDetail/:id?page',
            templateUrl: 'views/dashboard/articles-edit&add.html',
        })
        .state('dashboard.articlesAdd',{
            url: '/articlesAdd',
            templateUrl: 'views/dashboard/articles-edit&add.html',
        });
}