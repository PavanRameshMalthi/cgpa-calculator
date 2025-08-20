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
    <div class="subjects" id="subjects-${semesterCount}">
      <div class="subject">
        Subject 1:
        <select>
          ${Object.keys(gradePoints).map(grade => `<option>${grade}</option>`).join("")}
        </select>
      </div>
    </div>
    <button class="addSubjectBtn" data-sem="${semesterCount}">➕ Add Subject</button>
  `;

  document.getElementById("semesters").appendChild(semesterDiv);

  // Add subject button event
  semesterDiv.querySelector(".addSubjectBtn").addEventListener("click", (e) => {
    const semId = e.target.getAttribute("data-sem");
    const subjectsDiv = document.getElementById(`subjects-${semId}`);
    const currentSubjects = subjectsDiv.querySelectorAll(".subject").length;

    if (currentSubjects < 15) {
      const subjectDiv = document.createElement("div");
      subjectDiv.classList.add("subject");
      subjectDiv.innerHTML = `
        Subject ${currentSubjects + 1}:
        <select>
          ${Object.keys(gradePoints).map(grade => `<option>${grade}</option>`).join("")}
        </select>
      `;
      subjectsDiv.appendChild(subjectDiv);
    } else {
      alert("⚠️ Maximum 15 subjects allowed per semester.");
    }
  });
});

// Calculate CGPA + Percentage
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
  const percentage = (cgpa * 9.5).toFixed(2);

  document.getElementById("result").innerText = 
    `🎓 Your CGPA is: ${cgpa} | 📊 Percentage: ${percentage}%`;
});
