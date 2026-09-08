const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log("\n========================================");
    console.log("   SMART CROP HEALTH SYSTEM");
    console.log("========================================");
    console.log("1. Check Plant Health");
    console.log("2. Pesticide Recommendation");
    console.log("3. Usage Report");
    console.log("4. Exit");
    console.log("========================================");
}

function startApp() {
    showMenu();

    rl.question("Enter your choice: ", (choice) => {

        if (choice === "1") {
            console.log("\nPlant Health module will be added soon.");
            startApp();

        } else if (choice === "2") {
            console.log("\nPesticide Recommendation module will be added soon.");
            startApp();

        } else if (choice === "3") {
            console.log("\nUsage Report module will be added soon.");
            startApp();

        } else if (choice === "4") {
            console.log("\nThank you for using Smart Crop Health System.");
            rl.close();

        } else {
            console.log("\nInvalid choice. Please enter 1-4.");
            startApp();
        }
    });
}

startApp();