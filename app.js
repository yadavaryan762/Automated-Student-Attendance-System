const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const studentsFile = "./students.json";

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

function viewStudents() {

    const data = fs.readFileSync(studentsFile, "utf-8");
    const studentsData = JSON.parse(data);

    console.log("\n========================================");
    console.log("             STUDENT LIST");
    console.log("========================================");

    studentsData.students.forEach((student) => {
        console.log(
            `${student.id}. ${student.name} - Class ${student.class}`
        );
    });

    console.log("========================================");

    startApp();
}

function startApp() {

    showMenu();

    rl.question("Enter your choice: ", (choice) => {

        if (choice === "1") {

            viewStudents();

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