var app = angular.module('watched', ['ngStorage']);
app.controller('searchCtrl', function($scope, $http, $localStorage, $timeout) {
    $scope.res = undefined;
    $scope.val = undefined;
    if (!$localStorage.series) $localStorage.series = [];
    else $localStorage.series = $localStorage.series.filter(function(n) {
        return n != null
    });
    $scope.delayBlur = function() {
        $timeout(function() {}, 200).then(function() {
            $scope.focused = false;
        });
    }
    $scope.searchByName = function() {
        if ($scope.query != "")
            $http.get('http://api.themoviedb.org/3/search/tv', {
                params: {
                    api_key: '9214065a9d7bf62231a54491585764f7',
                    search_type: 'ngram',
                    query: $scope.query
                }
            }).success(function(response) {
                $scope.res = response.results;
            }).error(function(response) {
                console.log("Error");
            });
        else
            $scope.res = [];
    };
    $scope.addSeries = function(series) {
        $http.get('http://api.themoviedb.org/3/tv/' + series.id, {
            params: {
                api_key: '9214065a9d7bf62231a54491585764f7'
            }
        }).success(function(e) {
            for (i in $localStorage.series) {
                if (e != null && $localStorage.series[i] != null && $localStorage.series[i].id == e.id) {
                    for (j in e.seasons)
                        if ($localStorage.series[i].seasons.map(function(e) {
                                return e.ss
                            }).indexOf(e.seasons[j].season_number) == -1) {
                            $localStorage.series[i].seasons.push({
                                ss: e.seasons[j].season_number,
                                num: e.seasons[j].episode_count,
                                ep: 0
                            });
                        }
                    return;
                }
            }
            $localStorage.series.push({
                id: e.id,
                name: e.name,
                seasons: e.seasons.map(function(e) {
                    return {
                        ss: e.season_number,
                        num: e.episode_count,
                        ep: 0
                    }
                }),
                img: e.poster_path
            });
        }).error(function(e) {
            console.log("Error");
        });
    };
});
app.controller('watchedCtrl', function($scope, $window, $localStorage) {
    $scope.res = $localStorage.series;
    $scope.deleteSeries = function(series) {
        if (!window.confirm("Do you want to remove this series?")) return;
        for (i in $localStorage.series) {
            if (series != null && $localStorage.series[i] != null && $localStorage.series[i].id == series.id) {
                delete($localStorage.series[i]);
            }
        }
    };
    $scope.updateEP = function(series, season) {
        for (i in $localStorage.series) {
            if (series != null && $localStorage.series[i] != null && $localStorage.series[i].id == series.id) {
                for (j in $localStorage.series[i].seasons)
                    if (season != null && $localStorage.series[i].seasons[j] != null && $localStorage.series[i].seasons[j].ss == season.ss) {
                        $localStorage.series[i].seasons[j].ep = Math.min(season.num, $localStorage.series[i].seasons[j].ep + 1);
                    }
            }
        }
    }
    $scope.updateEPval = function(series, season, val) {
        for (i in $localStorage.series) {
            if (series != null && $localStorage.series[i] != null && $localStorage.series[i].id == series.id) {
                for (j in $localStorage.series[i].seasons)
                    if (season != null && $localStorage.series[i].seasons[j] != null && $localStorage.series[i].seasons[j].ss == season.ss) {
                        if (val >= 0) $localStorage.series[i].seasons[j].ep = Math.min(season.num, val);
                    }
            }
        }
    }
});
app.filter('year', function() {
    return function(input) {
        return (!!input) ? '(' + input.substr(0, 4) + ')' : '';
    }
});