// ---- Config ----
const MAX_SEMESTERS = 12;
const MAX_SUBJECTS = 15;
const PERCENTAGE_FACTOR = 9.5; // Percentage = CGPA * 9.5

// Grade → Points
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
const semestersContainer = document.getElementById("semesters");
const addSemesterBtn = document.getElementById("addSemesterBtn");
const calculateBtn = document.getElementById("calculateCgpaBtn");
const resultEl = document.getElementById("result");
const errorsEl = document.getElementById("errors");

// Utility: create a grade <select> with NO default grade selected
function createGradeSelect() {
  const select = document.createElement("select");
  // Placeholder option (disabled + selected)
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "— Select grade —";
  placeholder.disabled = true;
  placeholder.selected = true;
  select.appendChild(placeholder);

  Object.keys(gradePoints).forEach(grade => {
    const opt = document.createElement("option");
    opt.value = grade;
    opt.textContent = grade;
    select.appendChild(opt);
  });
  return select;
}

// Add a subject row
function addSubjectRow(subjectsDiv) {
  const current = subjectsDiv.querySelectorAll(".subject").length;
  if (current >= MAX_SUBJECTS) {
    alert(`⚠️ Maximum ${MAX_SUBJECTS} subjects allowed per semester.`);
    return;
  }
  const subjectDiv = document.createElement("div");
  subjectDiv.className = "subject";

  const label = document.createElement("label");
  label.textContent = `Subject ${current + 1}:`;

  const select = createGradeSelect();

  subjectDiv.appendChild(label);
  subjectDiv.appendChild(select);
  subjectsDiv.appendChild(subjectDiv);
}

// Add a new semester block
function addSemester() {
  if (semesterCount >= MAX_SEMESTERS) {
    alert(`⚠️ You can add up to ${MAX_SEMESTERS} semesters only.`);
    addSemesterBtn.disabled = true;
    return;
  }

  semesterCount++;
  const semId = `semester-${semesterCount}`;

  const semesterDiv = document.createElement("div");
  semesterDiv.className = "semester";
  semesterDiv.id = semId;

  const title = document.createElement("h3");
  title.textContent = `Semester ${semesterCount}`;
  semesterDiv.appendChild(title);

  const subjectsDiv = document.createElement("div");
  subjectsDiv.className = "subjects";
  subjectsDiv.id = `subjects-${semesterCount}`;
  semesterDiv.appendChild(subjectsDiv);

  // Start with 1 subject
  addSubjectRow(subjectsDiv);

  // Controls
  const controls = document.createElement("div");
  controls.className = "controls";

  const addSubjectBtn = document.createElement("button");
  addSubjectBtn.textContent = "➕ Add Subject";
  addSubjectBtn.addEventListener("click", () => addSubjectRow(subjectsDiv));

  controls.appendChild(addSubjectBtn);
  semesterDiv.appendChild(controls);

  semestersContainer.appendChild(semesterDiv);

  // Disable add-semester when reaching max
  if (semesterCount >= MAX_SEMESTERS) {
    addSemesterBtn.disabled = true;
  }
}

// Validation & Calculation
function calculateCGPA() {
  clearErrors();
  resultEl.textContent = "";

  const semesters = [...document.querySelectorAll(".semester")];
  if (semesters.length === 0) {
    return showError("Please add at least one semester.");
  }

  let totalPoints = 0;
  let totalSubjects = 0;
  const missingSelections = [];

  semesters.forEach((sem, sIdx) => {
    const selects = [...sem.querySelectorAll("select")];
    if (selects.length === 0) {
      missingSelections.push(`Semester ${sIdx + 1} has no subjects.`);
      return;
    }

    selects.forEach((sel, subIdx) => {
      const val = sel.value;
      if (!val) {
        missingSelections.push(
          `Select grade for Semester ${sIdx + 1}, Subject ${subIdx + 1}.`
        );
      } else {
        totalPoints += gradePoints[val];
        totalSubjects++;
      }
    });
  });

  if (missingSelections.length > 0) {
    return showError(missingSelections.join("<br>"));
  }

  if (totalSubjects === 0) {
    return showError("Please add subjects and select grades.");
  }

  const cgpaRaw = totalPoints / totalSubjects;
  const cgpa = Number.isFinite(cgpaRaw) ? cgpaRaw : 0;
  const cgpaStr = cgpa.toFixed(2);

  // Percentage = CGPA * 9.5 (adjust PERCENTAGE_FACTOR if needed)
  const percentage = (cgpa * PERCENTAGE_FACTOR).toFixed(2);

  resultEl.textContent = `🎓 CGPA: ${cgpaStr}   |   📊 Percentage: ${percentage}%`;
}

// Error helpers
function showError(html) {
  errorsEl.innerHTML = html;
  errorsEl.classList.add("show");
}
function clearErrors() {
  errorsEl.innerHTML = "";
  errorsEl.classList.remove("show");
}

// Wire up
addSemesterBtn.addEventListener("click", addSemester);
calculateBtn.addEventListener("click", calculateCGPA);

// (Optional) Start with one semester for convenience
addSemester();
