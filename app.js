const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log("\n========================================");
    console.log(" AUTOMATED STUDENT ATTENDANCE SYSTEM");
    console.log("          FOR RURAL SCHOOLS");
    console.log("========================================");
    console.log("1. View Students");
    console.log("2. Mark Attendance");
    console.log("3. View Attendance Report");
    console.log("4. Exit");
    console.log("========================================");
}

function startApp() {
    showMenu();

    rl.question("Enter your choice: ", (choice) => {

        if (choice === "1") {
            console.log("\nStudent list module will be added soon.");
            startApp();

        } else if (choice === "2") {
            console.log("\nAttendance module will be added soon.");
            startApp();

        } else if (choice === "3") {
            console.log("\nReport module will be added soon.");
            startApp();

        } else if (choice === "4") {
            console.log("\nThank you for using the system.");
            rl.close();

        } else {
            console.log("\nInvalid choice. Please enter 1-4.");
            startApp();
        }
    });
}

startApp();