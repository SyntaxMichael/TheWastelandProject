$(document).ready(function(){

function randomNumber(){
		return Math.floor(Math.random() * 8);
};

var visibleGameMap = new Array();

function createGameMap(){
	var itemsInMap = new Array()

	for(var i = 0; i < 8; i++){

		itemsInMap[i] = new Array();
		visibleGameMap[i] = new Array();

		for(var j = 0; j <=7; j++){

			itemsInMap[i][j] = {tableCode: '~'};
			visibleGameMap[i][j] = {tableCode: '~'};

			}
		}

	var placeItemsInMap = function(itemsInMap){
			//Separate values so walls/prizes/challenges are not placed in start or end points. Walls/Prizes/Challenges can fall on the same square and replace each other during loop. Methods inside for challenges and prizes are also created.
			var x1 = randomNumber();
			var x2 = randomNumber();

			var y1 = Math.floor(Math.random() * 3);
			var y2 = Math.floor(Math.random() * 4) + 4;

			itemsInMap[x1][y1] = {tableCode: 'S'}
			itemsInMap[x2][y2] = {tableCode: 'G'}

			for(var walls = 0; walls < 20;  walls++){
				var x = randomNumber();
				var y = randomNumber();

				if(x!=x1 && y!=y1){
					if(x!=x2 && x!=y2){
						itemsInMap[x][y] = {tableCode: 'W'};
					}
				}
			}

			for(var walls = 0; walls < 3;  walls++){
				var x = randomNumber();
				var y = randomNumber();

				if(x!=x1 && y!=y1){
					if(x!=x2 && x!=y2){
						itemsInMap[x][y] = {tableCode: 'R'};
					}
				}
			}

			for(var challenges = 0; challenges < 8;  challenges++){
				var x = randomNumber();
				var y = randomNumber();

 				if(x!=x1 && y!=y1){
					if(x!=x2 && x!=y2){
						itemsInMap[x][y] = playerChallenges[Math.floor(Math.random() * 6)];
					}
				}
			}

			for(var prizes = 0; prizes < 8;  prizes++){
				var x = randomNumber();
				var y = randomNumber();

				if(x!=x1 && y!=y1){
					if(x!=x2 && x!=y2){
						itemsInMap[x][y] = playerPrizes[Math.floor(Math.random() * 6)];
					}
				}
			}
	};


	placeItemsInMap(itemsInMap);

	return itemsInMap;
};

/*Returns the start location of the game*/
function getStartLocation(gameMap){
	var playerLocation = [0, 0];
			for(var i = 0; i < 8; i++){

				for(var j = 0; j  <= 7; j++){

					if(gameMap[i][j].tableCode === 'S')
					{
						playerLocation[1] = i;
						playerLocation[0] = j ;

						visibleGameMap[i][j].tableCode = 'YOU';
						gameMap[i][j].tableCode = 'YOU';
						break;

					}
				}
			}
	return playerLocation;
};


/*This function populates an array with objects for challenges. */
function createGameChallenges(){

	var challenges = [
						{tableCode: 'C', monsterName: "Deathclaw", health: 400, hitPoints: 20, runChallenge: function(nextRow, nextColumn)
							{
								var outcome = monsterChallengeFunction(nextRow, nextColumn);

								if(outcome == 'WON'){
									userAction.push("\nYou defeated the " + gameMap[nextRow][nextColumn].monsterName + " at " + nextColumn + ", " + nextRow + " and won a Deathclaw Hand that gives +10 Atk");
									player.challengePrize.push(" ,Deathclaw Hand");
									player.hitPoints += 10;
									return true;
								}else if(outcome == 'LOST'){
									userAction.push("\nYou lost to the " + gameMap[nextRow][nextColumn].monsterName + " at " + nextColumn + ", " + nextRow);
									return false;
								}else{
									userAction.push("\nYou hide as the deathclaw goes away searching for you.");
									return null;
								}
							}},

						{tableCode: 'C', monsterName: "Ghoul", health: 150, hitPoints: 10, runChallenge: function(nextRow, nextColumn)
							{
								var outcome = monsterChallengeFunction(nextRow, nextColumn)

								if(outcome == 'WON'){
									userAction.push("\nYou defeated the " + gameMap[nextRow][nextColumn].monsterName + " at " + nextColumn + ", " + nextRow + " and won a Pulse Gun that grants +5 Atk");
									player.challengePrize.push(" ,Pulse Gun");
									player.hitPoints += 5;
									return true;
								}else if(outcome == 'LOST'){
									userAction.push("\nYou lost to the " + gameMap[nextRow][nextColumn].monsterName + " at " + nextColumn + ", " + nextRow);
									return false;
								}else{
									userAction.push("\nYou successfully outrun the ghoul!");
								}
							}},

						{tableCode: 'C', monsterName: "Radroach", health: 75, hitPoints: 5, runChallenge: function(nextRow, nextColumn)
							{
								var outcome = monsterChallengeFunction(nextRow, nextColumn)

								if(outcome == 'WON'){
									userAction.push("\nYou defeated the " + gameMap[nextRow][nextColumn].monsterName + " at " + nextColumn + ", " + nextRow + " and won a Sledgehammer that grants +3 Atk");
									player.challengePrize.push(" ,Sledgehammer");
									player.hitPoints += 3;
									return true;

								}else if(outcome == 'LOST'){
									userAction.push("\nYou lost to the " + gameMap[nextRow][nextColumn].monsterName + " at " + nextColumn + ", " + nextRow);
									return false;

								}else{
									userAction.push("\nYou got away safely!");
								}
							}},

						{tableCode: 'C', monsterName: "Raider", health: 125, hitPoints: 20, runChallenge: function(nextRow, nextColumn)
							{
								var outcome = monsterChallengeFunction(nextRow, nextColumn)

								if(outcome == 'WON'){
									userAction.push("\nYou defeated the " + gameMap[nextRow][nextColumn].monsterName + " at " + nextColumn + ", " + nextRow + " and won a That Gun that grants +8 Atk");
									player.challengePrize.push(" , That Gun");
									player.hitPoints += 8;
									return true;

								}else if(outcome == 'LOST'){
									userAction.push("\nYou lost to the " + gameMap[nextRow][nextColumn].monsterName + " at " + nextColumn + ", " + nextRow);
									return false;

								}else{
									userAction.push("\nYou got away from the Raider as he goes back to his post");
								}
							}},

						{tableCode: 'C', monsterName: "Radscorpion", health: 85, hitPoints: 10, runChallenge: function(nextRow, nextColumn)
							{
								var outcome = monsterChallengeFunction(nextRow, nextColumn)

								if(outcome == 'WON'){
									userAction.push("\nYou defeated the " + gameMap[nextRow][nextColumn].monsterName + " at " + nextColumn + ", " + nextRow + " and won a Grenade that grants +7 Atk");
									player.challengePrize.push(" ,Grenade");
									player.hitPoints +=7;								
									return true;

								}else if(outcome == 'LOST'){
									userAction.push("\nYou lost to the " + gameMap[nextRow][nextColumn].monsterName + " at " + nextColumn + ", " + nextRow);
									return false;

								}else{
									userAction.push("\nYou got away!");
								}
							}},

						{tableCode: 'C', monsterName: "Super Mutant", health: 200, hitPoints: 25, runChallenge: function(nextRow, nextColumn)
							{
								var outcome = monsterChallengeFunction(nextRow, nextColumn)

								if(outcome == 'WON'){
									userAction.push("\nYou defeated the " + gameMap[nextRow][nextColumn].monsterName + " at " + nextColumn + ", " + nextRow + " and won a Varmint rifle that grants +2 Atk");
									player.challengePrize.push(" ,Varmint rifle");
									player.hitPoints += 2;
									return true;

								}else if(outcome == 'LOST'){
									userAction.push("\nYou lost to the " + gameMap[nextRow][nextColumn].monsterName + " at " + nextColumn + ", " + nextRow);
									return false;

								}else{
									userAction.push("\nYou outran the super mutant who was too slow");
								}
							}},

						{tableCode: 'C', monsterName: "Mister Gutsy", health: 150, hitPoints:10, runChallenge: function(nextRow, nextColumn)
							{
								var outcome = monsterChallengeFunction(nextRow, nextColumn)

								if(outcome == 'WON'){
									userAction.push("\nYou defeated the " + gameMap[nextRow][nextColumn].monsterName + " at " + nextColumn + ", " + nextRow + " and won a Sledgehammer that grants +5 Atk");
									player.challengePrize.push(" ,Big Boomer");
									player.hitPoints += 5;
									return true;

								}else if(outcome == 'LOST'){
									userAction.push("\nYou lost to the " + gameMap[nextRow][nextColumn].monsterName + " at " + nextColumn + ", " + nextRow);
									return false;

								}else{
									userAction.push("\nMister Gutsy can't find you!");
									return false;
								}
							}}];
	return challenges;
};

/*This function creates and populates an array with prizes!*/
function createPlayerPrizes(){
	var prizes = [
			{tableCode: 'P', prizeName: 'Stimpack', runPrize: function(){
				userAction.push("\nYou found a Stimpack and received +50 Health");
				player.prizes.push(" ,Stimpack");
				player.health += 50;
			}},
			{tableCode: 'P', prizeName: 'Nuka-Cola', runPrize: function(){
				userAction.push("\nYou found a Nuka-Cola and received +35 Health");
				player.prizes.push(" ,Nuka-Cola");
				player.health += 35;
			}},
			{tableCode: 'P', prizeName: 'Doctors Bag', runPrize: function(){
				userAction.push("\nYou found a Doctors Bag and received +75 Health");
				player.prizes.push(" ,Doctors Bag");
				player.health += 75;
			}},
			{tableCode: 'P', prizeName: 'Nuka-Cherry', runPrize: function(){
				userAction.push("\nYou found a Nuka-Cherry and received +35 Health");
				player.prizes.push(" ,Nuka-Cherry");
				player.health += 35;
			}},
			{tableCode: 'P', prizeName: 'Insta-Mash', runPrize: function(){
				userAction.push("\nYou found Insta-Mash and received +15 Health");
				player.prizes.push(" ,Insta-Mash");
				player.health += 15;
			}},
			{tableCode: 'P', prizeName: 'Nuka-Cola Quartz', runPrize: function(){
				userAction.push("\nYou found a Nuka-Cola Quartz and received +25 Health");
				player.prizes.push(" ,Nuka-Cola Quartz");
				player.health += 25;
			}},
			{tableCode: 'P', prizeName: 'Nuka-Cola Victory', runPrize: function(){
				userAction.push("\nYou found a Nuka-Cola Victory and received +50 Health");
				player.prizes.push(" ,Nuka-Cola Victory");
				player.health += 50;
			}}];

			return prizes;
};

/*Variables that create the hidden game map and challenges associated with the map*/
var playerChallenges = createGameChallenges();
var playerPrizes = createPlayerPrizes();
var gameMap = createGameMap();

/*Handles statements for each action being initiated */
function gameLogic(nextRow, nextColumn, currentRow, currentColumn){

		if(gameMap[nextRow][nextColumn].tableCode == 'W')
			{

					$("#userChoice").attr('disabled', 'disabled');
					gameMap[nextRow][nextColumn].tableCode = 'W';
					visibleGameMap[nextRow][nextColumn].tableCode = 'RADS';

					userAction.push("\nRadiation! Do not enter!");
					gameMap[currentRow][currentColumn].tableCode = 'YOU';
					visibleGameMap[currentRow][currentColumn].tableCode = 'YOU';
			}

		else if(gameMap[nextRow][nextColumn].tableCode == 'C')
			{
				nextR = nextRow;
				nextC = nextColumn;
				currC = currentColumn;
				currR = currentRow;
				visibleGameMap[nextRow][nextColumn].tableCode = 'Enemy';
				$("#question").text("You have encountered a " + gameMap[nextRow][nextColumn].monsterName + " do you wish to engage in battle? \n Click on attack to engage or move away from the monster.");
				userAction.push("\nYou have encountered a " + gameMap[nextRow][nextColumn].monsterName + " at " + nextColumn + ", " + nextRow);
				$("#userChoice").removeAttr("disabled");
			}

		else if(gameMap[nextRow][nextColumn].tableCode == 'P')
			{
				$("#userChoice").attr('disabled', 'disabled');
				gameMap[nextRow][nextColumn].runPrize();
				playerLocation[0] = nextColumn;
				playerLocation[1] = nextRow;

				gameMap[currentRow][currentColumn].tableCode = 'X';
				gameMap[nextRow][nextColumn].tableCode = 'YOU';

				visibleGameMap[currentRow][currentColumn].tableCode = 'X';
				visibleGameMap[nextRow][nextColumn].tableCode = 'YOU';


			}
		else if(gameMap[nextRow][nextColumn].tableCode == 'R'){
					$("#userChoice").attr('disabled', 'disabled');
					gameMap[nextRow][nextColumn].tableCode = 'YOU';
					visibleGameMap[nextRow][nextColumn].tableCode = 'YOU';

					userAction.push("\nYou suffered radiation poisoning -20 HP :(");
					player.health -=20;
					gameMap[currentRow][currentColumn].tableCode = 'X';
					visibleGameMap[currentRow][currentColumn].tableCode = 'X';
		}

		else if(gameMap[nextRow][nextColumn].tableCode == 'G')
			{
				$("#userChoice").attr('disabled', 'disabled');	
				if(player.prizes.length < 2 || player.challengePrize.length < 1)
				{
					gameMap[currentRow][currentColumn].tableCode = 'YOU';
					visibleGameMap[currentRow][currentColumn].tableCode = 'YOU';
					visibleGameMap[nextRow][nextColumn].tableCode = 'GOAL'

					userAction.push("\nCan't finish the game without beating a monster and finding 2 items!");

				}
				else if(player.prizes.length >= 2 && player.challengePrize.length >= 1)
				{
					userAction.push("\nCongrats! You survived the wasteland!");

					visibleGameMap[currentRow][currentColumn].tableCode = 'X';
					visibleGameMap[nextRow][nextColumn].tableCode = 'YOU'
					$("#up").attr('disabled', 'disabled');
					$("#down").attr('disabled', 'disabled');
					$("#left").attr('disabled', 'disabled');
					$("#right").attr('disabled', 'disabled');
					$("#question").text("Congrats! You survived the wasteland! \n Play again? \n Click below to Quit the game or start a new game!");
					$("#playAgain").removeAttr("disabled");
					$("#quit").removeAttr("disabled");
				}
			}

		else if(gameMap[nextRow][nextColumn].tableCode == '~' || gameMap[nextRow][nextColumn].tableCode == 'X' )
			{
					$("#userChoice").attr('disabled', 'disabled');
					gameMap[currentRow][currentColumn].tableCode = 'X';
					gameMap[nextRow][nextColumn].tableCode = 'YOU';

					visibleGameMap[currentRow][currentColumn].tableCode = 'X';
					visibleGameMap[nextRow][nextColumn].tableCode = 'YOU';

					playerLocation[0] = nextColumn;
					playerLocation[1] = nextRow;

			}
};

var playerLocation = getStartLocation(gameMap);
var player = {health:250, hitPoints:50, location: [playerLocation[0], playerLocation[1]], prizes: [], challengePrize: []};
var userAction = [];
var nextR, nextC, currR, currC;

$("#up").click(function(){
		for(var  upRow = 0; upRow < 8; upRow++)
		{

				for(var upColumn = 0; upColumn  <=7; upColumn++)
				{

					if(visibleGameMap[upRow][upColumn].tableCode == 'YOU' && (upRow-1) >= 0)
						{	
							gameLogic(upRow-1, upColumn, upRow, upColumn);
						}
				}

			}
			player.location = playerLocation;
			drawTable();
});

$("#left").click(function(){
		for(var leftRow = 0; leftRow < 8; leftRow++)
		{

				for(var leftColumn = 0; leftColumn  <= 7; leftColumn++)
				{

					if(visibleGameMap[leftRow][leftColumn].tableCode == 'YOU' && (leftColumn-1) >= 0)
						{
							gameLogic(leftRow, leftColumn-1, leftRow, leftColumn);
						}
				}

			}
			player.location = playerLocation;
			drawTable();
});

$("#right").click(function(){
		for(var rightRow = 7; rightRow >= 0; rightRow--)
		{

				for(var rightColumn = 7; rightColumn >= 0; rightColumn--)
				{

					if(visibleGameMap[rightRow][rightColumn].tableCode == 'YOU' && (rightColumn+1) <= 7)
						{
							gameLogic(rightRow, rightColumn+1, rightRow, rightColumn);
						}
				}

			}
			player.location = playerLocation;
			drawTable();
});

$("#down").click(function(){
		for(var downRow = 7; downRow >= 0; downRow--)
		{

				for(var downColumn = 7; downColumn >= 0; downColumn--)
				{

					if(visibleGameMap[downRow][downColumn].tableCode == 'YOU' && (downRow+1) <= 7)
						{
							gameLogic(downRow+1, downColumn, downRow, downColumn);

						}
				}

			}
			player.location = playerLocation;
			drawTable();
});

function drawTable(){
	$("#gameMap").empty();
	$("#HUD").text("Health: " + player.health + " || Attack Points: " + player.hitPoints + " || Current Location: " + player.location + " || Prizes Received: " + player.prizes + " || Challenge Prizes: " + player.challengePrize);

	var table = $("<center><table></table></center>");
	for(var columns = 0; columns <8; columns++){
		table.append('<tr>');
	    for(var row = 0; row <=7; row++){
	    	if(visibleGameMap[columns][row].tableCode != '~'){
	    	table.append('<td style = \"border: 1px solid green;\" width = \"13%\";\> ' + visibleGameMap[columns][row].tableCode + ' </td>');
	    	}else{
	    	table.append('<td></td>')
	    	}
	};
	    table.append('<tr>');
	};

		$("#gameMap").append(table);

	$("#summary").text(userAction).scrollTop($("#summary")[0].scrollHeight);
};

function monsterChallengeFunction(nextC, nextR){

		while(gameMap[nextR][nextC].health > 0 && player.health > 0)
		{
			var userAttack = randomNumber();
			var monsterAttack = randomNumber();

			if(userAttack >= monsterAttack){

				gameMap[nextR][nextC].health -= player.hitPoints;
				userAction.push("\nYou hit the monster and his health is at " + gameMap[nextR][nextC].health);
			}
				else
			{
				player.health -= gameMap[nextR][nextC].hitPoints;
				userAction.push("\nThe monster hit you and your health is at " + player.health);
			}

		}//End While Loop
		var isWin;
		if(gameMap[nextR][nextC].health <= 0){

				playerLocation[0] = nextC;
				playerLocation[1] = nextR;

				gameMap[currR][currC].tableCode = 'X';
				gameMap[nextR][nextC].tableCode = 'YOU';

				visibleGameMap[currR][currC].tableCode = 'X';
				visibleGameMap[nextR][nextC].tableCode = 'YOU';

				$("#question").text("You won the challenge!");
				drawTable();
				return isWin ='WON';

		}else if(player.health <= 0){
				$("#question").text("You lost the challenge and died! \n Play again? Click below to Quit the game or start a new game!");

				$("#up").attr('disabled', 'disabled');
				$("#down").attr('disabled', 'disabled');
				$("#left").attr('disabled', 'disabled');
				$("#right").attr('disabled', 'disabled');
				$("#playAgain").removeAttr("disabled");
				$("#quit").removeAttr("disabled");

				return isWin = 'LOST';
		}else
				return null;
};

$("#userChoice").click(function(){
	gameMap[nextR][nextC].runChallenge(nextC, nextR);
	$("#userChoice").attr('disabled', 'disabled');
});

$("#playAgain").click(function(){
	location.reload();
	$("#playAgain").attr('disabled', 'disabled');
});

$("#quit").click(function(){
	alert("Thanks for Playing!");
	window.close();
});

drawTable();
});