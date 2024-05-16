#! /usr/bin/env node 
import inquirer from "inquirer";

class Student {
  static counter = 10000;
  id: number;
  name: string;
  courses: string[];
  balance: number;

  constructor(name: string) {
    this.id = Student.counter++;
    this.name = name;
    this.courses = [];
    this.balance = 1000;
  }
  enrollCourse(course: string) {
    this.courses.push(course);
  }
  viewBalance() {
    console.log(`Balance for ${this.name}: ${this.balance}`);
  }
  tuitionFees(amount: number) {
    this.balance -= amount;
    console.log(`Tuition fees paid successfully: ${amount}`);
  }
  viewStatus() {
    console.log(`ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Courses: ${this.courses}`);
    console.log(`Balance: ${this.balance}`);
  }
}
class StudentInfo {
  students: Student[];

  constructor() {
    this.students = [];
  }
  addStudent(name: string) {
    let student = new Student(name);
    this.students.push(student);
    console.log(`Student ${name} added successfully with Student ID: ${student.id}`);
  }
  enrollStudent(studentId: number, course: string) {
    let student = this.findStudent(studentId);
    if (student) {
      student.enrollCourse(course);
      console.log(`${student.name} is enrolled successfully in ${course}`);
    } else {
      console.log('Student not found. Enter correct ID.');
    }
  }
  viewStudentBalance(studentId: number) {
    let student = this.findStudent(studentId);
    if (student) {
      student.viewBalance();
    } else {
      console.log('Student not found. Enter correct ID.');
    }
  }
  payStudentFees(studentId: number, amount: number) {
    let student = this.findStudent(studentId);
    if (student) {
      student.tuitionFees(amount);
    } else {
      console.log('Student not found. Enter correct ID.');
    }
  }
  showStudentStatus(studentId: number) {
    let student = this.findStudent(studentId);
    if (student) {
      student.viewStatus();
    } else {
      console.log('Student not found. Enter correct ID.');
    }
  }
  findStudent(studentId: number) {
    return this.students.find(student => student.id === studentId);
  }
}
async function run() {
  let studentInfo = new StudentInfo();
  while (true) {
    let { choices } = await inquirer.prompt([
      {
        name: "choices",
        type: "list",
        message: "Select your item",
        choices: ["Add Student", "Enroll Student", "View Balance", "Tuition Fees", "Show Status", "Exit"],
      }
    ]);
    switch (choices) {
      case "Add Student":
        let { name:addName} = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: "Enter student name",
          }
        ]);
        studentInfo.addStudent(addName);
        break;
      case "Enroll Student":
        let { id: enrollId, course } = await inquirer.prompt([
          {
            name: "id",
            type: "input",
            message: "Enter student ID",
          },
          {
            name: "course",
            type: "input",
            message: "Enter student course",
          }
        ]);
        studentInfo.enrollStudent(parseInt(enrollId), course);
        break;
      case "View Balance":
        let { id: balanceId } = await inquirer.prompt([
          {
            name: "id",
            type: "input",
            message: "Enter student ID",
          }
        ]);
        studentInfo.viewStudentBalance(parseInt(balanceId));
        break;
      case "Tuition Fees":
        let { id: feesId, amount } = await inquirer.prompt([
          {
            name: "id",
            type: "input",
            message: "Enter student ID",
          },
          {
            name: "amount",
            type: "input",
            message: "Enter amount",
          }
        ]);
        studentInfo.payStudentFees(parseInt(feesId), parseFloat(amount));
        break;
      case "Show Status":
        let { id: statusId } = await inquirer.prompt([
          {
            name: "id",
            type: "input",
            message: "Enter student ID",
          }
        ]);
        studentInfo.showStudentStatus(parseInt(statusId));
        break;
      case "Exit":
        console.log("Exiting from Student Management System");
        process.exit();
    }
  }
}
run();
