//should be a random number fucntion here??
//function to set hame
var getPlayerName = function() {
    var name = "";

    while (name ===  "" || name === null) {
        name = prompt(" What is your robot's name? ");
    }

    console.log(" Your robot's name is " + name);
    return name;
}


var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, //comma!!
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert(" Refilling player's health by 20 for 7 dollars. ");
            this.health += 20;
            this.money - + 7;
        }
        else {
            window.alert(" You don't have enough money! ");
        }
    },//comma!!
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert(" Upgrading player's attack by 6 for 7 dollars. ");
            this.attack += 6;
            this.money - + 7;
        }
        else {
            window.alert(" You don't have enough money! ");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: 12
    },
    {
        name: "Amy Android",
        attack: 13
    },
    {
        name: "Robo Trumble",
        attack: 14
    }
];
//fight function
var fight = function (enemy) {
    while (playerInfo.health > 0 && enemy.health > 0) {
        // ask player if they'd like to fight or run
        var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

        // if player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
                // subtract money from playerInfo.money for skipping
                playerInfo.money = playerInfo.money - 10;
                console.log("playerInfo.money", playerInfo.money)
                break;
            }
        }

        // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
        enemy.health = enemy.health - playerInfo.attack;
        console.log(
            playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
        );

        // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + ' has died!');

            // award player money for winning
            playerInfo.money = playerInfo.money + 20;
            // leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
        }

        // remove players's health by subtracting the amount set in the enemyAttack variable
        playerInfo.health = playerInfo.health - enemy.attack;
        console.log(
            enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
        );

        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + ' has died!');
            // leave while() loop if player is dead
            break;
        } else {
            window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
        }
    } // end of while loop
}; // end of fight function

//run fight function to start game
var startGame = function () {
    //reset player stats
    playerInfo.reset();
    for (var i = 0; i < enemyInfo.length; i++) {

        if (playerInfo.health > 0) {
            //let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            //pick new enemy to figh tbased on teh index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];

            pickedEnemyObj.health = randomNumber(40, 60);

            fight(pickedEnemyObj);

            //if player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyNames.length - 1) {
                //ask if player wants to use the store before next round
                var storeConfirm = window.confirm(" The fight is over, visit the store before the next round? ");

                //if yes, take them to the store() function

                if (storeConfirm) {
                    shop();
                }
            }
        }

        else {
            window.alert("You have lost your robot in battle! Game OVer!");
            break;
        }
    }
    //play again
    startGame();
    //after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

//function to end the entire game
var endGame = function () {
    //if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert(" Great job, you've survived the game!  You now have a score of " + playerInfo.money + " . ");
    }
    else {
        window.alert(" You've lost  your robot in battle. ");
    }
    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm(" Would yopu like to play again? ");

    if (playerAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert(" Thank you for playing Robo Gladiators! Come back soon! ");
    }
};

var shop = function () {
    //ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        " Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice. "
    )

    //use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break; 
            
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;

        case "LEAVE": //new case
        case "leave":
            window.alert("Leaving the store. ");

            //do nothing, so function will end
            break;
        default:
            window.alert(" You did not pick a valid option.  Try again. ");

            //call shop () again to force player to pick a valid option
            shop();
            break;

    }
};

//start the game when the page loads
startGame();