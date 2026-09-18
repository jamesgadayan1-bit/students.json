/*
  Activity: Student Records Data Processor
  Pure JavaScript solution

  This file uses no HTML, CSS, Node.js APIs, or external libraries.
  It can be pasted into a browser-based JavaScript editor.
*/

const students = [
  { id: 1, name: "Aisha Khan", year: 1, course: "Computer Science", grades: [85, 91, 88], enrolled: true },
  { id: 2, name: "Liam Carter", year: 2, course: "Mathematics", grades: [78, 82, 80], enrolled: true },
  { id: 3, name: "Mia Santos", year: 3, course: "Biology", grades: [92, 89, 95], enrolled: true },
  { id: 4, name: "Noah Williams", year: 1, course: "History", grades: [74, 81, 77], enrolled: false },
  { id: 5, name: "Sofia Garcia", year: 2, course: "Computer Science", grades: [96, 94, 98], enrolled: true },
  { id: 6, name: "Ethan Brown", year: 4, course: "Physics", grades: [87, 84, 90], enrolled: true },
  { id: 7, name: "Olivia Wilson", year: 1, course: "English", grades: [88, 91, 86], enrolled: true },
  { id: 8, name: "Lucas Martinez", year: 3, course: "Mathematics", grades: [83, 79, 85], enrolled: false },
  { id: 9, name: "Amelia Jones", year: 2, course: "Biology", grades: [90, 93, 88], enrolled: true },
  { id: 10, name: "James Taylor", year: 4, course: "History", grades: [76, 72, 80], enrolled: true },
  { id: 11, name: "Isabella Lee", year: 1, course: "Physics", grades: [95, 92, 94], enrolled: true },
  { id: 12, name: "Benjamin White", year: 2, course: "English", grades: [81, 85, 83], enrolled: false },
  { id: 13, name: "Charlotte Harris", year: 3, course: "Computer Science", grades: [89, 91, 93], enrolled: true },
  { id: 14, name: "Henry Clark", year: 1, course: "Mathematics", grades: [70, 75, 73], enrolled: true },
  { id: 15, name: "Evelyn Lewis", year: 4, course: "Biology", grades: [97, 96, 94], enrolled: true },
  { id: 16, name: "Alexander Young", year: 2, course: "History", grades: [84, 86, 82], enrolled: false },
  { id: 17, name: "Harper Walker", year: 3, course: "Physics", grades: [91, 89, 92], enrolled: true },
  { id: 18, name: "Daniel Hall", year: 1, course: "English", grades: [79, 77, 82], enrolled: true },
  { id: 19, name: "Ella Allen", year: 2, course: "Computer Science", grades: [93, 90, 95], enrolled: true },
  { id: 20, name: "Michael King", year: 4, course: "Mathematics", grades: [88, 86, 90], enrolled: true },
  { id: 21, name: "Grace Wright", year: 1, course: "Biology", grades: [85, 87, 84], enrolled: false },
  { id: 22, name: "Sebastian Scott", year: 3, course: "History", grades: [91, 88, 90], enrolled: true },
  { id: 23, name: "Chloe Green", year: 2, course: "Physics", grades: [82, 80, 85], enrolled: true },
  { id: 24, name: "Jack Baker", year: 4, course: "English", grades: [94, 92, 96], enrolled: true },
  { id: 25, name: "Lily Adams", year: 1, course: "Computer Science", grades: [80, 84, 82], enrolled: true },
  { id: 26, name: "William Nelson", year: 2, course: "Mathematics", grades: [75, 78, 76], enrolled: false },
  { id: 27, name: "Zoe Hill", year: 3, course: "Biology", grades: [89, 91, 90], enrolled: true },
  { id: 28, name: "Matthew Ramirez", year: 4, course: "History", grades: [83, 85, 81], enrolled: true },
  { id: 29, name: "Nora Campbell", year: 1, course: "Physics", grades: [86, 88, 87], enrolled: true },
  { id: 30, name: "Samuel Mitchell", year: 2, course: "English", grades: [90, 87, 89], enrolled: false }
];

function validateStudents(students) {
  if (!Array.isArray(students)) {
    throw new TypeError("students must be an array.");
  }
}

function cloneStudent(student) {
  return {
    ...student,
    grades: Array.isArray(student.grades) ? [...student.grades] : []
  };
}

function round(number, decimalPlaces = 2) {
  const factor = 10 ** decimalPlaces;
  return Math.round((number + Number.EPSILON) * factor) / factor;
}

function getAverageGrade(student) {
  if (!student || typeof student !== "object") {
    throw new TypeError("student must be an object.");
  }

  const grades = Array.isArray(student.grades)
    ? student.grades.filter(grade => typeof grade === "number" && Number.isFinite(grade))
    : [];

  if (grades.length === 0) {
    return 0;
  }

  return round(grades.reduce((total, grade) => total + grade, 0) / grades.length);
}

