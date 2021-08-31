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
    //repeat and execute as long as teh enemy-robot is alive
    while(enemyHealth > 0) {

        //Option to skip the fight
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.");
        console.log(promptFight);
    
        //if player choses to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT"){
        
            //attack enemy
            enemyHealth = enemyHealth - playerAttack;
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );

            //check enemy health
            if (enemyHealth <=0) {
                window.alert(enemyName + " has died!");
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
            } else {
                window.alert(playerName + " still has " + playerHealth + " health remaining.");
            }
        //if you skip the fight
        } else if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to skip?");
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip the fight. Goodbye!");
                playerMoney = playerMoney - 2;
            } else {
                fight();
            }
        } else {
            window.alert("You need to pick a valid option. Try again!");
        }
    }
}

// Game States
// "WIN" - Player robot has defeated all enemy-robots
// * Fight all enemy-robots - done
// * Defeat all enemy-robots
// "LOSE" - Player robot's health is zero or less

// Execute Function
for(var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}
