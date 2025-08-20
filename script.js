let subjectCount = 0;
const subjectsDiv = document.getElementById("subjects");
const result = document.getElementById("result");

document.getElementById("addSubjectBtn").addEventListener("click", addSubject);
document.getElementById("calculateBtn").addEventListener("click", calculate);
document.getElementById("resetBtn").addEventListener("click", resetAll);

// Grade points mapping
const gradePoints = {
  "O": 10,
  "A+": 9,
  "A": 8,
  "B+": 7,
  "B": 6,
  "C": 5,
  "F": 0
};

function addSubject() {
  if (subjectCount >= 15) {
    alert("Maximum 15 subjects allowed!");
    return;
  }

  subjectCount++;
  const subjectDiv = document.createElement("div");
  subjectDiv.classList.add("subject");
  subjectDiv.innerHTML = `
    <label>Subject ${subjectCount}: </label>
    <select class="grade">
      <option value="">Select Grade</option>
      <option value="O">O</option>
      <option value="A+">A+</option>
      <option value="A">A</option>
      <option value="B+">B+</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="F">F</option>
    </select>
    <input type="number" class="credit" placeholder="Credits" min="1" max="10">
  `;
  subjectsDiv.appendChild(subjectDiv);
}

function calculate() {
  const grades = document.querySelectorAll(".grade");
  const credits = document.querySelectorAll(".credit");

  let totalPoints = 0;
  let totalCredits = 0;

  for (let i = 0; i < grades.length; i++) {
    const grade = grades[i].value;
    const credit = parseInt(credits[i].value);

    if (!grade || isNaN(credit)) {
      alert("Please fill all grades and credits!");
      return;
    }

    if (credit > 10) {
      alert("Credits cannot be greater than 10!");
      return;
    }

    totalPoints += gradePoints[grade] * credit;
    totalCredits += credit;
  }

  if (totalCredits === 0) {
    result.innerText = "No subjects added!";
    return;
  }

  const gpa = totalPoints / totalCredits;
  const percentage = gpa * 10; // Approx conversion

  result.innerText = `🎯 GPA: ${gpa.toFixed(2)} | 📊 Percentage: ${percentage.toFixed(2)}%`;
}

function resetAll() {
  subjectsDiv.innerHTML = "";
  result.innerText = "";
  subjectCount = 0;
}
