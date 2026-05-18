// script.js

document.addEventListener('DOMContentLoaded', () => {

  let subjectCount = 0;

  const subjectsDiv =
    document.getElementById("subjects");

  const result =
    document.getElementById("result");

  const emptyState =
    document.getElementById("emptyState");

  const subjectCounter =
    document.getElementById("subjectCount");

  const creditCounter =
    document.getElementById("creditCount");

  // Buttons

  document
    .getElementById("addSubjectBtn")
    .addEventListener("click", addSubject);

  document
    .getElementById("calculateBtn")
    .addEventListener("click", calculate);

  document
    .getElementById("resetBtn")
    .addEventListener("click", resetAll);

  // Dark Mode

  const themeToggle =
    document.getElementById("themeToggle");

  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon =
      themeToggle.querySelector("i");

    if (document.body.classList.contains("dark")) {

      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");

    } else {

      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");

    }

  });

  // Grade Points

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

  // Add Subject

  function addSubject() {

    if (subjectCount >= 15) {

      alert("Maximum 15 subjects allowed!");

      return;
    }

    subjectCount++;

    updateStats();

    emptyState.style.display = "none";

    const subjectDiv =
      document.createElement("div");

    subjectDiv.classList.add("subject");

    subjectDiv.innerHTML = `

      <div class="subject-top">

        <label>
          Subject ${subjectCount}
        </label>

        <button class="remove-btn">
          <i class="fa-solid fa-xmark"></i>
        </button>

      </div>

      <input
        type="number"
        class="credit"
        placeholder="Enter Credits"
        min="1"
        max="10"
      >

      <select class="grade">

        <option value="">
          Select Grade
        </option>

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

    // Remove Subject

    subjectDiv
      .querySelector(".remove-btn")
      .addEventListener("click", () => {

        subjectDiv.remove();

        subjectCount--;

        updateStats();

        if (subjectCount === 0) {

          emptyState.style.display = "block";

        }

      });

    subjectsDiv.appendChild(subjectDiv);

  }

  // Calculate

  function calculate() {

    const grades =
      document.querySelectorAll(".grade");

    const credits =
      document.querySelectorAll(".credit");

    let totalWeightedPoints = 0;

    let totalCredits = 0;

    for (let i = 0; i < grades.length; i++) {

      const grade = grades[i].value;

      const credit =
        parseFloat(credits[i].value);

      if (!grade || isNaN(credit)) {

        alert(
          "Please fill all subjects properly."
        );

        return;
      }

      totalWeightedPoints +=
        gradePoints[grade] * credit;

      totalCredits += credit;

    }

    if (totalCredits === 0) {

      alert("Please add subjects.");

      return;
    }

    const sgpa =
      totalWeightedPoints / totalCredits;

    const percentage =
      sgpa * 10;

    result.style.display = "block";

    result.innerHTML = `

      <h2>
        🎉 Result
      </h2>

      <div class="result-info">

        <div class="result-box">

          <h3>SGPA</h3>

          <p>
            ${sgpa.toFixed(2)}
          </p>

        </div>

        <div class="result-box">

          <h3>Percentage</h3>

          <p>
            ${percentage.toFixed(2)}%
          </p>

        </div>

      </div>

    `;

    creditCounter.innerText =
      totalCredits;

  }

  // Reset

  function resetAll() {

    const confirmReset =
      confirm("Reset everything?");

    if (!confirmReset) return;

    subjectsDiv.innerHTML = "";

    result.style.display = "none";

    subjectCount = 0;

    updateStats();

    emptyState.style.display = "block";

  }

  // Update Stats

  function updateStats() {

    subjectCounter.innerText =
      subjectCount;

  }

});