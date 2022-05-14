//should be a random number fucntion here??

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
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
    //keep track of who goes first
    var isPlayerTurn = true;

    //randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            //ask player if they'd like to fight or skip using fightOrSkip function
            if (fightOrSkip()) {
                //if true, leave fight by breaking loop
                break;
            }

            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            //remove enemy's health by subtracting the amount we set in the damage variable 
            enemy.health = Math.max(-, enemy.health - damage);
            console.log(
                playerInfo.name +
                " attacked " +
                enemy.name +
                " . " +

                enemy.name +
                " now has " +
                enemy.health +
                " health remaining. "
            );

            //check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died! ");

                //award player moeny for winning
                playerInfo.money = playerInfo.money + 20;

                //leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
            //player gets attacked first
        } else {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            //remove player's health by subtracting the amount we set in the damage variable
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.name +
                " attacked " +
                playerInfo.name +
                ". " +
                playerInfo.name +
                " now has " +
                playerInfo.health +
                " health remaining."
            );

            //check player's health 
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                //leave while() loop if player is dead
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health remaining. ");
            }
        }
        //switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
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