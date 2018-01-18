angular.module('myApp')
    .filter('articlesType', function () {
        return function (type) {
            switch (type) {
                case 0: return '首页banner';
                case 1: return '找职位banner';
                case 2: return '找精英banner';
                case 3: return '行业大图';
                default: return 'Error';
            }
        }
    })
    .filter('articlesStatus', function () {
        return function (status,change) {
            if(change){
                switch (status) {
                    case 1: return '上线';
                    case 2: return '下线';
                    default: return 'Error';
                }
            }else{
                switch (status) {
                    case 1: return '草稿';
                    case 2: return '上线';
                    default: return 'Error';
                }
            }

        }
    });