// ============================================================
// NAVIGATION
// ============================================================
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelectorAll("[data-nav] a, .header-cta");
const langToggle = document.querySelector("[data-lang-toggle]");
const waitlistForm = document.querySelector("[data-waitlist-form]");
const formNote = document.querySelector("[data-form-note]");

const i18n = {
  "meta.title": {
    en: "UpSqill | AI-Powered Roadmap to University Success",
    th: "UpSqill | Roadmap เตรียมสอบเข้ามหาวิทยาลัยด้วย AI",
  },
  "meta.description": {
    en: "UpSqill helps Dek70 students discover the right faculty, diagnose skill gaps, and improve exam performance with a personalized AI-powered learning roadmap.",
    th: "UpSqill ช่วยนักเรียน Dek70 ค้นหาเป้าหมาย วิเคราะห์จุดอ่อนราย skill และวาง roadmap การเรียนเฉพาะตัวเพื่อเตรียมสอบเข้ามหาวิทยาลัยอย่างมีทิศทาง",
  },
  "nav.problems": { en: "Problems", th: "ปัญหา" },
  "nav.how": { en: "How it works", th: "วิธีใช้งาน" },
  "nav.insights": { en: "Insights", th: "Insight" },
  "nav.features": { en: "Features", th: "ฟีเจอร์" },
  "nav.parents": { en: "Parents", th: "ผู้ปกครอง" },
  "nav.faq": { en: "FAQ", th: "คำถาม" },
  "cta.startDiagnostic": { en: "Start Free Diagnostic", th: "เริ่มวิเคราะห์จุดอ่อนฟรี" },
  "cta.seeHow": { en: "See How It Works", th: "ดูวิธีใช้งาน" },
  "cta.exploreReport": { en: "Explore Demo Report", th: "ดูตัวอย่าง Demo Report" },
  "cta.learnMore": { en: "Learn more", th: "ดูเพิ่มเติม" },
  "cta.parentInsights": { en: "See Parent Insights", th: "ดูตัวอย่าง Parent Insight" },
  "cta.joinWaitlist": { en: "Join the Waitlist", th: "สมัคร Waitlist" },

  "hero.panel.readiness": { en: "Readiness score", th: "คะแนนความพร้อม" },
  "hero.panel.readySuffix": { en: "% ready", th: "% พร้อม" },
  "hero.panel.targetGap": { en: "13 points from target", th: "อีก 13 คะแนนถึงเป้าหมาย" },
  "hero.panel.priority": { en: "Priority skills", th: "Skill ที่ควรโฟกัส" },
  "hero.skill.algebra": { en: "Algebra", th: "พีชคณิต" },
  "hero.skill.highImpact": { en: "High impact", th: "กระทบคะแนนสูง" },
  "hero.skill.reading": { en: "Reading inference", th: "Reading inference" },
  "hero.skill.nextFocus": { en: "Next focus", th: "โฟกัสถัดไป" },
  "hero.skill.grammar": { en: "Grammar logic", th: "Grammar logic" },
  "hero.skill.review": { en: "Review", th: "ทบทวน" },
  "hero.panel.roadmap": { en: "4-week roadmap", th: "Roadmap 4 สัปดาห์" },
  "hero.roadmap.diagnose": { en: "Diagnose", th: "วิเคราะห์" },
  "hero.roadmap.focus": { en: "Focus skills", th: "จัดลำดับ skill" },
  "hero.roadmap.practice": { en: "Adaptive practice", th: "ฝึกแบบ Adaptive" },
  "hero.roadmap.track": { en: "Track growth", th: "ติดตามผล" },
  "hero.chip.goal": { en: "Dream faculty: Engineering", th: "คณะเป้าหมาย: วิศวกรรม" },
  "hero.chip.parent": { en: "Parent insight ready", th: "Parent insight พร้อม" },
  "hero.eyebrow": { en: "Built for Dek70 university preparation", th: "ออกแบบสำหรับการเตรียมสอบเข้ามหาวิทยาลัยของ Dek70" },
  "hero.title": {
    en: "Your AI-Powered Roadmap to <span class=\"text-gradient\">University Success</span>",
    th: "รู้จุดอ่อน วาง <span class=\"text-gradient\">Roadmap</span> และเตรียมสอบอย่างมี Direction",
  },
  "hero.subhead": {
    en: "UpSqill helps Thai high school students discover the right faculty, diagnose their weaknesses, and improve exam performance through personalized learning guidance.",
    th: "UpSqill คือ AI-powered learning platform ที่ช่วยนักเรียนวิเคราะห์จุดอ่อนราย skill วางแผนการอ่านเฉพาะตัว และเตรียมสอบเข้ามหาวิทยาลัยอย่างมีทิศทางมากขึ้น",
  },
  "hero.support": {
    en: "No more studying blindly. No more confusion about what to improve next.",
    th: "ไม่ต้องอ่านทุกอย่าง ไม่ต้องเดาว่าควรเริ่มตรงไหน เห็นชัดขึ้นว่าต้องพัฒนาอะไรต่อเพื่อเข้าใกล้คณะที่ฝันไว้",
  },
  "hero.trust.ai": { en: "AI-powered guidance", th: "Personalized AI Learning" },
  "hero.trust.research": { en: "Research-driven learning", th: "วิเคราะห์เป็นราย skill" },
  "hero.trust.thai": { en: "Designed for Thai admission", th: "เหมาะกับระบบสอบเข้าไทย" },

  "stats.focus": { en: "students see clearer focus", th: "เห็นจุดที่ควรโฟกัสชัดขึ้น" },
  "stats.practice": { en: "more efficient practice", th: "ฝึกได้ตรงจุดกว่าเดิม" },
  "stats.score": { en: "average score points gained", th: "คะแนนเป้าหมายที่ขยับได้" },
  "stats.personalized": { en: "personalized to each student", th: "ปรับตามผู้เรียนแต่ละคน" },

  "problem.eyebrow": { en: "The real problem", th: "ปัญหาจริงของการเตรียมสอบ" },
  "problem.title": {
    en: "Preparing for University Shouldn't Feel This <em>Confusing</em>",
    th: "เด็กส่วนใหญ่ไม่ได้ขาดความพยายาม แต่ขาด <em>Direction</em>",
  },
  "problem.copy": {
    en: "Many students spend hours studying, joining classes, and practicing questions without knowing which skills actually hold them back.",
    th: "หลายคนพยายามอ่านหนังสือ ทำโจทย์ และเรียนพิเศษเพิ่ม แต่ยังไม่รู้ว่าคะแนนไม่ขึ้นเพราะอะไร UpSqill ช่วยเปลี่ยนความสับสนให้กลายเป็นแผนที่ชัดเจนมากขึ้น",
  },
  "problem.card1.title": { en: "\"I don't know which faculty fits me.\"", th: "ไม่รู้ว่าคณะไหนเหมาะกับตัวเองจริง ๆ" },
  "problem.card1.copy": {
    en: "Connect interests, strengths, scores, and future goals into clearer university direction.",
    th: "เชื่อมโยงเป้าหมาย ความถนัด ความสนใจ คะแนน และ skill ที่ต้องพัฒนาอย่างเป็นระบบ",
  },
  "problem.card2.title": { en: "\"I study hard but my scores don't improve.\"", th: "อ่านเยอะ แต่คะแนนไม่ขึ้น" },
  "problem.card2.copy": {
    en: "See the hidden weak skills that make extra practice feel inefficient.",
    th: "มองเห็นจุดอ่อนราย skill ที่เป็นตัวฉุดคะแนนจริง ๆ แทนการฝึกเพิ่มแบบเดาสุ่ม",
  },
  "problem.card3.title": { en: "\"I don't know what to focus on next.\"", th: "ไม่รู้ว่าควรเริ่มตรงไหนก่อน" },
  "problem.card3.copy": {
    en: "Replace random review with a priority list based on goal, skill, and score gap.",
    th: "เปลี่ยนการทบทวนแบบสะเปะสะปะเป็นลำดับความสำคัญตามเป้าหมาย skill และ score gap",
  },
  "problem.card4.title": { en: "\"University preparation feels overwhelming.\"", th: "ยิ่งใกล้สอบ ยิ่งเครียด" },
  "problem.card4.copy": {
    en: "Give students a calmer, step-by-step path through pressure and uncertainty.",
    th: "ลดความกดดันด้วยแผนทีละขั้นที่บอกได้ว่าควรทำอะไรต่อ",
  },

  "solution.eyebrow": { en: "The UpSqill approach", th: "แนวทางของ UpSqill" },
  "solution.title": { en: "A Smarter Way to Prepare for University", th: "เปลี่ยนความสับสน ให้กลายเป็นแผนที่ชัดเจน" },
  "solution.copy": {
    en: "UpSqill connects goals, current ability, skill gaps, and learning plans into one personalized roadmap. Students understand what to improve and how to move closer to their dream faculty.",
    th: "UpSqill ไม่ได้เป็นแค่เว็บทำข้อสอบ แต่เป็น AI system ที่ช่วยวิเคราะห์เป้าหมาย มองเห็นจุดอ่อน และแนะนำ Roadmap ที่เหมาะกับแต่ละคน เพื่อให้การเตรียมสอบมีทิศทางมากขึ้น",
  },
  "solution.benefit1": { en: "Discover suitable academic goals", th: "เข้าใจเป้าหมายของตัวเอง" },
  "solution.benefit2": { en: "Identify score gaps and weak skills", th: "เห็น skill ที่ต้องพัฒนาและ score gap" },
  "solution.benefit3": { en: "Receive personalized learning recommendations", th: "ได้แผนการอ่านเฉพาะตัว" },
  "solution.benefit4": { en: "Track progress over time", th: "ติดตาม progress ได้ต่อเนื่อง" },
  "solution.report.label": { en: "Demo report", th: "ตัวอย่างรายงาน" },
  "solution.report.title": { en: "Dek70 Skill Diagnosis", th: "วิเคราะห์ Skill สำหรับ Dek70" },
  "solution.report.status": { en: "Live preview", th: "ตัวอย่างสด" },
  "solution.report.readiness": { en: "Readiness", th: "ความพร้อม" },
  "solution.report.goalFit": { en: "Goal fit", th: "ความเหมาะกับเป้าหมาย" },
  "solution.report.math": { en: "Math foundation", th: "พื้นฐานคณิต" },
  "solution.report.english": { en: "English inference", th: "การตีความภาษาอังกฤษ" },
  "solution.report.focus": { en: "Weekly focus", th: "โฟกัสรายสัปดาห์" },
  "solution.report.ringNote": { en: "Goal gap 13 pts", th: "ขาดอีก 13 คะแนน" },
  "solution.report.nextLabel": { en: "Next best focus", th: "โฟกัสที่ควรทำต่อ" },
  "solution.report.nextValue": { en: "English inference and math foundation", th: "Reading inference และพื้นฐานคณิต" },
  "solution.report.nextCopy": {
    en: "Strong overall direction. The fastest score lift comes from focused practice on the highest-impact weak skills this week.",
    th: "ภาพรวมอยู่ในทิศทางที่ดี คะแนนจะขยับเร็วขึ้นเมื่อโฟกัส skill ที่อ่อนและมีผลต่อคะแนนสูงในสัปดาห์นี้",
  },
  "solution.report.gap": { en: "points to target", th: "คะแนนถึงเป้าหมาย" },
  "solution.report.skills": { en: "priority skills", th: "skill สำคัญ" },

  "insights.eyebrow": { en: "Learning insight dashboard", th: "Dashboard insight การเรียน" },
  "insights.title": {
    en: "See the <em>next best move</em>, not just another score",
    th: "เห็นว่า <em>ควรทำอะไรต่อ</em> ไม่ใช่แค่เห็นคะแนนอีกตัว",
  },
  "insights.copy": {
    en: "UpSqill turns diagnostic results into practical decisions: which skill has the largest score impact, how much effort is needed, and what should happen this week.",
    th: "UpSqill เปลี่ยนผล diagnostic ให้กลายเป็นการตัดสินใจที่ใช้ได้จริง: skill ไหนกระทบคะแนนมากที่สุด ต้องใช้ effort แค่ไหน และสัปดาห์นี้ควรทำอะไร",
  },
  "insights.orbit.core": { en: "Roadmap", th: "Roadmap" },
  "insights.orbit.goal": { en: "Goal", th: "เป้าหมาย" },
  "insights.orbit.skill": { en: "Skill gap", th: "จุดอ่อน" },
  "insights.orbit.plan": { en: "Study plan", th: "แผนอ่าน" },
  "insights.orbit.growth": { en: "Growth", th: "พัฒนาการ" },
  "insights.orbit.readiness": { en: "Readiness", th: "ความพร้อม" },
  "insights.orbit.momentum": { en: "+18% learning momentum", th: "แรงส่งการเรียน +18%" },
  "insights.orbit.priority": { en: "Priority skill", th: "Skill สำคัญ" },
  "insights.orbit.priorityValue": { en: "Reading inference", th: "Reading inference" },
  "insights.orbit.priorityNote": { en: "High score impact", th: "กระทบคะแนนสูง" },
  "insights.orbit.week": { en: "This week", th: "สัปดาห์นี้" },
  "insights.orbit.weekValue": { en: "4 focused practice days", th: "ฝึกโฟกัส 4 วัน" },
  "insights.orbit.stackTitle": { en: "Skill signals", th: "สัญญาณ Skill" },
  "insights.orbit.recommendLabel": { en: "AI recommends", th: "AI แนะนำ" },
  "insights.orbit.recommendValue": {
    en: "Start where weakness meets exam impact",
    th: "เริ่มจากจุดอ่อนที่กระทบคะแนนสูง",
  },
  "insights.score.label": { en: "Score gap model", th: "โมเดล Score gap" },
  "insights.score.title": { en: "126 points to target", th: "อีก 126 คะแนนถึงเป้าหมาย" },
  "insights.score.current": { en: "Current readiness", th: "ความพร้อมปัจจุบัน" },
  "insights.score.remaining": { en: "Remaining gap", th: "ช่องว่างที่เหลือ" },
  "insights.score.now": { en: "now", th: "ตอนนี้" },
  "insights.score.target": { en: "target", th: "เป้าหมาย" },
  "insights.score.progress": { en: "target coverage", th: "ครอบคลุมเป้าหมาย" },
  "insights.score.fastRoute": { en: "fast-route points", th: "คะแนนทางลัด" },
  "insights.score.keySkills": { en: "key blockers", th: "skill ที่ขวางคะแนน" },
  "insights.score.insight": {
    en: "The gap is not spread evenly. English inference and chemistry concepts create the fastest route to the next 45 points.",
    th: "ช่องว่างคะแนนไม่ได้กระจายเท่ากัน Reading inference และแนวคิดเคมีเป็นเส้นทางที่เร็วที่สุดสู่คะแนนถัดไปประมาณ 45 คะแนน",
  },
  "insights.payoff.label": { en: "Skill payoff map", th: "แผนที่ Skill payoff" },
  "insights.payoff.title": { en: "Focus where weakness meets impact", th: "โฟกัสจุดที่อ่อนและกระทบคะแนนสูง" },
  "insights.payoff.kpi": { en: "4 skills", th: "4 skills" },
  "insights.payoff.y": { en: "Weakness", th: "ความอ่อน" },
  "insights.payoff.x": { en: "Exam impact", th: "ผลต่อคะแนน" },
  "insights.payoff.reading": { en: "Reading inference", th: "Reading inference" },
  "insights.payoff.chemistry": { en: "Stoichiometry", th: "Stoichiometry" },
  "insights.payoff.algebra": { en: "Algebra accuracy", th: "ความแม่นยำพีชคณิต" },
  "insights.payoff.vocab": { en: "Vocabulary review", th: "ทบทวนคำศัพท์" },
  "insights.payoff.priorityZone": { en: "Priority zone", th: "โซนเร่งคะแนน" },
  "insights.payoff.maintainZone": { en: "Maintain", th: "คงระดับ" },
  "insights.payoff.readingMeta": { en: "+24 pt potential", th: "มีโอกาส +24 คะแนน" },
  "insights.payoff.chemistryMeta": { en: "concept gap", th: "concept ยังหลวม" },
  "insights.payoff.algebraMeta": { en: "stabilize", th: "เพิ่มความนิ่ง" },
  "insights.payoff.vocabMeta": { en: "keep warm", th: "ทบทวนต่อเนื่อง" },
  "insights.payoff.action1": { en: "Start here", th: "เริ่มตรงนี้" },
  "insights.payoff.action2": { en: "Then reinforce", th: "จากนั้นเสริม" },
  "insights.payoff.insight": {
    en: "Instead of reviewing every topic equally, the roadmap starts with the upper-right skills that block the most points.",
    th: "แทนที่จะทบทวนทุกหัวข้อเท่ากัน Roadmap จะเริ่มจาก skill มุมขวาบนที่ขวางคะแนนมากที่สุดก่อน",
  },
  "insights.momentum.label": { en: "Learning momentum", th: "แรงส่งการเรียน" },
  "insights.momentum.title": { en: "Practice consistency predicts score movement", th: "ความสม่ำเสมอช่วยทำนายการขยับคะแนน" },
  "insights.momentum.insight": {
    en: "Four focused practice days per week are enough to move mastery when the questions match the right skill.",
    th: "ถ้าโจทย์ตรงกับ skill ที่ควรฝึก การฝึกแบบโฟกัส 4 วันต่อสัปดาห์ก็เริ่มขยับ mastery ได้",
  },
  "insights.momentum.practiceDays": { en: "practice days", th: "วันฝึก" },
  "insights.momentum.mastery": { en: "current mastery", th: "mastery ปัจจุบัน" },
  "insights.momentum.next": { en: "next-week lift", th: "โอกาสขยับสัปดาห์หน้า" },
  "insights.radar.label": { en: "Readiness balance", th: "สมดุลความพร้อม" },
  "insights.radar.title": { en: "Strong in accuracy, weaker in transfer", th: "แม่นยำดี แต่ยังอ่อนเรื่องการประยุกต์" },
  "insights.radar.accuracy": { en: "Accuracy", th: "ความแม่นยำ" },
  "insights.radar.speed": { en: "Speed", th: "ความเร็ว" },
  "insights.radar.transfer": { en: "Transfer", th: "การประยุกต์" },
  "insights.radar.memory": { en: "Memory", th: "ความจำ" },
  "insights.radar.confidence": { en: "Confidence", th: "ความมั่นใจ" },
  "insights.radar.insight": {
    en: "The next plan should not add harder questions yet. It should train transfer: applying known concepts in unfamiliar exam formats.",
    th: "แผนถัดไปยังไม่ควรเพิ่มโจทย์ยากทันที แต่ควรฝึกการประยุกต์แนวคิดเดิมในรูปแบบข้อสอบที่ไม่คุ้นเคย",
  },
  "insights.radar.alertLabel": { en: "Main gap", th: "ช่องว่างหลัก" },
  "insights.radar.alertValue": {
    en: "Transfer skill needs targeted practice before harder sets.",
    th: "ควรฝึกการประยุกต์แบบตรงจุดก่อนเพิ่มชุดโจทย์ยาก",
  },

  "how.eyebrow": { en: "How it works", th: "วิธีใช้งาน" },
  "how.title": { en: "From Goal to Roadmap in <em>Five Steps</em>", th: "จากเป้าหมาย สู่ Roadmap ใน <em>5 ขั้นตอน</em>" },
  "how.copy": {
    en: "UpSqill turns admissions preparation into a guided loop: diagnose, prioritize, practice, and track.",
    th: "UpSqill เปลี่ยนการเตรียมสอบให้เป็นวงจรที่ชัดเจน: วิเคราะห์ จัดลำดับ ฝึก และติดตามผล",
  },
  "how.step1.title": { en: "Discover Your Goal", th: "เลือกเป้าหมายของคุณ" },
  "how.step1.copy": { en: "Share dream faculty, target university, current score, strengths, and learning preferences.", th: "บอกคณะ มหาวิทยาลัย คะแนนปัจจุบัน จุดแข็ง และวิธีเรียนที่เหมาะกับคุณ" },
  "how.step2.title": { en: "Take an AI Skill Diagnosis", th: "AI วิเคราะห์จุดอ่อนราย Skill" },
  "how.step2.copy": { en: "Analyze performance to identify skill gaps, weak concepts, readiness, and improvement priorities.", th: "ระบบช่วยวิเคราะห์จุดอ่อน skill สำคัญ readiness และสิ่งที่ควรพัฒนาก่อน" },
  "how.step3.title": { en: "Get a Personalized Roadmap", th: "ได้ Personalized Roadmap" },
  "how.step3.copy": { en: "Receive a learning sequence with priority skills, weekly direction, and milestones.", th: "รับลำดับการเรียน skill ที่ควรพัฒนาก่อน เป้าหมายรายสัปดาห์ และ milestone" },
  "how.step4.title": { en: "Practice with AI Feedback", th: "ฝึกพร้อม AI Feedback" },
  "how.step4.copy": { en: "Practice targeted questions and learn from explanations, mistake analysis, and next actions.", th: "ฝึกโจทย์ที่ตรงจุด พร้อมคำอธิบาย วิเคราะห์ข้อผิดพลาด และ next action" },
  "how.step5.title": { en: "Track Progress Over Time", th: "Track Progress แบบเห็นภาพ" },
  "how.step5.copy": { en: "Monitor mastery, readiness score, progress trends, and recommended next steps.", th: "ติดตาม mastery readiness trend และสิ่งที่ควรทำต่ออย่างเข้าใจง่าย" },

  "features.eyebrow": { en: "Key features", th: "ฟีเจอร์หลัก" },
  "features.title": { en: "Built to Help Students Improve <em>Smarter</em>", th: "ออกแบบมาเพื่อช่วยให้เรียน <em>ฉลาดขึ้น</em> ไม่ใช่แค่หนักขึ้น" },
  "features.copy": {
    en: "Each feature translates performance data into a practical next step students and parents can understand.",
    th: "ทุกฟีเจอร์แปลงข้อมูลการเรียนให้กลายเป็น next step ที่นักเรียนและผู้ปกครองเข้าใจได้จริง",
  },
  "features.card1.title": { en: "AI Diagnostic Engine", th: "AI Diagnostic Engine" },
  "features.card1.copy": { en: "Know exactly where you are weak before spending more time studying.", th: "รู้ก่อนว่าอ่อนตรงไหน ก่อนเสียเวลาอ่านเพิ่ม" },
  "features.card2.title": { en: "Goal-to-Score Mapping", th: "Goal-to-Score Mapping" },
  "features.card2.copy": { en: "Turn your dream faculty into a clear score and skill roadmap.", th: "เปลี่ยนคณะที่ฝันให้กลายเป็นแผนพัฒนาที่จับต้องได้" },
  "features.card3.title": { en: "Personalized Study Plans", th: "Personalized Study Plan" },
  "features.card3.copy": { en: "Study what matters most for your goal instead of following generic advice.", th: "ไม่ต้องเรียนเหมือนทุกคน เรียนในแบบที่เหมาะกับคุณ" },
  "features.card4.title": { en: "Adaptive Practice", th: "Adaptive Practice" },
  "features.card4.copy": { en: "The more you practice, the smarter your learning path becomes.", th: "ยิ่งฝึก ระบบยิ่งเข้าใจคุณมากขึ้น" },
  "features.card5.title": { en: "AI Feedback System", th: "AI Feedback System" },
  "features.card5.copy": { en: "Don't just know the answer. Understand why and what to improve next.", th: "ไม่ใช่แค่รู้คำตอบ แต่เข้าใจว่าพลาดเพราะอะไรและควรพัฒนาอะไรต่อ" },
  "features.card6.title": { en: "Progress Analytics Dashboard", th: "Progress Dashboard" },
  "features.card6.copy": { en: "See improvement clearly, one skill at a time.", th: "เห็นการเติบโตของตัวเองทีละ skill" },
  "features.card7.title": { en: "Parent Insight Report", th: "Parent Insight Report" },
  "features.card7.copy": { en: "Help your child with clarity, not guesswork, through simple weekly progress insights.", th: "ช่วยลูกได้ตรงจุดขึ้นด้วย insight รายสัปดาห์ที่เข้าใจง่าย" },

  "comparison.eyebrow": { en: "Why UpSqill is different", th: "ทำไม UpSqill ต่างออกไป" },
  "comparison.title": {
    en: "More Than Practice Questions. UpSqill Understands <em>How You Learn</em>.",
    th: "มากกว่าการทำโจทย์ คือการเข้าใจว่า <em>ควรพัฒนาอย่างไร</em>",
  },
  "comparison.head.tutoring": { en: "Traditional Tutoring", th: "เรียนพิเศษแบบเดิม" },
  "comparison.head.apps": { en: "Generic Learning Apps", th: "แอปฝึกทั่วไป" },
  "comparison.row1.tutoring": { en: "One-size-fits-all learning", th: "เรียนเหมือนกันทั้งกลุ่ม" },
  "comparison.row1.apps": { en: "Static practice content", th: "โจทย์เหมือนเดิม" },
  "comparison.row1.upsqill": { en: "Personalized AI learning roadmap", th: "Roadmap เฉพาะตัวด้วย AI" },
  "comparison.row2.tutoring": { en: "Progress can be unclear", th: "Progress มักไม่ชัด" },
  "comparison.row2.apps": { en: "Basic scoring only", th: "เห็นแค่คะแนนรวม" },
  "comparison.row2.upsqill": { en: "Skill-level diagnosis and analytics", th: "วิเคราะห์ราย skill และ analytics" },
  "comparison.row3.tutoring": { en: "Depends on tutor availability", th: "ขึ้นอยู่กับเวลาครู" },
  "comparison.row3.apps": { en: "Same content for everyone", th: "เนื้อหาเหมือนกันทุกคน" },
  "comparison.row3.upsqill": { en: "Adaptive recommendations", th: "คำแนะนำที่ปรับตามผู้เรียน" },
  "comparison.row4.tutoring": { en: "May not connect to goals", th: "อาจไม่เชื่อมกับเป้าหมาย" },
  "comparison.row4.apps": { en: "No goal-to-score mapping", th: "ไม่เชื่อมคณะกับคะแนน" },
  "comparison.row4.upsqill": { en: "Connects goals, scores, and skills", th: "เชื่อมเป้าหมาย คะแนน และ skill" },

  "journey.eyebrow": { en: "Student journey", th: "เส้นทางของผู้เรียน" },
  "journey.title": { en: "From Uncertainty to <em>Confidence</em>", th: "จากความสับสน สู่การเตรียมสอบแบบมี <em>เป้าหมาย</em>" },
  "journey.copy": { en: "Students move from a dream faculty to exam readiness through diagnosis, roadmap planning, adaptive practice, and progress tracking.", th: "ผู้เรียนเดินจากคณะที่อยากเข้า ไปสู่ readiness ผ่าน diagnostic, roadmap, adaptive practice และ progress tracking" },
  "journey.step1.title": { en: "Dream Big", th: "ตั้งเป้าหมาย" },
  "journey.step1.copy": { en: "Choose direction", th: "เลือกทิศทาง" },
  "journey.step2.title": { en: "Understand Yourself", th: "เข้าใจตัวเอง" },
  "journey.step2.copy": { en: "Diagnose strengths", th: "เห็นจุดแข็งและจุดอ่อน" },
  "journey.step3.title": { en: "Learn Smarter", th: "ฝึกอย่างมีทิศทาง" },
  "journey.step3.copy": { en: "Follow priorities", th: "ทำตามลำดับความสำคัญ" },
  "journey.step4.title": { en: "Track Growth", th: "เห็นพัฒนาการ" },
  "journey.step4.copy": { en: "See mastery", th: "ดู mastery" },
  "journey.step5.title": { en: "Reach Your Goal", th: "เข้าใกล้เป้าหมาย" },
  "journey.step5.copy": { en: "With confidence", th: "อย่างมั่นใจขึ้น" },

  "parents.eyebrow": { en: "For parents", th: "สำหรับผู้ปกครอง" },
  "parents.title": { en: "Help Your Child Learn with Greater <em>Direction</em> and <em>Confidence</em>", th: "ช่วยลูกได้มากขึ้น ด้วยข้อมูลที่ <em>ชัดเจน</em> กว่าเดิม" },
  "parents.copy": { en: "UpSqill gives parents clearer visibility into strengths, weaknesses, progress, and recommended next steps, not only test scores.", th: "UpSqill ไม่ได้ช่วยแค่นักเรียน แต่ช่วยให้ผู้ปกครองเห็นพัฒนาการ เข้าใจจุดอ่อน และช่วย support ลูกได้ตรงจุดมากขึ้น" },
  "parents.benefit1.title": { en: "Clear Progress Tracking", th: "เห็น Progress ชัดเจน" },
  "parents.benefit1.copy": { en: "See whether your child is truly improving.", th: "ไม่ต้องเดาว่าลูกเรียนแล้วดีขึ้นจริงหรือไม่" },
  "parents.benefit2.title": { en: "Smarter Learning Support", th: "เรียนอย่างมีทิศทาง" },
  "parents.benefit2.copy": { en: "Support your child with better direction.", th: "รู้ว่าลูกกำลังเดินตามแผนที่เหมาะกับเป้าหมาย" },
  "parents.benefit3.title": { en: "More Efficient Preparation", th: "ใช้เวลาและทรัพยากรคุ้มขึ้น" },
  "parents.benefit3.copy": { en: "Focus on high-impact improvement areas.", th: "โฟกัสจุดที่มีผลจริง ลดการลงทุนแบบไม่เห็นผล" },
  "parents.benefit4.title": { en: "Lower Stress", th: "ลดความเครียดของทั้งครอบครัว" },
  "parents.benefit4.copy": { en: "Reduce uncertainty with structured next steps.", th: "คุยกันเรื่องการเรียนได้ง่ายขึ้นด้วยข้อมูลและแผนที่ชัดเจน" },
  "parents.report.label": { en: "Parent insight", th: "Parent insight" },
  "parents.report.status": { en: "This week", th: "สัปดาห์นี้" },
  "parents.report.title": { en: "This week's focus", th: "โฟกัสสัปดาห์นี้" },
  "parents.report.row1.label": { en: "High-impact skill", th: "Skill สำคัญ" },
  "parents.report.row1.value": { en: "Reading inference", th: "Reading inference" },
  "parents.report.row2.label": { en: "Practice consistency", th: "ความสม่ำเสมอ" },
  "parents.report.row2.value": { en: "4 days", th: "4 วัน" },
  "parents.report.row3.label": { en: "Next action", th: "สิ่งที่ควรทำต่อ" },
  "parents.report.row3.value": { en: "Review weak concepts", th: "ทบทวน concept ที่ยังอ่อน" },
  "parents.report.chart": { en: "Last 7 days", th: "7 วันที่ผ่านมา" },

  "trust.eyebrow": { en: "Trust and vision", th: "ความน่าเชื่อถือและวิสัยทัศน์" },
  "trust.title": { en: "Built with Educational Research and <em class=\"text-gradient\">AI Innovation</em>", th: "สร้างจากแนวคิด Personalized Learning และ <em class=\"text-gradient\">AI Innovation</em>" },
  "trust.copy": { en: "UpSqill is focused on measurable learning outcomes, adaptive learning, and a clearer preparation experience for both students and parents.", th: "UpSqill เน้นผลลัพธ์การเรียนที่วัดได้ adaptive learning และประสบการณ์เตรียมสอบที่ชัดเจนขึ้นสำหรับทั้งนักเรียนและผู้ปกครอง" },
  "trust.card1": { en: "Designed specifically for Thai high school students", th: "ออกแบบสำหรับนักเรียนไทยโดยเฉพาะ" },
  "trust.card2": { en: "Built for Dek70 university preparation", th: "เหมาะกับการเตรียมสอบของ Dek70" },
  "trust.card3": { en: "Research-driven learning methodology", th: "แนวทางการเรียนที่อิง research" },
  "trust.card4": { en: "Goal-to-score-to-skill mapping", th: "เชื่อมเป้าหมาย คะแนน และ skill" },
  "trust.card5": { en: "AI-powered personalized tutoring vision", th: "วิสัยทัศน์ AI tutoring เฉพาะตัว" },
  "trust.card6": { en: "Parent insight reports and analytics", th: "รายงาน parent insight และ analytics" },
  "partners.eyebrow": { en: "Innovation partners", th: "พันธมิตรด้านนวัตกรรม" },
  "partners.title": { en: "Backed by Trusted Innovation Partners", th: "ได้รับการสนับสนุนจากหน่วยงานด้านนวัตกรรมและการบ่มเพาะธุรกิจ" },
  "partners.copy": {
    en: "UpSqill is supported by innovation and entrepreneurial ecosystem partners that help accelerate research, product development, and educational innovation initiatives. Our collaboration network contributes through mentorship, incubation support, workspace facilitation, ecosystem access, and strategic guidance for AI-powered education innovation.",
    th: "UpSqill ได้รับการสนับสนุนจากหน่วยงานด้านนวัตกรรม การบ่มเพาะธุรกิจ และระบบนิเวศผู้ประกอบการ ที่ร่วมผลักดันการพัฒนาเทคโนโลยีการศึกษาและนวัตกรรม AI เพื่อการเรียนรู้ ความร่วมมือดังกล่าวครอบคลุมทั้งด้านการให้คำปรึกษา พื้นที่ดำเนินงาน เครือข่ายผู้เชี่ยวชาญ และการสนับสนุนเชิงระบบสำหรับการพัฒนาผลิตภัณฑ์และงานวิจัย",
  },
  "partners.logo.tuipi": { en: "TUIPI, Thammasat University", th: "TUIPI มหาวิทยาลัยธรรมศาสตร์" },
  "partners.logo.tedfund": { en: "TED Fund", th: "กองทุน TED Fund" },

  "vision.eyebrow": { en: "Future vision", th: "วิสัยทัศน์ระยะยาว" },
  "vision.title": { en: "Every student deserves a roadmap built for how they learn.", th: "เราเชื่อว่าเด็กทุกคนควรมี Roadmap การเรียนที่เหมาะกับตัวเอง" },
  "vision.copy": { en: "UpSqill is building a personalized education ecosystem: skill diagnosis, adaptive learning, AI coaching, parent insights, and analytics that help students improve with direction.", th: "UpSqill กำลังสร้าง ecosystem การเรียนเฉพาะตัวที่รวม skill diagnosis, adaptive learning, AI coaching, parent insights และ analytics เพื่อช่วยให้นักเรียนพัฒนาอย่างมีทิศทาง" },
  "vision.card1.title": { en: "AI tutoring", th: "AI tutoring" },
  "vision.card1.copy": { en: "Personalized guidance", th: "คำแนะนำเฉพาะตัว" },
  "vision.card2.title": { en: "Multi-subject diagnosis", th: "Multi-subject diagnosis" },
  "vision.card2.copy": { en: "Across Dek70 subjects", th: "ครอบคลุมวิชาของ Dek70" },
  "vision.card3.title": { en: "Parent analytics", th: "Parent analytics" },
  "vision.card3.copy": { en: "Clear progress support", th: "ช่วย support ลูกด้วยข้อมูล" },

  "faq.eyebrow": { en: "FAQ", th: "คำถามที่พบบ่อย" },
  "faq.title": { en: "Questions Students and Parents Ask First", th: "คำถามแรกที่นักเรียนและผู้ปกครองมักสงสัย" },
  "faq.q1": { en: "Is UpSqill free to use?", th: "UpSqill ใช้ฟรีไหม?" },
  "faq.a1": { en: "Some features will be available for free, while advanced personalized features may require subscription access.", th: "บางฟีเจอร์จะเปิดให้ใช้ฟรี ส่วนฟีเจอร์ personalized ขั้นสูงอาจมีแพ็กเกจ subscription ในอนาคต" },
  "faq.q2": { en: "How does the AI diagnosis work?", th: "AI diagnosis ทำงานอย่างไร?" },
  "faq.a2": { en: "The system analyzes answers, performance patterns, and skill mastery to identify strengths, weaknesses, and recommended next steps.", th: "ระบบวิเคราะห์คำตอบ pattern การทำโจทย์ และ skill mastery เพื่อหา strengths, weaknesses และ next step ที่แนะนำ" },
  "faq.q3": { en: "Can UpSqill help me choose a faculty?", th: "UpSqill ช่วยเลือกคณะได้ไหม?" },
  "faq.a3": { en: "Yes. UpSqill connects interests, goals, current scores, and academic strengths with possible faculty options.", th: "ได้ UpSqill ช่วยเชื่อมความสนใจ เป้าหมาย คะแนนปัจจุบัน และจุดแข็งทางวิชาการกับตัวเลือกคณะที่เหมาะสม" },
  "faq.q4": { en: "Can UpSqill help me improve my exam score?", th: "UpSqill ช่วยเพิ่มคะแนนสอบได้ไหม?" },
  "faq.a4": { en: "Yes. UpSqill identifies weak skills and recommends targeted practice so students can improve more efficiently.", th: "ได้ UpSqill ช่วยระบุ skill ที่อ่อนและแนะนำการฝึกที่ตรงจุด เพื่อให้พัฒนาได้มีประสิทธิภาพขึ้น" },
  "faq.q5": { en: "Can parents track student progress?", th: "ผู้ปกครองดู progress ได้ไหม?" },
  "faq.a5": { en: "Yes. Parents can access progress insights and learning reports when parent features are available.", th: "ได้ เมื่อระบบ Parent Insight เปิดใช้งาน ผู้ปกครองจะเห็นภาพรวม progress และคำแนะนำในการ support ลูก" },
  "faq.q6": { en: "Is UpSqill a replacement for tutoring?", th: "UpSqill แทนที่การเรียนพิเศษไหม?" },
  "faq.a6": { en: "UpSqill can complement tutoring, self-study, or school learning by providing personalized diagnosis, practice, and progress insights.", th: "UpSqill ไม่จำเป็นต้องแทนที่การเรียนพิเศษ แต่ช่วยให้การเรียนพิเศษ การอ่านเอง หรือการเรียนที่โรงเรียนมีทิศทางและวัดผลได้ชัดเจนขึ้น" },

  "final.eyebrow": { en: "Start today", th: "เริ่มวันนี้" },
  "final.title": { en: "Start Your Personalized Learning Journey <em>Today</em>", th: "เริ่มต้นวาง Roadmap สอบเข้า <em>ของคุณวันนี้</em>" },
  "final.copy": { en: "Discover your strengths, identify your weak points, and build a smarter path toward your dream university.", th: "ค้นหาจุดอ่อน เข้าใจตัวเอง และเตรียมสอบอย่างมี direction มากขึ้นด้วย UpSqill" },
  "final.perk1": { en: "Free diagnostic — no card required", th: "เริ่ม diagnostic ฟรี ไม่ต้องใช้บัตร" },
  "final.perk2": { en: "Roadmap delivered in minutes", th: "เห็น Roadmap ได้ในไม่กี่นาที" },
  "final.perk3": { en: "Built for Thai admission system", th: "ออกแบบสำหรับระบบสอบเข้าไทย" },
  "form.title": { en: "Join the waitlist", th: "สมัคร Waitlist" },
  "form.badge": { en: "Early access opens soon", th: "Early access เร็ว ๆ นี้" },
  "form.name": { en: "Student or parent name", th: "ชื่อนักเรียนหรือผู้ปกครอง" },
  "form.namePlaceholder": { en: "Your name", th: "ชื่อของคุณ" },
  "form.email": { en: "Email", th: "อีเมล" },
  "form.emailPlaceholder": { en: "you@example.com", th: "you@example.com" },
  "form.goal": { en: "Main goal", th: "เป้าหมายหลัก" },
  "form.option.choose": { en: "Choose one", th: "เลือกหนึ่งข้อ" },
  "form.option.diagnostic": { en: "Start free diagnostic", th: "เริ่มวิเคราะห์จุดอ่อนฟรี" },
  "form.option.waitlist": { en: "Join the waitlist", th: "สมัคร Waitlist" },
  "form.option.report": { en: "Explore demo report", th: "ดูตัวอย่าง Demo Report" },
  "form.option.faculty": { en: "Find best-fit faculty", th: "ค้นหาคณะที่เหมาะกับตัวเอง" },
  "form.note": { en: "We will use this information to contact you about early access.", th: "เราจะใช้ข้อมูลนี้เพื่อติดต่อคุณเกี่ยวกับ early access" },
  "form.success": { en: "Thanks. Your early-access interest was saved in this browser for the prototype.", th: "ขอบคุณ ข้อมูลความสนใจ early access ถูกบันทึกไว้ในเบราว์เซอร์นี้สำหรับ prototype แล้ว" },

  "footer.copy": {
    en: "UpSqill is an AI-powered personalized learning platform built to help students prepare for university admission with clarity, confidence, and direction.",
    th: "UpSqill คือ AI-powered personalized learning platform ที่ช่วยให้นักเรียนเตรียมสอบเข้ามหาวิทยาลัยด้วยความชัดเจน มั่นใจ และมีทิศทางมากขึ้น",
  },
  "footer.about": { en: "About UpSqill", th: "เกี่ยวกับ UpSqill" },
  "footer.contact": { en: "Contact", th: "ติดต่อ" },
  "footer.faq": { en: "FAQ", th: "คำถาม" },
  "footer.privacy": { en: "Privacy Policy", th: "นโยบายความเป็นส่วนตัว" },
  "footer.terms": { en: "Terms of Service", th: "เงื่อนไขการใช้งาน" },
  "footer.addressLabel": { en: "Headquarters", th: "สำนักงานใหญ่" },
  "footer.address": {
    en: "TU - Bualuang Mindscape<br>Office of Advanced Science and Technology<br>Floor 4, 99 Moo 18<br>Paholyothin Road<br>Khlong Nueng, Khlong Luang District<br>Pathum Thani 12120<br>Thailand",
    th: "TU - Bualuang Mindscape<br>อาคารศูนย์บริการวิชาการ มหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต ชั้น 4<br>เลขที่ 99 หมู่ 18<br>ถนนพหลโยธิน ตำบลคลองหนึ่ง<br>อำเภอคลองหลวง จังหวัดปทุมธานี 12120",
  },
  "footer.bottom": { en: "&copy; UpSqill 2026 — Built for Dek70 university success.", th: "&copy; UpSqill 2026 — สร้างเพื่อความสำเร็จในการสอบเข้าของ Dek70" },
};

