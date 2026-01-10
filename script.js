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

    /* SUBJECT LIST */
    if (!subjectId) {
      title.innerText = selectedClass.name + " – Subjects";
      content.innerHTML = `<div class="grid"></div>`;
      const grid = document.querySelector(".grid");

      selectedClass.subjects.forEach(sub => {
        grid.innerHTML += `
          <a class="card"
             href="class.html?class=${classId}&subject=${sub.id}">
             📘 ${sub.name}
          </a>`;
      });
    }

    /* CHAPTER LIST */
    else if (!chapterId) {
      const subject = selectedClass.subjects.find(s => s.id === subjectId);
      title.innerText = selectedClass.name + " | " + subject.name;

      content.innerHTML = `<div class="grid"></div>`;
      const grid = document.querySelector(".grid");

      subject.chapters.forEach(ch => {
        grid.innerHTML += `
          <a class="card"
             href="class.html?class=${classId}&subject=${subjectId}&chapter=${ch.id}">
             📖 ${ch.name}
          </a>`;
      });
    }

    /* AUDIO + VIDEO */
    else {
      const subject = selectedClass.subjects.find(s => s.id === subjectId);
      const chapter = subject.chapters.find(c => c.id === chapterId);

      title.innerText = chapter.name;

      content.innerHTML = `
        <div class="player-box">
          <h3>🎧 Audio Lecture</h3>
          <audio controls src="${chapter.audio}"></audio>

          <h3 style="margin-top:25px;">🎥 Video Lecture</h3>
          <iframe src="${chapter.video}" height="320" allowfullscreen></iframe>
        </div>
      `;
    }
  });
