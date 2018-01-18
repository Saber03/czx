angular.module('myApp')
    .controller('ArticlesController', ['$scope', '$state', 'articleHttp', function ($scope, $state, articleHttp) {
        var vm = this;
        vm.maxSize = 10;
        vm.currentPage = $state.params.page;
        vm.itemsPerpage = $state.params.size;
        // 按条件搜索
        vm.search = {};
        vm.datePicker = {};
        vm.datePicker.date = { startDate: null, endDate: null };
        vm.searchArticles = function () {
            vm.currentPage = 1;
            vm.itemsPerpage = 10;
            $state.params.title = vm.search.title;
            $state.params.author = vm.search.author;
            $state.params.status = vm.search.status;
            $state.params.type = vm.search.type;
            if (vm.datePicker.date.startDate !== null) {
                $state.params.startAt = Date.parse(vm.datePicker.date.startDate._d);
                $state.params.endAt = Date.parse(vm.datePicker.date.endDate._d);
            }
            articleHttp.getArticleList_Http($state.params)
                .then(function (resp) {
                    if (resp.code === 0) {
                        vm.articleList = resp.data.articleList;
                        vm.totalItems = resp.data.total;
                        console.log('按条件搜索成功：');
                        console.log(vm.articleList);
                    } else {
                        console.log('按条件搜索失败！');
                        console.log(resp.message);
                    }
                }, function (resp) {
                    console.log(resp);
                });
        };
        // 搜索条件清空
        vm.searchClean = function () {
            vm.search = {}; 
            console.log(vm.search);
            for(var n in $state.params){
                $state.params[n] = '';
            }
            articleHttp.getArticleList_Http($state.params)
                .then(function (resp) {
                    if (resp.code === 0) {
                        vm.articleList = resp.data.articleList;
                        vm.totalItems = resp.data.total;
                        console.log("页数:" + resp.data.page);
                        console.log(vm.articleList);
                    } else {
                        console.log('加载列表失败！');
                        console.log(resp.message);
                    }
                }, function (resp) {
                    console.log(resp);
                });
        };
        // 加载列表
        console.log('加载列表');
        console.log($state.params);
        articleHttp.getArticleList_Http($state.params)
            .then(function (resp) {
                if (resp.code === 0) {
                    vm.articleList = resp.data.articleList;
                    vm.totalItems = resp.data.total;
                    console.log("页数:" + resp.data.page);
                    console.log(vm.articleList);
                } else {
                    console.log('加载列表失败！');
                    console.log(resp.message);
                }
            }, function (resp) {
                console.log(resp);
            });
        // 页数变化后路由跳转
        vm.change = function () {
            $state.params.page = vm.currentPage;
            $state.params.size = vm.itemsPerpage;
            $state.go('dashboard.articles', $state.params);
            console.log('跳转到第 ' + $state.params.page + ' 页');
        };
        // 改变article状态
        vm.changeArticleStatus = function (id, status) {
            (status === 1) ? (status = 2) : (status = 1);
            articleHttp.changeArticleStatus_Http(id, status)
                .then(function (resp) {
                    if (resp.code === 0) {
                        console.log(resp);
                        $state.reload();
                    } else {
                        console.log("请重新提交！");
                        console.log(resp);
                    }
                }, function (resp) {
                    console.log(resp);
                });
        };
        // 删除article
        vm.delArticle = function (id) {
            articleHttp.delArticle_Http(id)
                .then(function (resp) {
                    if (resp.code === 0) {
                        console.log(resp);
                        $state.reload();
                    } else {
                        console.log("请重新提交！");
                        console.log(resp);
                    }
                }, function (resp) {
                    console.log(resp);
                });
        };
        // 新增article
        vm.addArticle = function () {
            $state.go('dashboard.articlesAdd');
        };
        // 编辑article
        vm.editArticle = function (id, page) {
            $state.go('dashboard.articlesDetail', { id: id, page: page });
        };
    }]);