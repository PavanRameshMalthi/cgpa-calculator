document.addEventListener('DOMContentLoaded', () => {
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
      "D": 4, 
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
        <label>Subject ${subjectCount}:</label>
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
    
    function calculate() {
      const grades = document.querySelectorAll(".grade");
      let totalPoints = 0;
      let subjectsAdded = 0;
    
      for (let i = 0; i < grades.length; i++) {
        const grade = grades[i].value;
    
        if (!grade) {
          alert("Please select a grade for all subjects.");
          return;
        }
    
        totalPoints += gradePoints[grade];
        subjectsAdded++;
      }
    
      if (subjectsAdded === 0) {
        result.innerText = "Please add at least one subject.";
        return;
      }
    
      const gpa = totalPoints / subjectsAdded;
      const percentage = gpa * 10; 
    
      result.innerHTML = `🎯 Your GPA is: <strong>${gpa.toFixed(2)}</strong><br>
                          📊 Estimated Percentage: <strong>${percentage.toFixed(2)}%</strong>`;
    }
    
    function resetAll() {
      subjectsDiv.innerHTML = "";
      result.innerText = "";
      subjectCount = 0;
    }
});