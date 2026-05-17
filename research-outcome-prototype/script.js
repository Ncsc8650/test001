const titles = {
  overview: "ภาพรวมผลลัพธ์สูงสุดของงานวิจัย",
  assistant: "ถามผู้ช่วย AI จากฐานความรู้กลาง",
  document: "ตรวจความครบถ้วนของเอกสารฎีกา",
  learning: "เส้นทางเรียนรู้และสมรรถนะบุคลากร",
  governance: "กรอบกำกับดูแลการใช้ AI"
};

const answers = {
  "ต้องแนบเอกสารอะไรในฎีกาเบิกเงิน": "ให้เริ่มจากแยกประเภทรายการเบิกและงบประมาณ จากนั้นตรวจเอกสารอนุมัติ หลักฐานการเกิดหนี้ ผู้รับเงิน จำนวนเงิน รายละเอียดภาษีหรือค่าปรับถ้ามี และเอกสารเฉพาะตามระเบียบของรายการนั้น ก่อนส่งตรวจโดยผู้รับผิดชอบ",
  "จ่ายตรงต่างจากทั่วไปอย่างไร": "รายการจ่ายตรงเป็นการโอนเงินให้ผู้รับเงินตามฎีกาโดยไม่ผ่านสำนักงานการเงิน ส่วนรายการทั่วไปเป็นการโอนผ่านสำนักงานการเงินเพื่อดำเนินการต่อ ทั้งสองแบบต้องบันทึกบัญชีให้สัมพันธ์กับรายการเบิกตั้งแต่ต้น",
  "ถ้าบันทึกบัญชีผิดควรตรวจย้อนอย่างไร": "ควรตรวจย้อนจากฎีกา ประเภทการเบิก ผู้รับเงิน เอกสารประกอบ เลขที่อ้างอิงในระบบ และรายการบัญชีที่ระบบบันทึกอัตโนมัติ จากนั้นจึงระบุจุดผิดพลาดและส่งผู้รับผิดชอบตรวจสอบก่อนแก้ไขรายการ",
  "ผู้ปฏิบัติงานใหม่ควรเรียนรู้อะไรก่อน": "ควรเริ่มจากภาพรวมหน่วยงาน คำย่อสำคัญ ประเภทฎีกา เอกสารประกอบ ขั้นตอนใน New GFMIS Thai ระบบบัญชีเงินราชการ และกรณีผิดพลาดที่พบบ่อย โดยเรียนจากกรณีง่ายไปสู่กรณีซับซ้อนตาม Bloom’s Taxonomy"
};

function setView(viewName) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewName);
  });
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });
  document.getElementById("page-title").textContent = titles[viewName];
}

document.querySelectorAll(".nav-button").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelectorAll("[data-jump]").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.jump));
});

function addAnswer(question) {
  const conversation = document.getElementById("conversation");
  const userBubble = document.createElement("div");
  userBubble.className = "bubble user";
  userBubble.textContent = question;

  const aiBubble = document.createElement("div");
  aiBubble.className = "bubble ai";
  const baseAnswer = answers[question] || "ระบบจะค้นคืนจากฐานความรู้กลาง แสดงขั้นตอนที่เกี่ยวข้อง ระบุข้อควรตรวจสอบ และแนะนำให้ส่งผู้เชี่ยวชาญตรวจทานเมื่อเป็นกรณีที่มีผลต่อการอนุมัติหรือการตีความระเบียบ";
  aiBubble.innerHTML = `${baseAnswer}<span>ระดับความมั่นใจ: ปานกลางถึงสูง | ต้องอ้างอิงระเบียบและให้ผู้มีอำนาจตรวจสอบก่อนใช้ปฏิบัติจริง</span>`;

  conversation.append(userBubble, aiBubble);
  conversation.scrollTop = conversation.scrollHeight;
}

document.getElementById("askButton").addEventListener("click", () => {
  const input = document.getElementById("questionInput");
  const value = input.value.trim();
  if (value) addAnswer(value);
});

document.querySelectorAll(".question-chip").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById("questionInput").value = button.textContent;
    addAnswer(button.textContent);
  });
});

function updateScore() {
  const checks = Array.from(document.querySelectorAll(".checklist input"));
  const checked = checks.filter((item) => item.checked).length;
  const score = Math.round((checked / checks.length) * 100);
  document.getElementById("scoreValue").textContent = score;
  document.getElementById("scoreBar").style.width = `${score}%`;
  document.getElementById("scoreText").textContent =
    score === 100
      ? "รายการตรวจครบถ้วนในระดับเบื้องต้นแล้ว ควรส่งผู้รับผิดชอบหรือผู้เชี่ยวชาญตรวจทานก่อนดำเนินการจริง"
      : score >= 60
        ? "เอกสารมีความพร้อมระดับหนึ่ง แต่ยังควรตรวจรายการที่เหลือและความเชื่อมโยงกับบัญชี"
        : "ยังควรตรวจเอกสารสำคัญเพิ่มเติมก่อนส่งฎีกา เพื่อลดโอกาสถูกตีกลับ";
}

document.querySelectorAll(".checklist input").forEach((item) => {
  item.addEventListener("change", updateScore);
});

updateScore();
