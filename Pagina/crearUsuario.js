 var app = angular.module("myapp",[]);  
 app.controller("formController", function($scope, $http){  
      $scope.insertData = function(){  
     	$http.post("crearUsuario.php", { 
               'nombre': $scope.nombre,
               'apellido': $scope.apellido,
               'telefono': $scope.telefono,
               'codigo': $scope.codigo,
               'correo': $scope.correo 
              }).then(function(response){
                    alert(response.data);
                },function(error){
                    alert("Error");
                    
                });
            
      }  
 });  
