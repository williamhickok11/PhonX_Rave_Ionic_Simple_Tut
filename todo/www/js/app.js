angular.module('phonX', ['ionic'])

.factory('Users', function() {
  return {
    a : 3
  }
})
.factory('MoreUsers', function() {
  return {
    b : 7
  }
})

.controller('PhonXCtrl', function($scope, $ionicModal, $http) {
  // Reference to firebase database
  var currentPlayerUID;
  var ref = new Firebase("https://phonx-rave.firebaseio.com/");
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





  // Create a new user. Called when the form is submitted
  $scope.createNewUser = function(newUserInfo) {
    console.log("new User", newUserInfo)
    $http({
      url: "https://phonx-rave.firebaseio.com/Players/.json",
      method: "GET"
    }).then(function(data) {
      var playerList = data.data;
      // set a flag variable
      var isTaken = false;
      for (var player in playerList) {
        // Check for duplicate names in firebase
        if (playerList[player].userName === newUserInfo.userName) {
          isTaken = true;
          console.log(playerList[player].userName)
        }
      }
      if (isTaken === true) {
        alert("That user name is already taken.")
        return;
      } else {
        ref.createUser({
          email    : newUserInfo.userEmail,
          password : newUserInfo.userPassword
        }, function(error, userData) {
          if (error) {
            if (newUserInfo.userName === "" || newUserInfo.userEmail === "" || newUserInfo.userPassword === "") {
              alert("Please fill in all the required information");
              return;
            };
            console.log("Error creating user:", error);
            var message = error.toString();
            if (message.indexOf("The specified email address") > 0) {
              alert("This email is already associated with another profile")
            };
          } else {
            if (newUserInfo.userName === "" || newUserInfo.userEmail === "" || newUserInfo.userPassword === "") {
              alert("Please fill in all the required information");
              return;
            };
            console.log("Successfully created user account with uid:", userData.uid);
            // On click, create the game
            console.log("ref.getAuth", userData.uid);
            currentPlayerUID = uid;
            // var authData = ref.getAuth()
            var newPlayersRef = ref.child("Players");
            var newPlayer = newPlayersRef.push();
            newPlayer.set({
              userName: newUserInfo.userName,
              slime_longestStreak: 0,
              slime_highScore: 0,
              pioneer66_longestStreak: 0,
              pioneer66_highScore: 0,
              lvl3_longestStreak: 0,
              lvl3_highScore: 0,
              lvl4_longestStreak: 0,
              lvl4_highScore: 0,
              lvl5_longestStreak: 0,
              lvl5_highScore: 0,
              lvl6_longestStreak: 0,
              lvl6_highScore: 0,
              lvl7_longestStreak: 0,
              lvl7_highScore: 0,
              lvl8_longestStreak: 0,
              lvl8_highScore: 0,
              lvl9_longestStreak: 0,
              lvl9_highScore: 0,
              lvl10_longestStreak: 0,
              lvl10_highScore: 0,
              lvl11_longestStreak: 0,
              lvl11_highScore: 0,
              lvl12_longestStreak: 0,
              lvl12_highScore: 0,
              lvl13_longestStreak: 0,
              lvl13_highScore: 0,
              lvl14_longestStreak: 0,
              lvl14_highScore: 0,
              lvl15_longestStreak: 0,
              lvl15_highScore: 0,
              playerId: userData.uid
            });
          }
        }
    })
    $scope.signUpModal.hide();
    // newUserInfo.userName = "";
    // newUserInfo.userEmail = "";
    // newUserInfo.userPassword = "";
  };

  // Open our new task modal
  $scope.newUser = function() {
    $scope.signUpModal.show();
  };
  // Close the new task modal
  $scope.closeNewUser = function() {
    $scope.signUpModal.hide();
    // var logInScreen = document.getElementById("LogInScreen");
    // console.log("login", logInScreen);
    // logInScreen.innerHTML = "";
  };








})