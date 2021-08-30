// Player info
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

console.log(playerName, playerAttack, playerHealth);

// Enemy info
var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyName, enemyAttack, enemyHealth);

//Create Fight Function
var fight = function() {
    // Alert players that they are starting the round
    window.alert("Welcome to Robot Gladiators!");

    //Subtract the value of 'playerAttack' from the value of 'enemyHealth'
    enemyHealth = enemyHealth - playerAttack;

    //Log a resulting message to the console so we know it worked
    console.log(
        playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining. "
        );
    
    //Check enemy Health
    if (enemyHealth <= 0) {
        window.alert(enemyName + " has died ");
    }
    else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    //Subtract the value of 'enemyAttack' from the value of 'playerHealth
    playerHealth = playerHealth - enemyAttack;

    //Log a resulting message to the console so we know it worked
    console.log(
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining. "
        );
    //Check Player health
    if (playerHealth <= 0) {
       window.alert(playerName + " has died. ");
    }
    else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
    }

};

// Execute Function
fight();
