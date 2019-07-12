
fms.factory('bridgeFactory', function($http) {

    var f = {}
    var burl = "http://localhost:3000"

    f.getVersion = function() {
        var url = burl + "/version"
       return $http.get(url) 
    }

    return f; 

});