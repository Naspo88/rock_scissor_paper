angular
	.module("rsp")
	.controller('MainController', MainController);

function MainController ($scope) {
	var vm = this,
		wait = false,
		winsPoints = 5,
		getRandomArbitary = function (min, max) {
		    return Math.floor(Math.random() * (max - min) + min);
		},
		alertMsg = function (msg, callback) {
			vm.alert = "show";
			setTimeout(function(){
				vm.alert = "";
				callback();
			}, 1500);
		};

	// All hand winning condition
	var hands = {
		rock: "scissor",
		scissor: "paper",
		paper: "rock"
	};

	// Initialize choices
	vm.choice = {
		user: "none",
		cpu: "none"
	};
	// Initialize points
	vm.points = {
		user: 0,
		cpu: 0
	};
	vm.endGame = "";
	vm.alert = "";

	// Bindable functions
	vm.play = play;
	vm.resetGame = resetGame;

	// Function that makes the choice for the computer and declares who win the match
	function play (choice) {
		if (!wait) {
			vm.choice.user = choice;
			wait = true;
			var poss = ["rock", "scissor", "paper"],
				rand = getRandomArbitary(0, poss.length),
				resetMatch = function () {
					vm.choice.user = "none";
					vm.choice.cpu = "none";

					checkVictory();
				},
				checkVictory = function () {
					if (vm.points.user == winsPoints || vm.points.cpu == winsPoints) {
						vm.endGame = "show";
						vm.winner = (vm.points.user == winsPoints) ? "you win!" : "you lose!"
					}

					$scope.$apply();
					wait = false;
				};

			vm.choice.cpu = poss[rand];

			if (vm.choice.user == vm.choice.cpu) {
				alertMsg("tie", function () {
					resetMatch();
				});
			} else {
				if (hands[vm.choice.user] == vm.choice.cpu) {
					vm.points.user = vm.points.user + 1;
					alertMsg("player win", function () {
						resetMatch();
					});
				} else {
					vm.points.cpu = vm.points.cpu + 1;
					alertMsg("computer win", function () {
						resetMatch();
					});
				}
			}
		}
	};

	//Function that resets the game at the end of it
	function resetGame () {
		vm.points.user = 0;
		vm.points.cpu = 0;
		vm.endGame = "";
	}
}