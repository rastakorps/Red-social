var app = angular.module('myapp3', ['ngRoute']);

app.factory('recuperar', function() {
  return {mensaje: '',
          codigo:'' }
});

app.config(function($routeProvider) {
  $routeProvider

  .when('/crearGrupo', {
    templateUrl : 'CrearGrupo.html',
    controller:'Crear'
  })

  .when('/entrar', {
    templateUrl : 'Login.html',
    controller:'postController'
  })

 /*.when('/Registro', {
    templateUrl : 'Registro.html'*/

  .otherwise({redirectTo: '/'});
});



 app.controller('postController', ['$scope', '$http', '$location','recuperar',function($scope, $http, $location,recuperar) { 
                
                $scope.postForm = function() {
                var encodedString = 'correo=' +$scope.correo + '&password=' +$scope.password;
 
                $http({
                    method: 'POST',
                    url: 'PHP/autentificacion.php',
                    data: encodedString,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                
                .success(function(data) {
                        if ( data.trim() === 'correct') {
                              document.getElementById('header').style.display = 'none';
                              document.getElementById('header2').style.display = 'block';
                            var aux="";
                            $http({
                                 method: 'POST',
                                 url: 'PHP/php.php',
                                 data: encodedString,
                                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                                }).then(function (response) {var str = JSON.stringify (response.data);
                           
                            
                            var ob = JSON.parse(str, (key, value) => {
                            if (key === 'Name') {
                                recuperar.mensaje=value;
                                }
                            else if(key === 'FK'){
                                
                                recuperar.codigo=value;
                                
                                }    
                                });
                                 
                           });
                          
                                $location.path("/Inicio");

                        } else {
                            alert("El correo ingresado no está registrado");
                        }
                }) 
            }
    }]);

app.controller("inicioController",['$scope','recuperar', function($scope, recuperar) {
  $scope.datos = recuperar;
}]);


 app.controller("Crear",function($scope, $http, recuperar){  
        
      $scope.crearGrupo = function(){ 

     	$http.post("PHP/crearGrupo.php", { 
               'nombre': $scope.nombre,
               'fecha': $scope.fecha,
               'hora': $scope.hora,
               'lugar': $scope.lugar,
               'descripcion': $scope.descripcion,
               'fk': recuperar.codigo
              }).then(function(response){
                    alert(response.data);
                },function(error){
                    alert("Error");
                    
                });                     
      }  
 });  













