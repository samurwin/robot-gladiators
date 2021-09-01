// Player info
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// Enemy info
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//Create Fight Function
var fight = function(enemyName) {
    //repeat and execute as long as the player and the enemy-robot are alive
    while(playerHealth > 0 && enemyHealth > 0) {

        //Option to skip the fight
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.");

        //if player picks skip confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                //subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney" + playerMoney);
                break;
            }
        }

            //attack enemy
            enemyHealth = enemyHealth - playerAttack;
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );

            //check enemy health
            if (enemyHealth <=0) {
                window.alert(enemyName + " has died!");

                //award player money for winning
                playerMoney = playerMoney + 20;

                //exit fight loop - WIN
                break;
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

            //enemy attack
            playerHealth = playerHealth - enemyAttack;
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );

            //check player health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
                //exit fight loop - LOSE
                break;
            } else {
                window.alert(playerName + " still has " + playerHealth + " health remaining.");
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

// Execute Function
var startGame = function() {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            //let player know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
    
            //pick new enemy to fight
            var pickedEnemyName = enemyNames[i];
    
            //reset enemy health
            enemyHealth = 50;
    
            //use debugger to pause script from running and check what's going on
            debugger;
    
            //pass the pickedEnemyName variable's value to the fight function, where it will assume the value of the enemyName
            fight(pickedEnemyName);

            // if player still has health and are not at the last enemy in the array 
            if (playerHealth > 0 && i < enemyNames.length -1) {
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
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + " .");
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
            if (playerMoney >= 5) {
                window.alert("Refilling player's health by 20 for 5 dollars.");
                //increace health and decreace money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 5;
            } else {
                window.alert("You don't have enough money!");
            }
            break;
        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 5 dollars.");
                //increace attack and decreace money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 5;
            } else {
                window.alert("You don't have enough money!");
            }
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

