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
    console.log("4. Class-wise Attendance");
    console.log("5. Exit");
    console.log("========================================");
}

function viewStudents() {

    const studentsData = JSON.parse(
        fs.readFileSync(studentsFile, "utf-8")
    );

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

    rl.question("\nEnter class: ", (className) => {

        const classStudents = studentsData.students.filter(
            (student) => student.class === className
        );

        if (classStudents.length === 0) {
            console.log("\nClass not found.");
            startApp();
            return;
        }

        const today = new Date().toISOString().split("T")[0];

        const existingRecord = attendanceData.records.find(
            (record) =>
                record.date === today &&
                record.class === className
        );

        if (existingRecord) {
            console.log(
                "\nAttendance for this class has already been marked today."
            );
            startApp();
            return;
        }

        const todayRecord = {
            date: today,
            class: className,
            attendance: []
        };

        let index = 0;

        console.log("\n========================================");
        console.log(`       MARK ATTENDANCE - CLASS ${className}`);
        console.log("========================================");

        function markNextStudent() {

            if (index === classStudents.length) {

                attendanceData.records.push(todayRecord);

                fs.writeFileSync(
                    attendanceFile,
                    JSON.stringify(attendanceData, null, 4)
                );

                console.log("\nAttendance saved successfully.");

                startApp();
                return;
            }

            const student = classStudents[index];

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
    });
}

function viewAttendanceReport() {

    const studentsData = JSON.parse(
        fs.readFileSync(studentsFile, "utf-8")
    );

    const attendanceData = JSON.parse(
        fs.readFileSync(attendanceFile, "utf-8")
    );

    console.log("\n========================================");
    console.log("          ATTENDANCE REPORT");
    console.log("========================================");

    if (attendanceData.records.length === 0) {
        console.log("No attendance records found.");
        startApp();
        return;
    }

    studentsData.students.forEach((student) => {

        let presentDays = 0;
        let totalDays = 0;

        attendanceData.records.forEach((record) => {

            if (record.class !== student.class) {
                return;
            }

            const studentRecord = record.attendance.find(
                (item) => item.studentId === student.id
            );

            if (studentRecord) {

                totalDays++;

                if (studentRecord.status === "Present") {
                    presentDays++;
                }
            }
        });

        const absentDays = totalDays - presentDays;

        let percentage = 0;

        if (totalDays > 0) {
            percentage = (presentDays / totalDays) * 100;
        }

        console.log(`\nStudent: ${student.name}`);
        console.log(`Class: ${student.class}`);
        console.log(`Present: ${presentDays}`);
        console.log(`Absent: ${absentDays}`);
        console.log(`Attendance: ${percentage.toFixed(2)}%`);
    });

    console.log("\n========================================");

    startApp();
}

function classWiseAttendance() {

    const studentsData = JSON.parse(
        fs.readFileSync(studentsFile, "utf-8")
    );

    const attendanceData = JSON.parse(
        fs.readFileSync(attendanceFile, "utf-8")
    );

    rl.question("\nEnter class: ", (className) => {

        const classStudents = studentsData.students.filter(
            (student) => student.class === className
        );

        if (classStudents.length === 0) {
            console.log("\nClass not found.");
            startApp();
            return;
        }

        console.log("\n========================================");
        console.log(`       CLASS ${className} ATTENDANCE`);
        console.log("========================================");

        classStudents.forEach((student) => {

            let presentDays = 0;
            let totalDays = 0;

            attendanceData.records.forEach((record) => {

                if (record.class !== className) {
                    return;
                }

                const studentRecord = record.attendance.find(
                    (item) => item.studentId === student.id
                );

                if (studentRecord) {

                    totalDays++;

                    if (studentRecord.status === "Present") {
                        presentDays++;
                    }
                }
            });

            let percentage = 0;

            if (totalDays > 0) {
                percentage = (presentDays / totalDays) * 100;
            }

            console.log(
                `${student.name} - ${percentage.toFixed(2)}%`
            );
        });

        console.log("========================================");

        startApp();
    });
}

function startApp() {

    showMenu();

    rl.question("Enter your choice: ", (choice) => {

        if (choice === "1") {

            viewStudents();

        } else if (choice === "2") {

            markAttendance();

        } else if (choice === "3") {

            viewAttendanceReport();

        } else if (choice === "4") {

            classWiseAttendance();

        } else if (choice === "5") {

            console.log("\nThank you for using the system.");
            rl.close();

        } else {

            console.log("\nInvalid choice. Please enter 1-5.");
            startApp();
        }
    });
}

startApp();