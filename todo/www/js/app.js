angular.module('phonX', ['ionic'])

.controller('PhonXCtrl', function($scope, $ionicModal) {
  // No need for testing data anymore
  $scope.tasks = [];

  // Create and load the Log In Modal
  $ionicModal.fromTemplateUrl('login.html', function(modal) {
    $scope.loginModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  // Create and load the Sign Up Modal
  $ionicModal.fromTemplateUrl('signUp.html', function(modal) {
    $scope.signUpModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });


  // Called when the form is submitted
  $scope.createTask = function(task) {
    $scope.tasks.push({
      title: task.title
    });
    $scope.loginModal.hide();
    task.title = "";
  };

  // Open our new task modal
  $scope.oldUser = function() {
    $scope.loginModal.show();
  };

  // Close the new task modal
  $scope.closeOldUser = function() {
    $scope.loginModal.hide();
  };
  // Called when the form is submitted
  $scope.createTask = function(task) {
    $scope.tasks.push({
      title: task.title
    });
    $scope.signUpModal.hide();
    task.title = "";
  };

  // Open our new task modal
  $scope.newUser = function() {
    $scope.signUpModal.show();
  };

  // Close the new task modal
  $scope.closeNewUser = function() {
    $scope.signUpModal.hide();
  };


})