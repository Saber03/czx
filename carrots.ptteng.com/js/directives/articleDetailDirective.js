angular.module('myApp')
    .directive('contentEditable', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                wangEditor.config.printLog = false;                
                var editor = new wangEditor('wContent');
                editor.config.pasteFilter = false;                           
                scope.$watch(ctrl.$viewValue, function () {
                    console.log(ctrl);
                    editor.$txt.html(ctrl.$viewValue);
                });
                editor.onchange = function () {
                    var html = editor.$txt.html();
                    ctrl.$setViewValue(html);
                    scope.$apply();
                };
                editor.create();
            }
        }
    })
    .directive('imgUpload', function () {
        return {
            restrict: 'A',
            scope: {
                file: '=imgUpload',
            },
            link: function (scope, element, attr) {
                element.on('change', function () {
                    scope.file = this.files[0];
                    scope.$apply();
                });
            }
        }
    });