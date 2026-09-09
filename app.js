const readline = require("readline");
const cropsData = require("./crops.json");

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

function checkPlantHealth() {

    console.log("\nAvailable Crops:");

    cropsData.crops.forEach((crop, index) => {
        console.log(`${index + 1}. ${crop}`);
    });

    rl.question("\nEnter crop name: ", (cropName) => {

        const selectedCrop = cropsData.crops.find(
            (crop) => crop.toLowerCase() === cropName.toLowerCase()
        );

        if (!selectedCrop) {
            console.log("\nInvalid crop name.");
            startApp();
            return;
        }

        rl.question("Enter total number of plants/leaves: ", (total) => {

            total = Number(total);

            if (total <= 0 || isNaN(total)) {
                console.log("\nPlease enter a valid total number.");
                startApp();
                return;
            }

            rl.question("Enter number of affected plants/leaves: ", (affected) => {

                affected = Number(affected);

                if (affected < 0 || isNaN(affected) || affected > total) {
                    console.log("\nPlease enter a valid affected number.");
                    startApp();
                    return;
                }

                const infectionPercentage = (affected / total) * 100;

                console.log("\n========================================");
                console.log("          PLANT HEALTH RESULT");
                console.log("========================================");
                console.log(`Crop: ${selectedCrop}`);
                console.log(`Total Plants/Leaves: ${total}`);
                console.log(`Affected Plants/Leaves: ${affected}`);
                console.log(`Infection Percentage: ${infectionPercentage.toFixed(2)}%`);

                if (affected === 0) {
                    console.log("Health Status: Healthy");
                } else {
                    console.log("Health Status: Infection Detected");
                }

                console.log("========================================");

                startApp();
            });
        });
    });
}

function startApp() {
    showMenu();

    rl.question("Enter your choice: ", (choice) => {

        if (choice === "1") {
            checkPlantHealth();

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
