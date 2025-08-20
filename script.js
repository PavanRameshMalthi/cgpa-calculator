let subjectCount = 0;
const maxSubjects = 15;

function addSubject() {
  if (subjectCount >= maxSubjects) {
    alert("You can add up to 15 subjects only.");
    return;
  }

  subjectCount++;
  const container = document.getElementById("subjects-container");

  const div = document.createElement("div");
  div.classList.add("subject");
  div.innerHTML = `
    <label>Subject ${subjectCount}: </label>
    <select class="grade">
      <option value="">--Select Grade--</option>
      <option value="10">O (Outstanding)</option>
      <option value="9">A+</option>
      <option value="8">A</option>
      <option value="7">B+</option>
      <option value="6">B</option>
      <option value="5">C</option>
      <option value="0">F</option>
    </select>
    <input type="number" class="credit" placeholder="Credit (1-10)" min="1" max="10">
  `;
  container.appendChild(div);
}

function calculateCGPA() {
  const grades = document.querySelectorAll(".grade");
  const credits = document.querySelectorAll(".credit");

  let totalCredits = 0;
  let totalPoints = 0;
  let valid = true;

  for (let i = 0; i < grades.length; i++) {
    const grade = parseFloat(grades[i].value);
    const credit = parseFloat(credits[i].value);

    if (isNaN(grade) || isNaN(credit)) {
      valid = false;
      break;
    }

    if (credit > 10) {
      document.getElementById("warning").innerText =
        "⚠️ Credit cannot be greater than 10!";
      return;
    }

    totalCredits += credit;
    totalPoints += grade * credit;
  }

  if (!valid || totalCredits === 0) {
    document.getElementById("result").innerText = "⚠️ Please fill all fields!";
    document.getElementById("percentage").innerText = "";
    document.getElementById("warning").innerText = "";
    return;
  }

  const cgpa = totalPoints / totalCredits;
  const percentage = (cgpa - 0.75) * 10;

  document.getElementById("result").innerText = `CGPA: ${cgpa.toFixed(2)}`;
  document.getElementById("percentage").innerText = `Percentage: ${percentage.toFixed(2)}%`;
  document.getElementById("warning").innerText = "";
}

function resetCalculator() {
  document.getElementById("subjects-container").innerHTML = "";
  document.getElementById("result").innerText = "";
  document.getElementById("percentage").innerText = "";
  document.getElementById("warning").innerText = "";
  subjectCount = 0;
}
