var NgQtip2, removeEmpties, str2bool;

str2bool = function(str) {
  var ref;
  return (ref = String(str).toLowerCase()) !== 'false' && ref !== '0' && ref !== 'null' && ref !== '';
};

removeEmpties = function(obj, deep) {
  var k, results, v;
  if (deep == null) {
    deep = true;
  }
  results = [];
  for (k in obj) {
    v = obj[k];
    if ((v != null) && typeof v === 'object' && deep) {
      results.push(removeEmpties(obj[k], deep));
    } else if (v == null) {
      results.push(delete obj[k]);
    } else {
      results.push(void 0);
    }
  }
  return results;
};

NgQtip2 = function($timeout, $compile, $http, $templateCache, qtipDefaults, $q) {
  return {
    restrict: 'A',
    scope: {
      qtipVisible: '=?',
      qtipDisable: '=?',
      qtipFixed: '=?',
      qtipDelay: '=?',
      qtipAdjustX: '@',
      qtipAdjustY: '@',
      qtipModalStyle: '=?',
      qtipTipStyle: '=?',
      qtipShowEffect: '=?',
      qtipHideEffect: '=?',
      qtipPersistent: '=?',
      qtip: '@',
      qtipTitle: '@',
      qtipTarget: '@',
      qtipContent: '@',
      qtipSelector: '@',
      qtipTemplate: '@',
      qtipEvent: '@',
      qtipEventOut: '@',
      qtipHide: '=?',
      qtipShow: '=?',
      qtipClass: '@',
      qtipMy: '@',
      qtipAt: '@',
      qtipOptions: '=?',
      qtipApi: '=?',
      object: '=qtipTemplateObject'
    },
    link: function(scope, el, attrs) {
      var content, generateQtip, ref, watchOptions, watchProps;
      watchProps = {
        qtipVisible: 'toggle',
        qtipDisable: 'disable'
      };
      watchOptions = {
        qtipTitle: 'content.title',
        qtipClass: 'style.classes',
        qtip: 'content.text'
      };
      if (scope.qtipOptions == null) {
        scope.qtipOptions = {};
      }
      scope.apiPromise = $q.defer();
      scope.closeQtip = function(e, id, arg) {
        var qtEl, ref, ref1, rendered;
        if (id == null) {
          id = scope.getQtipId();
        }
        rendered = (ref = (arg != null ? arg : {}).rendered) != null ? ref : true;
        if (e != null) {
          if (typeof e.preventDefault === "function") {
            e.preventDefault();
          }
        }
        qtEl = $("#qtip-" + id);
        qtEl.qtip('hide');
        qtEl.qtip().rendered = (ref1 = scope.qtipPersistent) != null ? ref1 : rendered;
      };
      scope.getQtipId = function() {
        return el.data('hasqtip');
      };
      scope.getQtipElement = function(id) {
        if (id == null) {
          id = scope.getQtipId();
        }
        return $("#qtip-" + id);
      };
      scope.api = function(e, id) {
        var qtEl;
        if (id == null) {
          id = scope.getQtipId();
        }
        qtEl = $("#qtip-" + id);
        return qtEl.qtip("api");
      };
      scope.isApiReady = function() {
        return !!scope.getQtipElement().qtip().rendered;
      };
      scope.qtipApi = {
        isReady: scope.isApiReady,
        api: scope.api,
        apiPromise: scope.apiPromise.promise
      };
      scope.resolveApiPromise = function(event, api) {
        return scope.apiPromise.resolve(api);
      };
      scope._before = function(before, fn) {
        return function() {
          if (typeof before === "function") {
            before.apply(null, arguments);
          }
          return typeof fn === "function" ? fn.apply(null, arguments) : void 0;
        };
      };
      generateQtip = function(content) {
        var attrOptions, k, options, ref, ref1, results, v;
        attrOptions = {
          position: {
            my: scope.qtipMy,
            at: scope.qtipAt,
            target: scope.qtipTarget != null ? $(scope.qtipTarget) : void 0,
            adjust: {
              x: scope.qtipAdjustX != null ? parseInt(scope.qtipAdjustX) : void 0,
              y: scope.qtipAdjustY != null ? parseInt(scope.qtipAdjustY) : void 0
            }
          },
          show: {
            effect: scope.qtipShowEffect,
            event: scope.qtipEvent
          },
          hide: {
            effect: scope.qtipHideEffect,
            fixed: str2bool(scope.qtipFixed),
            event: scope.qtipEventOut
          },
          style: {
            classes: scope.qtipClass,
            modal: scope.qtipModalStyle,
            tip: scope.qtipTipStyle
          },
          content: content != null ? content : {
            text: (ref = scope.qtipContent) != null ? ref : scope.qtip
          }
        };
        if (scope.qtipHide != null) {
          angular.merge(attrOptions.hide, scope.qtipHide);
        }
        if (scope.qtipShow != null) {
          angular.merge(attrOptions.show, scope.qtipShow);
        }
        removeEmpties(options);
        removeEmpties(attrOptions);
        removeEmpties(scope.qtipOptions);
        options = angular.merge({}, qtipDefaults, attrOptions, scope.qtipOptions);
        if (((ref1 = options.events) != null ? ref1.render : void 0) != null) {
          options.events.render = scope._before(scope.resolveApiPromise, options.events.render);
        } else {
          if (options.events == null) {
            options.events = {};
          }
          options.events.render = scope.resolveApiPromise;
        }
        ($(el)).qtip(options);
        for (k in watchProps) {
          v = watchProps[k];
          scope.$watch(k, function(newVal) {
            return el.qtip(v, newVal);
          });
        }
        results = [];
        for (k in watchOptions) {
          v = watchOptions[k];
          results.push(scope.$watch(k, function(newVal) {
            return el.qtip('option', v, newVal);
          }));
        }
        return results;
      };
      if (attrs.qtipSelector) {
        $timeout(function() {
          return generateQtip(($(scope.qtipSelector)).html());
        });
      } else if (scope.qtipTemplate != null) {
        $http.get(scope.qtipTemplate, {
          cache: $templateCache
        }).then(function(html) {
          return generateQtip({
            text: function() {
              return $timeout(function() {
                return scope.$apply(function() {
                  var text;
                  text = $compile(html.data)(scope);
                  return text;
                });
              });
            }
          });
        });
      } else if (scope.qtipTitle != null) {
        generateQtip({
          title: scope.qtipTitle,
          text: scope.qtip
        });
      } else {
        content = (ref = scope.qtip) != null ? ref : scope.qtipContent;
        generateQtip({
          text: function() {
            return $timeout(function() {
              return scope.$apply(function() {
                return $compile("<div>" + content + "</div>")(scope);
              });
            });
          }
        });
      }
    }
  };
};

NgQtip2.$inject = ['$timeout', '$compile', '$http', '$templateCache', 'qtipDefaults', '$q'];

angular.module('ngQtip2', []).directive('qtip', NgQtip2).provider('qtipDefaults', function() {
  this.defaults = {};
  this.setDefaults = (function(_this) {
    return function(defaults) {
      if (defaults == null) {
        defaults = {};
      }
      return angular.merge(_this.defaults, defaults);
    };
  })(this);
  this.$get = (function(_this) {
    return function() {
      return _this.defaults;
    };
  })(this);
});