angular.module('myApp')
    .factory('articleInterface', [function () {
        return {
            login: '/carrots-admin-ajax/a/login',
            addArticle: '/carrots-admin-ajax/a/u/article',
            editArticle: function (id) {
                return '/carrots-admin-ajax/a/u/article/' + id;
            },
            delArticle: function (id) {
                return '/carrots-admin-ajax/a/u/article/' + id;
            },
            getArticle: function (id) {
                return '/carrots-admin-ajax/a/article/' + id;
            },
            getArticleList: '/carrots-admin-ajax/a/article/search',
            // getArticleList: function (page, size) {
            //     return '/carrots-admin-ajax/a/article/search?page=' + page + "&size=" + size;
            // },
            changeArticleStatus: function (id, status) {
                return '/carrots-admin-ajax/a/u/article/status?id=' + id + "&status=" + status;
            },
            uploadImg: '/carrots-admin-ajax/a/u/img/task',
        };
    }])
    .factory('articleHttp', ['$http', '$q', 'articleInterface', function ($http, $q, articleInterface) {
        return {
            // 登录
            login_Http: function (user) {
                var defered = $q.defer();
                $http({
                    method: "POST",
                    url: articleInterface.login,
                    data: user,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (user) {
                        var str = [];
                        for (var p in user) {
                            str.push(p + "=" + user[p]);
                        }
                        return str.join("&");
                    }
                }).then(function (resp) {
                    resp = resp.data;
                    defered.resolve(resp);
                }, function (resp) {
                    resp = resp.data;
                    defered.reject(resp);
                })
                return defered.promise;
            },
            // 新增单个Article
            addArticle_Http: function (article) {
                var str = [];
                for (var p in article) {
                    str.push(p + "=" + article[p]);
                };
                article = str.join("&");
                console.log(article);
                return $http.post(articleInterface.addArticle, article,{
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            },
            //编辑单个Article
            editArticle_Http: function (id,article) {
                var str = [];
                for (var p in article) {
                    str.push(p + "=" + article[p]);
                };
                article = str.join("&");
                return $http.put(articleInterface.editArticle(id),article,{
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            },
            // 图片上传
            uploadImg_Http: function (onUpProgress, upProgress, upImgFile) {
                return $http({
                    url: articleInterface.uploadImg,
                    method: 'POST',
                    headers: {
                        'content-type': undefined,
                    },
                    uploadEventHandlers: {
                        progress: function (event) {
                            if (event.lengthComputable) {
                                onUpProgress = true;
                                upProgress.width = Math.round(event.loaded * 100 / event.total) + '%';
                                console.log(upProgress.width);
                                if (event.loaded === event. total) {
                                    console.log("上传完成！");
                                }
                            }
                        }
                    },
                    transformRequest: function () {
                        var formData = new FormData();
                        formData.append('file', upImgFile);
                        return formData;
                    },
                });
            },
            // 删除单个Article
            delArticle_Http: function (id) {
                var defered = $q.defer();
                $http.delete(articleInterface.editArticle(id))
                    .then(function (resp) {
                        resp = resp.data;
                        defered.resolve(resp);
                    }, function (resp) {
                        resp = resp.data;
                        defered.reject(resp);
                    })
                return defered.promise;
            },
            // 获取单个Article
            getArticle_Http: function (id) {
                return $http.get(articleInterface.getArticle(id));
            },
            // 获取Article列表
            getArticleList_Http: function (params) {
                var defered = $q.defer();
                $http.get(articleInterface.getArticleList,{params,params})
                    .then(function (resp) {
                        resp = resp.data;
                        defered.resolve(resp);
                    }, function (resp) {
                        resp = resp.data;
                        defered.reject(resp);
                    });
                return defered.promise;
            },
            // 修改状态
            changeArticleStatus_Http: function (id, status) {
                var defered = $q.defer();
                $http.put(articleInterface.changeArticleStatus(id, status))
                    .then(function (resp) {
                        resp = resp.data;
                        defered.resolve(resp);
                    }, function (resp) {
                        resp = resp.data;
                        defered.reject(resp);
                    });
                return defered.promise;
            }
        }
    }]);