function getTopStudents(students, n) {
  validateStudents(students);

  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError("n must be a non-negative integer.");
  }

  return students
    .map(student => cloneStudent(student))
    .sort((studentA, studentB) => {
      return getAverageGrade(studentB) - getAverageGrade(studentA);
    })
    .slice(0, n);
}

function groupByCourse(students) {
  validateStudents(students);

  return students.reduce((groups, student) => {
    const course = student.course || "Unassigned";

    if (!groups[course]) {
      groups[course] = [];
    }

    groups[course].push(cloneStudent(student));
    return groups;
  }, {});
}

function getEnrolledCount(students) {
  validateStudents(students);

  return {
    enrolled: students.filter(student => student.enrolled === true).length,
    notEnrolled: students.filter(student => student.enrolled !== true).length
  };
}

function findStudent(students, name) {
  validateStudents(students);

  if (typeof name !== "string") {
    return null;
  }

  const searchName = name.trim().toLowerCase();
  const student = students.find(
    currentStudent => typeof currentStudent.name === "string" &&
      currentStudent.name.toLowerCase() === searchName
  );

  return student ? cloneStudent(student) : null;
}

function getCourseAverages(students) {
  validateStudents(students);

  const courseGrades = students.reduce((courses, student) => {
    const course = student.course || "Unassigned";
    const grades = Array.isArray(student.grades) ? student.grades : [];
    const validGrades = grades.filter(
      grade => typeof grade === "number" && Number.isFinite(grade)
    );

    if (!courses[course]) {
      courses[course] = [];
    }

    courses[course].push(...validGrades);
    return courses;
  }, {});

  return Object.keys(courseGrades)
    .map(course => {
      const grades = courseGrades[course];
      const average = grades.length === 0
        ? 0
        : grades.reduce((total, grade) => total + grade, 0) / grades.length;

      return { course, average: round(average) };
    })
    .sort((courseA, courseB) => courseB.average - courseA.average);
}

function exportSummary(students) {
  validateStudents(students);

  const allGrades = students.reduce((grades, student) => {
    const validGrades = Array.isArray(student.grades)
      ? student.grades.filter(grade => typeof grade === "number" && Number.isFinite(grade))
      : [];

    return grades.concat(validGrades);
  }, []);

  const topStudent = getTopStudents(students, 1)[0] || null;

  return {
    totalStudents: students.length,
    overallAverageGrade: allGrades.length === 0
      ? 0
      : round(allGrades.reduce((total, grade) => total + grade, 0) / allGrades.length),
    topPerformingStudent: topStudent,
    breakdownByCourse: getCourseAverages(students)
  };
}

// Optional stretch goals
function filterByYear(students, year) {
  validateStudents(students);
  return students
    .filter(student => student.year === year)
    .map(student => cloneStudent(student));
}

function sortByName(students) {
  validateStudents(students);
  return students
    .map(student => cloneStudent(student))
    .sort((studentA, studentB) => studentA.name.localeCompare(studentB.name));
}

function printStudent(student) {
  if (!student) {
    return "No student found.";
  }

  return `${student.name} (ID: ${student.id}) - Average: ${getAverageGrade(student)}`;
}

function main() {
  console.log("===== STUDENT RECORDS ANALYSIS REPORT =====");
  console.log(`Total students: ${students.length}`);

  const summary = exportSummary(students);
  console.log(`Overall average grade: ${summary.overallAverageGrade}`);
  console.log(`Top-performing student: ${printStudent(summary.topPerformingStudent)}`);

  console.log("\n--- Top 5 Students ---");
  getTopStudents(students, 5).forEach((student, index) => {
    console.log(`${index + 1}. ${printStudent(student)}`);
  });

  console.log("\n--- Enrolment Count ---");
  console.log(getEnrolledCount(students));

  console.log("\n--- Average Grade by Course ---");
  summary.breakdownByCourse.forEach(course => {
    console.log(`${course.course}: ${course.average}`);
  });

  console.log("\n--- Students Grouped by Course ---");
  Object.entries(groupByCourse(students)).forEach(([course, courseStudents]) => {
    console.log(`${course}: ${courseStudents.length} student(s)`);
  });

  console.log("\n--- Search Example ---");
  console.log("Search for 'sofia garcia':", findStudent(students, "sofia garcia"));
  console.log("Search for 'Unknown Student':", findStudent(students, "Unknown Student"));

  console.log("\n--- Optional Stretch Goal Examples ---");
  console.log("Year 2 students:", filterByYear(students, 2).length);
  console.log("First student alphabetically:", sortByName(students)[0].name);
}

main();