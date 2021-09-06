//funtion to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

// fight or skip function
var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.");

    // conditional recursive function call
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();

    //if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            
            return true;
        }
    }
    return false;
}

//Create Fight Function
var fight = function(enemy) {

    // keep track of who goes first
    var isPlayerTurn = true;

    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    //repeat and execute as long as the player and the enemy-robot are alive
    while(playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            if (fightOrSkip()) {
                // if true, leave fight by breaking loop
                break;
            }

            //attack enemy
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );

            //check enemy health
            if (enemy.health <=0) {
                window.alert(enemy.name + " has died!");

                //award player money for winning
                playerInfo.money = playerInfo.money + 20;

                //exit fight loop - WIN
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        } else {
             //enemy attack
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );
            
            //check player health
            if (playerInfo.health <= 0) {
                 window.alert(playerInfo.name + " has died!");
                //exit fight loop - LOSE
                break;
            } else {
                window.alert(playerInfo.name+ " still has " + playerInfo.health + " health remaining.");
            }
        }
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
};

// function to set name
var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your Robot's name is " + name);
    return name;
}

// Player info
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function() {
        if (this.money >= 5) {
            window.alert("Refilling player's health by 20 for 5 dollars.")
            this.health += 20;
            this.money -= 5;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 5) {
            window.alert("Upgrading player's attack by 6 for 5 dollars.")
            this.attack += 6;
            this.money -= 5;
        } else {
            window.alert("You don't have enough money!")
        }
    }
};

// Enemy info
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

// Execute Function
var startGame = function() {
    //reset player stats
    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            //let player know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            //pick new enemy to fight
            var pickedEnemyObj = enemyInfo[i];
    
            //reset enemy health
            pickedEnemyObj.health = randomNumber(40, 60);
    
            //use debugger to pause script from running and check what's going on
            //debugger;
    
            //pass the pickedEnemyName variable's value to the fight function, where it will assume the value of the enemyName
            fight(pickedEnemyObj);

            // if player still has health and are not at the last enemy in the array 
            if (playerInfo.health > 0 && i < enemyInfo.length -1) {
                //ask if the player wants to use the store before the next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                //if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
    }
    //after the loop ends, player is either out of health or enemies to fight so run the end game function
    endGame();
};

// function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's See how you did!");

    //check local storage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    highScore = highScore || 0;

    //if player has more money than the high score, player has new highscore
    if (playerInfo.money > highScore && playerInfo.health > 0) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);
        alert(playerInfo.name + " now has the high score of " + playerInfo.money);
    } else {
        alert(playerInfo.name + " did not beat the high score of " + highScore);
    }

    // ask player if they would like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

// shop function
var shop = function() {
    //ask player what they'd like to do
    var shopOptionPrompt = window.prompt (
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 to LEAVE." 
    );
    
    shopOptionPrompt = parseInt(shopOptionPrompt);

    //use switch to carry out action
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store")
            //do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again");
            //call shop again to force player to pick a valid option
            shop();
            break;
    }
};

// start the game when the page loads
startGame();

