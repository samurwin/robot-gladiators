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

// Execute Function
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
    } else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }
}