function getText(key, lang = document.body.dataset.lang || "en") {
  return i18n[key]?.[lang] || i18n[key]?.en || "";
}

function applyLanguage(lang) {
  const nextLang = lang === "th" ? "th" : "en";
  document.body.dataset.lang = nextLang;
  document.documentElement.lang = nextLang;
  document.title = getText("meta.title", nextLang);
  document.querySelector("meta[name='description']")?.setAttribute("content", getText("meta.description", nextLang));

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const text = getText(el.dataset.i18n, nextLang);
    if (text) el.textContent = text;
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const html = getText(el.dataset.i18nHtml, nextLang);
    if (html) el.innerHTML = html;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const placeholder = getText(el.dataset.i18nPlaceholder, nextLang);
    if (placeholder) el.setAttribute("placeholder", placeholder);
  });

  langToggle?.setAttribute("aria-pressed", String(nextLang === "th"));
  langToggle?.setAttribute("aria-label", nextLang === "th" ? "Switch language to English" : "Switch language to Thai");
  localStorage.setItem("upsqillLanguage", nextLang);
}

applyLanguage(localStorage.getItem("upsqillLanguage") || "en");

langToggle?.addEventListener("click", () => {
  applyLanguage(document.body.dataset.lang === "th" ? "en" : "th");
});

navToggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation");
  });
});

// Header shadow on scroll
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (y > 30 && lastScroll <= 30) header?.classList.add("is-scrolled");
  if (y <= 30 && lastScroll > 30) header?.classList.remove("is-scrolled");
  lastScroll = y;
}, { passive: true });

// ============================================================
// WAITLIST
// ============================================================
waitlistForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(waitlistForm);
  const lead = {
    name: formData.get("name"),
    email: formData.get("email"),
    goal: formData.get("goal"),
    capturedAt: new Date().toISOString(),
  };

  const existing = JSON.parse(localStorage.getItem("upsqillWaitlist") || "[]");
  existing.push(lead);
  localStorage.setItem("upsqillWaitlist", JSON.stringify(existing));

  waitlistForm.reset();
  formNote.dataset.i18n = "form.success";
  formNote.textContent = getText("form.success");
  formNote.classList.add("success");
});

// ============================================================
// PARALLAX SCENE PANELS (mouse follow)
// ============================================================
const depthElements = document.querySelectorAll("[data-depth]");
let pointerX = 0, pointerY = 0;
let frameQueued = false;

function applyParallax() {
  depthElements.forEach((el) => {
    const depth = Number(el.dataset.depth || 0);
    el.style.transform = `translate3d(${pointerX * depth}px, ${pointerY * depth}px, 0)`;
  });
  frameQueued = false;
}

