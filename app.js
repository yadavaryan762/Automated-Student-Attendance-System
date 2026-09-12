const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const studentsFile = "./students.json";
const attendanceFile = "./attendance.json";

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

function markAttendance() {

    const studentsData = JSON.parse(
        fs.readFileSync(studentsFile, "utf-8")
    );

    const attendanceData = JSON.parse(
        fs.readFileSync(attendanceFile, "utf-8")
    );

    const today = new Date().toISOString().split("T")[0];

    const todayRecord = {
        date: today,
        attendance: []
    };

    let index = 0;

    console.log("\n========================================");
    console.log("           MARK ATTENDANCE");
    console.log("========================================");

    function markNextStudent() {

        if (index === studentsData.students.length) {

            attendanceData.records.push(todayRecord);

            fs.writeFileSync(
                attendanceFile,
                JSON.stringify(attendanceData, null, 4)
            );

            console.log("\nAttendance saved successfully.");

            startApp();
            return;
        }

        const student = studentsData.students[index];

        rl.question(
            `Is ${student.name} present? (y/n): `,
            (answer) => {

                if (answer.toLowerCase() === "y") {

                    todayRecord.attendance.push({
                        studentId: student.id,
                        status: "Present"
                    });

                    index++;
                    markNextStudent();

                } else if (answer.toLowerCase() === "n") {

                    todayRecord.attendance.push({
                        studentId: student.id,
                        status: "Absent"
                    });

                    index++;
                    markNextStudent();

                } else {

                    console.log("Please enter y or n.");
                    markNextStudent();
                }
            }
        );
    }

    markNextStudent();
}

function startApp() {

    showMenu();

    rl.question("Enter your choice: ", (choice) => {

        if (choice === "1") {

            viewStudents();

        } else if (choice === "2") {

            markAttendance();

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