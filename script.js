fetch("data.json")
  .then(res => res.json())
  .then(data => {

    const params = new URLSearchParams(window.location.search);
    const classId = params.get("class");
    const subjectId = params.get("subject");

    const pageTitle = document.getElementById("pageTitle");
    const content = document.getElementById("content");

    const selectedClass = data.classes.find(c => c.id === classId);

    if (!selectedClass) {
      pageTitle.innerText = "Class nahi mili";
      return;
    }

    // SUBJECT LIST
    if (!subjectId) {
      pageTitle.innerText = selectedClass.name + " – Subjects";

      selectedClass.subjects.forEach(sub => {
        const a = document.createElement("a");
        a.href = `class.html?class=${classId}&subject=${sub.id}`;
        a.className = "class-box";
        a.innerText = sub.name;
        content.appendChild(a);
        content.appendChild(document.createElement("br"));
        content.appendChild(document.createElement("br"));
      });
    }

    // CHAPTER + AUDIO + VIDEO
    else {
      const subject = selectedClass.subjects.find(s => s.id === subjectId);
      pageTitle.innerText = selectedClass.name + " | " + subject.name;

      subject.chapters.forEach(ch => {
        const h3 = document.createElement("h3");
        h3.innerText = ch.name;

        const audio = document.createElement("audio");
        audio.controls = true;
        audio.src = ch.audio;

        const iframe = document.createElement("iframe");
        iframe.src = ch.video;
        iframe.width = "100%";
        iframe.height = "300";

        content.appendChild(h3);
        content.appendChild(audio);
        content.appendChild(document.createElement("br"));
        content.appendChild(iframe);
        content.appendChild(document.createElement("hr"));
      });
    }
  });
