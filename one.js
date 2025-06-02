
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

    doc.save("resume.pdf");
  };
});
// IDs of all required fields
const fieldIds = ['name', 'email', 'phone', 'summary', 'education', 'skills'];

// Show progress bar when "create resume" is clicked
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