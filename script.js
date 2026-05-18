document.addEventListener('DOMContentLoaded', () => {

  let subjectCount = 0;

  const subjectsDiv = document.getElementById("subjects");
  const result = document.getElementById("result");

  document.getElementById("addSubjectBtn")
          .addEventListener("click", addSubject);

  document.getElementById("calculateBtn")
          .addEventListener("click", calculate);

  document.getElementById("resetBtn")
          .addEventListener("click", resetAll);

  // Grade Points Mapping

  const gradePoints = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "D": 4,
    "F": 0
  };

  // Add Subject Function

  function addSubject() {

    if (subjectCount >= 15) {
      alert("Maximum 15 subjects allowed!");
      return;
    }

    subjectCount++;

    const subjectDiv = document.createElement("div");

    subjectDiv.classList.add("subject");

    subjectDiv.innerHTML = `

      <label>Subject ${subjectCount}</label>

      <input 
        type="number" 
        class="credit" 
        placeholder="Credits"
        min="1"
        max="10"
      >

      <select class="grade">

        <option value="">Select Grade</option>

        <option value="O">O</option>
        <option value="A+">A+</option>
        <option value="A">A</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="F">F</option>

      </select>
    `;

    subjectsDiv.appendChild(subjectDiv);
  }

  // Calculate SGPA

  function calculate() {

    const grades = document.querySelectorAll(".grade");
    const credits = document.querySelectorAll(".credit");

    let totalWeightedPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < grades.length; i++) {

      const grade = grades[i].value;
      const credit = parseFloat(credits[i].value);

      if (!grade || isNaN(credit)) {
        alert("Please enter all grades and credits.");
        return;
      }

      const gradePoint = gradePoints[grade];

      totalWeightedPoints += gradePoint * credit;

      totalCredits += credit;
    }

    if (totalCredits === 0) {
      result.innerText = "Please add subjects properly.";
      return;
    }

    const sgpa = totalWeightedPoints / totalCredits;

    result.innerHTML = `
      🎯 Your SGPA is: 
      <strong>${sgpa.toFixed(2)}</strong>
    `;
  }

  // Reset Function

  function resetAll() {

    const confirmReset = confirm("Are you sure you want to reset?");

    if (confirmReset) {

      subjectsDiv.innerHTML = "";
      result.innerHTML = "";
      subjectCount = 0;

    }
  }

});