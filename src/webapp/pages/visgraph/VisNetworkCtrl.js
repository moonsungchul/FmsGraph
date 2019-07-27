
const { ipcRenderer } = require('electron')

fms.controller('VisNetworkCtrl', function($scope, $log, $window, $route, $rootScope, bridgeFactory) {

    $scope.test_data = "test data"
    $scope.loadingBarShow = false
    $scope.loadingBar = {
            position:"absolute",
            top:"0px",
            left:"0px",
            width: "902px",
            height: "902px",
            "background-color": "rgba(200,200,200,0.8)",
            "-webkit-transition": "all 0.5s ease",
            "-moz-transition": "all 0.5s ease",
            "-ms-transition": "all 0.5s ease",
            "-o-transition": "all 0.5s ease",
            "transition": "all 0.5s ease",
            opacity:0,
    }

    $scope.text = {
            position:"absolute",
            top:"8px",
            left:"530px", 
            width:"30px",
            height:"50px",
            margin:"auto auto auto auto",
            "font-size":"22px",
            color: "#000000",
    }

    $scope.outerBorder = {
            position:"relative",
            top:"400px",
            width:"600px",
            height:"44px",
            margin:"auto auto auto auto",
            border:"8px solid rgba(0,0,0,0.1)",
            background: "rgb(252,252,252)",
            background: "-moz-linear-gradient(top,  rgba(252,252,252,1) 0%, rgba(237,237,237,1) 100%)",
            background: "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(252,252,252,1)), color-stop(100%,rgba(237,237,237,1)))",
            background: "-webkit-linear-gradient(top,  rgba(252,252,252,1) 0%,rgba(237,237,237,1) 100%)",
            background: "-o-linear-gradient(top,  rgba(252,252,252,1) 0%,rgba(237,237,237,1) 100%)",
            background: "-ms-linear-gradient(top,  rgba(252,252,252,1) 0%,rgba(237,237,237,1) 100%)",
            background: "linear-gradient(to bottom,  rgba(252,252,252,1) 0%,rgba(237,237,237,1) 100%)",
            filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#fcfcfc', endColorstr='#ededed',GradientType=0 )",
            "border-radius":"72px",
            "box-shadow": "0px 0px 10px rgba(0,0,0,0.2)"
    }

    $scope.border = {
            position:"absolute",
            top:"10px",
            left:"10px",
            width:"500px",
            height:"23px",
            margin:"auto auto auto auto",
            "box-shadow":"0px 0px 4px rgba(0,0,0,0.2)",
            "border-radius":"10px"
    }

    $scope.bar = {
            position:"absolute",
            top:"0px",
            left:"0px",
            width:"20px",
            height:"20px",
            margin:"auto auto auto auto",
            "border-radius":"11px",
            border:"2px solid rgba(30,30,30,0.05)",
            background: "rgb(0, 173, 246)",  
            "box-shadow": "2px 0px 4px rgba(0,0,0,0.4)"
    }
    
    $scope.init = function() {
        $log.info(">>>>>>>>> test init <<<<<<<<<<<<<")
        draw(false)
        $log.info("mynetowrk ", $scope.mynetwork)
        //readData() 
    }

    function readData() {
        bridgeFactory.getVersion().then(
            function(res) {
                $log.info("res : ", res)
            }, 
            function(err) {
                $log.info("err : ", err)
            }
        );
    }

    ipcRenderer.on('FileLoadMsg', (event, arg) => {
        //$log.info("Receive msg : ", arg )
        $log.info("Receive nodes : ", arg._nodes)
        $scope.nodes = new vis.DataSet(arg._nodes)
        $scope.edges = new vis.DataSet(arg._edges)
        $log.info("Receive node read ok")
        //$scope.loadingBar.opacity = 1
        draw(true)
    });

    function destroy() {
        if($scope.network != null) {
            $scope.network.destroy()
            $scope.network = null
        }
    }

    $scope.onLoadFile2 = function() {
        $log.info("test >>>>>>>  on load File2")
    }

    function draw(process_sw) {
        //destroy()
        /*
        $scope.nodes = new vis.DataSet([
            {id: 1, label: 'Node 1'},
            {id: 2, label: 'Node 2'},
            {id: 3, label: 'Node 3'},
            {id: 4, label: 'Node 4'},
            {id: 5, label: 'Node 5'}
        ]);
        // create an array with edges
        $scope.edges = new vis.DataSet([
            {from: 1, to: 3},
            {from: 1, to: 2},
            {from: 2, to: 4},
            {from: 2, to: 5},
            {from: 3, to: 3}
        ]); */
        // create a network
        $scope.container = document.getElementById('mynetwork');

        var data = {
            nodes: $scope.nodes,
            edges: $scope.edges
        };

        var options = {
            nodes: {
                shape: 'dot',
                size: 30,
                font: {
                    size: 16
                },
                borderWidth: 2,
                shadow:true
            },
            edges: {
                width: 2,
                shadow:true
            },
            interaction: {
                navigationButtons: true, 
                keyboard: true
            }, 
            physics: {
                forceAtlas2Based: {
                    gravitationalConstant: -26,
                    centralGravity: 0.005,
                    springLength: 230,
                    springConstant: 0.18
                }, 
                maxVelocity: 146,
                solver: 'forceAtlas2Based',
                timestep: 0.35, 
                stabilization: {
                    enabled:true,
                    iterations:2000,
                    updateInterval:25
                }
            }

        }
        /*
        if(process_sw == false) {
            $scope.loadingBar.opacity = 0
        } else {
            $scope.loadingBar.opacity = 1
        } */
        $scope.network = new vis.Network($scope.container, data, options);

        $scope.network.on("stabilizationProgress", function(params) {
            var maxWidth = 496;
            var minWidth = 20;
            var widthFactor = params.iterations/params.total;
            var width = Math.max(minWidth,maxWidth * widthFactor);
            //var vv = document.getElementById('bar')
            //$log.info("bar : ", vv)

            document.getElementById('bar').style.width = width + 'px';
            //$scope.bar.width = width + 'px';
            //$scope.bar.width = width + 'px';
            //$scope.text = Math.round(widthFactor*100) + '%'; 
            document.getElementById('text').innerHTML = Math.round(widthFactor*100) + '%';
        }); 

        $scope.network.once("stabilizationIterationsDone", function() {
            $scope.text = '100%'
            $scope.width = '496px'
            $scope.loadingBar.opacity = 0
            //setTimeout(function() {$scope.loadingBar.display = 'none';}, 500);
            $log.info(">>>>>>>>>>>>>>>>>>>>> process end !!!!!!!!")
            document.getElementById('text').innerHTML = '100%';
            document.getElementById('bar').style.width = '496px';
            document.getElementById('loadingBar').style.opacity = 0;
            //really clean the dom element
            setTimeout(function () {
                    document.getElementById('loadingBar').style.display = 'none';}, 500);
        }); 
        
    } // function...

    angular.element($window).bind('resize', function() {
        var height = Math.round(window.innerHeight * 0.999) + 'px'
        var width = Math.round(window.innerWidth * 0.999) + 'px'
        $log.info("height : ", height)
        $scope.container.style.height = height
        $scope.loadingBar.height = height
        $scope.loadingBar.width = width
    });

});
