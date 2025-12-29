fetch("data.json")
  .then(res => res.json())
  .then(data => {

    const params = new URLSearchParams(window.location.search);
    const classId = params.get("class");
    const subjectId = params.get("subject");
    const chapterId = params.get("chapter");

    const title = document.getElementById("pageTitle");
    const content = document.getElementById("content");

    const selectedClass = data.classes.find(c => c.id === classId);
    if (!selectedClass) {
      title.innerText = "Class nahi mili";
      return;
    }

    // 1️⃣ SUBJECT LIST
    if (!subjectId) {
      title.innerText = selectedClass.name + " – Subjects";

      selectedClass.subjects.forEach(sub => {
        content.innerHTML += `
          <a class="class-box"
             href="class.html?class=${classId}&subject=${sub.id}">
             ${sub.name}
          </a><br><br>`;
      });
    }

    // 2️⃣ CHAPTER LIST
    else if (!chapterId) {
      const subject = selectedClass.subjects.find(s => s.id === subjectId);
      title.innerText = selectedClass.name + " | " + subject.name;

      subject.chapters.forEach(ch => {
        content.innerHTML += `
          <a class="class-box"
             href="class.html?class=${classId}&subject=${subjectId}&chapter=${ch.id}">
             ${ch.name}
          </a><br><br>`;
      });
    }

    // 3️⃣ AUDIO + VIDEO PAGE
    else {
      const subject = selectedClass.subjects.find(s => s.id === subjectId);
      const chapter = subject.chapters.find(c => c.id === chapterId);

      title.innerText = chapter.name;

      content.innerHTML = `
        <h3>🎧 Sunne ke liye</h3>
        <audio controls src="${chapter.audio}"></audio>

        <hr>

        <h3>🎥 Dekhne ke liye</h3>
        <iframe src="${chapter.video}"
                width="100%" height="320"
                allowfullscreen></iframe>
      `;
    }
  });
