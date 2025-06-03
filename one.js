
  const createBtn = document.getElementById('createResumeBtn');
  const formContainer = document.getElementById('resumeForm');

  createBtn.addEventListener('click', () => {
    formContainer.style.display = 'block';
    formContainer.scrollIntoView({ behavior: 'smooth' });
  });
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyCLEbK_p9daAwH6kiCJsD99DjSlHv3CWjE",
  authDomain: "build-your-resume-45078.firebaseapp.com",
  projectId: "build-your-resume-45078",
  storageBucket: "build-your-resume-45078.appspot.com",
  messagingSenderId: "999213099084",
  appId: "1:999213099084:web:4dbe463f5e404f29046ce9",
  measurementId: "G-ZS3VXTRTEG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

document.getElementById('resumeFormElement').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const summary = document.getElementById('summary').value;
  const education = document.getElementById('education').value;
  const skills = document.getElementById('skills').value;
  /*const profileFile = document.getElementById('profile').files[0];

  let profileURL = "";
  if (profileFile) {
    const storageRef = ref(storage, 'profiles/' + profileFile.name);
    await uploadBytes(storageRef, profileFile);
    profileURL = await getDownloadURL(storageRef);
  }
*/
  await addDoc(collection(db, "resumes"), {
    name, email, phone, summary, education, skills
  });

  
  document.getElementById('resumeForm').style.display = 'none';
  document.getElementById('generatedResume').style.display = 'block';

  
  document.getElementById('resumeName').textContent = name;
  document.getElementById('resumeEmail').textContent = email;
  document.getElementById('resumePhone').textContent = phone;
  document.getElementById('resumeSummary').textContent = summary;
  document.getElementById('resumeEducation').textContent = education;
  document.getElementById('resumeSkills').textContent = skills;
 /* document.getElementById('resumeProfilePic').src = profileURL || '';*/

  
  document.getElementById('downloadResumeBtn').onclick = function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Resume", 10, 10);
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 10, 25);
    doc.text(`Email: ${email}`, 10, 35);
    doc.text(`Phone: ${phone}`, 10, 45);
    doc.text("Summary:", 10, 55);
    doc.text(summary, 10, 65, { maxWidth: 180 });
    doc.text("Education:", 10, 85);
    doc.text(education, 10, 95, { maxWidth: 180 });
    doc.text("Skills:", 10, 115);
    doc.text(skills, 10, 125, { maxWidth: 180 });
    doc.text("Experience:", 10, 145);
    doc.text(document.getElementById('experience').textContent, 10, 155, { maxWidth: 180 });
    doc.text("Projects:", 10, 175);
    doc.text(document.getElementById('projects').textContent, 10, 185, { maxWidth: 180 });
    doc.text("Certifications:", 10, 205);
    doc.text(document.getElementById('certifications').textContent, 10, 215, { maxWidth: 180 });
    doc.text("Hobbies:", 10, 235);
    doc.text(document.getElementById('hobbies').textContent, 10, 245, { maxWidth: 180 });
    doc.save("resume.pdf");
  };
});

const fieldIds = ['name', 'email', 'phone', 'summary', 'education', 'skills','experience', 'projects', 'certifications', 'hobbies'];


document.getElementById('createResumeBtn').addEventListener('click', () => {
  document.getElementById('progressBarContainer').style.display = 'block';
  updateFormProgressBar();
});


function updateFormProgressBar() {
  let filled = 0;
  fieldIds.forEach(id => {
    const el = document.getElementById(id);
    if ( el.value!== ''){
       filled++; }
  });
  const percent = Math.round((filled / fieldIds.length) * 100);
  const bar = document.getElementById('progressBar');
  bar.style.width = percent + '%';
  bar.textContent = percent + '%';
  bar.setAttribute('aria-valuenow', percent);
}


fieldIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', updateFormProgressBar);
  }
});
document.querySelectorAll('.template-option').forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    const value = this.getAttribute('data-value');
    document.getElementById('templateSelect').value = value;
    document.getElementById('templateDropdownBtn').textContent = this.textContent;
  });
});
function showResumeTemplate(data, template) {
  
  document.getElementById('resumeTemplate1').style.display = 'none';
  document.getElementById('resumeTemplate2').style.display = 'none';

  if (template === 'template1') {
    document.getElementById('t1Name').textContent = data.name;
    document.getElementById('t1Email').textContent = data.email;
    document.getElementById('t1Phone').textContent = data.phone;
    document.getElementById('t1Summary').textContent = data.summary;
    document.getElementById('t1Education').textContent = data.education;
    document.getElementById('t1Skills').textContent = data.skills;
    document.getElementById('t1Experience').textContent = data.experience;
    document.getElementById('t1Projects').textContent = data.projects;
    document.getElementById('t1Certifications').textContent = data.certifications;
    document.getElementById('t1Hobbies').textContent = data.hobbies;
    document.getElementById('resumeTemplate1').style.display = 'block';
  } else {
    document.getElementById('t2Name').textContent = data.name;
    document.getElementById('t2Email').textContent = data.email;
    document.getElementById('t2Phone').textContent = data.phone;
    document.getElementById('t2Summary').textContent = data.summary;
    document.getElementById('t2Education').textContent = data.education;
    document.getElementById('t2Experience').textContent = data.experience;
    document.getElementById('t2Projects').textContent = data.projects;
    document.getElementById('t2Certifications').textContent = data.certifications;
    document.getElementById('t2Hobbies').textContent = data.hobbies;
    document.getElementById('resumeTemplate2').style.display = 'block';
  }
}

document.getElementById('resumeFormElement').addEventListener('submit', function(e) {
  e.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    summary: document.getElementById('summary').value,
    education: document.getElementById('education').value,
    skills: document.getElementById('skills').value,
    experience: document.getElementById('experience').value,
    projects: document.getElementById('projects').value,
    certifications: document.getElementById('certifications').value,
    hobbies: document.getElementById('hobbies').value
  };
  const template = document.getElementById('templateSelect').value;
  showResumeTemplate(data, template);
});
