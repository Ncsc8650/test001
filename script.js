const titles = {
  dashboard: "ภาพรวมระบบผู้ช่วยองค์ความรู้",
  ask: "ถาม AI จากฐานความรู้ที่ตรวจสอบได้",
  checklist: "ตรวจเอกสารประกอบฎีกาเบื้องต้น",
  learning: "แผนเรียนรู้งานสำหรับกำลังพลใหม่",
  knowledge: "คลังความรู้กลาง"
};

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.view;

    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    document.querySelectorAll(".view").forEach((view) => {
      view.classList.toggle("active", view.id === target);
    });

    document.getElementById("view-title").textContent = titles[target];
  });
});
