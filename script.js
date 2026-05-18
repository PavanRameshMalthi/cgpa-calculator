document.addEventListener('DOMContentLoaded', () => {

  let subjectCount = 0;

  const subjectsDiv = document.getElementById("subjects");
  const result = document.getElementById("result");

  // Buttons

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

  // Calculate SGPA and Percentage

  function calculate() {

    const grades = document.querySelectorAll(".grade");
    const credits = document.querySelectorAll(".credit");

    let totalWeightedPoints = 0;
    let totalCredits = 0;

    // Loop through all subjects

    for (let i = 0; i < grades.length; i++) {

      const grade = grades[i].value;
      const credit = parseFloat(credits[i].value);

      // Validation

      if (!grade || isNaN(credit)) {
        alert("Please enter all grades and credits.");
        return;
      }

      // Get Grade Point

      const gradePoint = gradePoints[grade];

      // SGPA Formula

      totalWeightedPoints += gradePoint * credit;

      totalCredits += credit;
    }

    // Check if subjects exist

    if (totalCredits === 0) {
      result.innerText = "Please add subjects properly.";
      return;
    }

    // Calculate SGPA

    const sgpa = totalWeightedPoints / totalCredits;

    // Calculate Percentage

    const percentage = sgpa * 10;

    // Display Result

    result.innerHTML = `
    
      🎯 Your SGPA is:
      <strong>${sgpa.toFixed(2)}</strong>

      <br><br>

      📊 Estimated Percentage:
      <strong>${percentage.toFixed(2)}%</strong>

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