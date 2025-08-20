// Grade to points mapping
const gradePoints = {
  "O": 10,
  "A+": 9,
  "A": 8,
  "B+": 7,
  "B": 6,
  "C": 5,
  "F": 0
};

let semesterCount = 0;

// Add Semester
document.getElementById("addSemesterBtn").addEventListener("click", () => {
  semesterCount++;
  const semesterDiv = document.createElement("div");
  semesterDiv.classList.add("semester");
  semesterDiv.id = `semester-${semesterCount}`;
  semesterDiv.innerHTML = `
    <h3>Semester ${semesterCount}</h3>
    <div class="subjects">
      <div class="subject">
        Subject 1: 
        <select>
          <option>O</option>
          <option>A+</option>
          <option>A</option>
          <option>B+</option>
          <option>B</option>
          <option>C</option>
          <option>F</option>
        </select>
      </div>
      <div class="subject">
        Subject 2: 
        <select>
          <option>O</option>
          <option>A+</option>
          <option>A</option>
          <option>B+</option>
          <option>B</option>
          <option>C</option>
          <option>F</option>
        </select>
      </div>
      <div class="subject">
        Subject 3: 
        <select>
          <option>O</option>
          <option>A+</option>
          <option>A</option>
          <option>B+</option>
          <option>B</option>
          <option>C</option>
          <option>F</option>
        </select>
      </div>
    </div>
  `;
  document.getElementById("semesters").appendChild(semesterDiv);
});

// Calculate CGPA
document.getElementById("calculateCgpaBtn").addEventListener("click", () => {
  let totalPoints = 0;
  let totalSubjects = 0;

  const semesters = document.querySelectorAll(".semester");
  semesters.forEach(sem => {
    const selects = sem.querySelectorAll("select");
    selects.forEach(sel => {
      totalPoints += gradePoints[sel.value];
      totalSubjects++;
    });
  });

  if (totalSubjects === 0) {
    document.getElementById("result").innerText = "⚠️ Please add semesters and grades.";
    return;
  }

  const cgpa = (totalPoints / totalSubjects).toFixed(2);
  document.getElementById("result").innerText = `🎓 Your CGPA is: ${cgpa}`;
});