window.addEventListener("pointermove", (event) => {
  pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
  pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
  if (!frameQueued) {
    frameQueued = true;
    requestAnimationFrame(applyParallax);
  }
});

// ============================================================
// 3D TILT ON CARDS
// ============================================================
const tiltCards = document.querySelectorAll(".tilt, .tilt-strong");
tiltCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const intensity = card.classList.contains("tilt-strong") ? 10 : 5;
    card.style.transform = `perspective(1000px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateY(-6px)`;
  });
  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

// ============================================================
// SCROLL REVEAL + COUNTERS + BAR ANIMATIONS
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    revealObserver.unobserve(entry.target);

    // Animate counters within
    entry.target.querySelectorAll("[data-counter]").forEach(animateCounter);
    // Animate bars within
    entry.target.querySelectorAll("[data-bar-target]").forEach((bar) => {
      const target = Number(bar.dataset.barTarget || 0);
      requestAnimationFrame(() => { bar.style.width = `${target}%`; });
    });
  });
}, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Hero counters fire immediately
document.querySelectorAll(".hero [data-counter], .scene-panel [data-counter]").forEach(animateCounter);

function animateCounter(el) {
  const target = Number(el.dataset.target || 0);
  const suffix = el.dataset.suffix || "";
  const duration = 1500;
  const start = performance.now();
  const startVal = 0;

  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = Math.round(startVal + (target - startVal) * eased);
    el.textContent = `${value}${suffix}`;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ============================================================
// HERO CANVAS — neural-network-style animated nodes
// ============================================================
const canvas = document.getElementById("hero-canvas");
const ctx = canvas?.getContext("2d");

const nodes = [
  { x: 0.12, y: 0.28, r: 3, color: 0 },
  { x: 0.22, y: 0.62, r: 4, color: 1 },
  { x: 0.34, y: 0.42, r: 3, color: 0 },
  { x: 0.5,  y: 0.58, r: 5, color: 1 },
  { x: 0.62, y: 0.32, r: 4, color: 0 },
  { x: 0.74, y: 0.66, r: 3, color: 1 },
  { x: 0.86, y: 0.4,  r: 4, color: 0 },
  { x: 0.42, y: 0.78, r: 3, color: 1 },
  { x: 0.58, y: 0.18, r: 3, color: 0 },
  { x: 0.78, y: 0.22, r: 3, color: 1 },
];

const colors = [
  "rgba(36, 82, 155, 0.55)",
  "rgba(32, 174, 234, 0.55)",
];

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawScene(time = 0) {
  if (!canvas || !ctx) return;
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  ctx.clearRect(0, 0, width, height);

  const points = nodes.map((node, i) => ({
    x: node.x * width + Math.sin(time / 1500 + i) * 12,
    y: node.y * height + Math.cos(time / 1700 + i * 1.3) * 9,
    r: node.r,
    color: node.color,
  }));

  // Draw connecting lines between nearby nodes
  ctx.lineWidth = 1;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = points[i];
      const b = points[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.min(width, height) * 0.22;
      if (dist > maxDist) continue;
      const opacity = (1 - dist / maxDist) * 0.18;
      ctx.strokeStyle = `rgba(36, 82, 155, ${opacity})`;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }

  // Draw nodes with glow
  points.forEach((point, index) => {
    const pulse = Math.sin(time / 600 + index) * 1.4;
    const radius = point.r + pulse;

    // Outer glow
    const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius * 4);
    gradient.addColorStop(0, colors[point.color]);
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius * 4, 0, Math.PI * 2);
    ctx.fill();

    // Solid dot
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = colors[point.color];
    ctx.fill();
  });

  requestAnimationFrame(drawScene);
}

resizeCanvas();
requestAnimationFrame(drawScene);
window.addEventListener("resize", resizeCanvas);

// ============================================================
// SCROLL-BASED HERO PARALLAX
// ============================================================
const heroScene = document.querySelector(".hero-scene");
const blobField = document.querySelector(".blob-field");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (y > window.innerHeight) return;
  if (heroScene) heroScene.style.transform = `translateY(${y * 0.15}px)`;
  if (blobField) blobField.style.transform = `translateY(${y * 0.3}px)`;
}, { passive: true });

// Score ring animation when in view
const ringObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const ring = entry.target.querySelector(".score-ring-progress");
    if (ring) {
      // 528 = 2 * PI * r(84) ≈ 528. Offset 528 - (528 * 0.72) ≈ 148
      ring.style.strokeDashoffset = "148";
    }
    ringObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });
document.querySelectorAll(".score-ring").forEach((el) => ringObserver.observe(el));
