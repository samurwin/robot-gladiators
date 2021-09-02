//funtion to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

//Create Fight Function
var fight = function(enemy) {

    //repeat and execute as long as the player and the enemy-robot are alive
    while(playerInfo.health > 0 && enemy.health > 0) {

        //Option to skip the fight
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.");

        //if player picks skip confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                //subtract money from playerMoney for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerMoney " + playerInfo.money);
                break;
            }
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
};

// Game States
// "WIN" - Player robot has defeated all enemy-robots
// * Fight all enemy-robots - done
// * Defeat all enemy-robots - done
// "LOSE" - Player robot's health is zero or less
// Play again feature
// * Option to play again
// Store Feature
// * Option to buy health or attack
// * Option to leave the store

// Player info
var playerInfo = {
    name: window.prompt("What is your robot's name?"),
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
    //if player is still alive, player wins
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + " .");
    } else {
        window.alert("You've lost your robot in battle.");
    }
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
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice." 
    );
    //use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        case "LEAVE":
        case "leave":
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

