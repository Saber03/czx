angular.module('myApp')
    .controller('ArticleDetailController', ['$scope', '$state', '$http', 'articleHttp', function ($scope, $state, $http, articleHttp) {
        var vm = this;
        vm.article = {};
        vm.typeOptions = [
            { type: '首页Banner', value: 0 },
            { type: '找职位Banner', value: 1 },
            { type: '找精英Banner', value: 2 },
            { type: '行业大图', value: 3 }
        ];
        vm.industryOptions = [
            { industry: '移动互联网', value: 0 },
            { industry: '电子商务', value: 1 },
            { industry: '企业服务', value: 2 },
            { industry: 'O2O', value: 3 },
            { industry: '教育', value: 4 },
            { industry: '金融', value: 5 },
            { industry: '游戏', value: 6 }
        ];
        vm.article.type = 0;
        vm.article.industry = 0;
        vm.upProgress = {
            width: null,
        };
        // 渲染编辑内容
        if ($state.params.id) {
            articleHttp.getArticle_Http($state.params.id)
                .then(function (resp) {
                    if (resp.data.code === 0) {
                        resp = resp.data.data.article;
                        vm.article = resp;
                    } else {
                        console.log('获取Article失败！');
                        console.log(resp);
                    }
                }, function (resp) {
                    console.log(resp);
                });
        } else {
            vm.article.content = '请输入...';
        };
        // 删除图片
        vm.delImg = function () {
            vm.article.img = null;
            vm.upImgFile = null;
            vm.upProgress.width = null;
            vm.onUpProgress = false;
        };
        // 上传图片        
        vm.upLoadImg = function () {
            if (vm.upImgFile) {
                articleHttp.uploadImg_Http(vm.onUpProgress, vm.upProgress, vm.upImgFile)
                    .then(function (resp) {
                        console.log(resp.data.message + ':' + resp.data.data.url);
                        vm.article.img = resp.data.data.url;
                    }, function (resp) {
                        console.log(resp);
                    });
            } else {
                console.log('请选择一张图片！');
            };
        };
        // 立即上线
        vm.articlePub = function () {
            vm.article.status = '2';
            if ($state.params.id) {
                articleHttp.editArticle_Http($state.params.id, vm.article)
                    .then(function (resp) {
                        if (resp.data.code === 0) {
                            console.log('编辑成功，已立即上线！');
                            $state.go('dashboard.articles', { page: $state.params.page });
                        } else {
                            console.log('编辑失败！');
                        };
                    }, function (resp) {
                        console.log('编辑失败！');
                    });
            } else {
                articleHttp.addArticle_Http(vm.article)
                    .then(function (resp) {
                        console.log('新增成功，已立即上线！');
                        $state.go('dashboard.articles');
                    }, function (resp) {
                        console.log('新增失败！');
                        console.log(resp);
                    });
            };
        };
        // 存为草稿
        vm.articleSave = function () {
            vm.article.status = 1;
            if ($state.params.id) {
                articleHttp.editArticle_Http($state.params.id, vm.article)
                    .then(function (resp) {
                        if (resp.data.code === 0) {
                            console.log('编辑成功，已存为草稿！');
                            $state.go('dashboard.articles', { page: $state.params.page });
                        } else {
                            console.log('编辑失败！');
                        };
                    }, function (resp) {
                        console.log('编辑失败！');
                    });
            } else {
                articleHttp.addArticle_Http(vm.article)
                    .then(function (resp) {
                        console.log('新增成功，已存为草稿！');
                        $state.go('dashboard.articles');
                    }, function (resp) {
                        console.log('新增失败！');
                        console.log(resp);
                    });
            };
        };

        // 取消编辑
        vm.articleCancel = function () {
            $state.go('dashboard.articles', { page: $state.params.page });
        };
    }]);