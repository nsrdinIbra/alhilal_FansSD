// بيانات الأخبار (يمكنك نقلها لاحقاً إلى ملف articles.json منفصل)
const newsData = [
    {
        id: 1,
        category: "africa",
        categoryLabel: "دوري أبطال أفريقيا",
        title: "الهلال يواصل تحضيراته القوية للمواجهة الأفريقية المرتقبة",
        summary: "أجرى الفريق مرانه الرئيسي وسط روح معنوية عالية من جميع اللاعبين والجهاز الفني لحصد النقاط الكاملة.",
        date: "22 نوفمبر 2026"
    },
    {
        id: 2,
        category: "club",
        categoryLabel: "أخبار النادي",
        title: "تألق لافت لنجوم خط الوسط في التجارب الإعدادية",
        summary: "أشاد الجهاز الفني بالمستوى البدني والفني الذي ظهر به اللاعبون خلال معسكر الفريق.",
        date: "20 نوفمبر 2026"
    },
    {
        id: 3,
        category: "africa",
        categoryLabel: "البطولة الأفريقية",
        title: "جماهير الموج الأزرق تملأ المدرجات وتزف الفريق",
        summary: "لوحة تشجيعية رائعة رسمتها جماهير الهلال السوداني دعماً لسيد البلد في مشواره القاري.",
        date: "18 نوفمبر 2026"
    }
];

// بيانات تشكيلة الفريق
const squadData = [
    { number: "1", name: "عيسى فوفانا", role: "حارس مرمى" },
    { number: "6", name: "محمد أحمد إرنق", role: "مدافع" },
    { number: "21", name: "والي الدين خضر (بوغبا)", role: "وسط" },
    { number: "10", name: "محمد عبد الرحمن (الغربال)", role: "مهاجم" },
    { number: "11", name: "ياسر مزمل", role: "جناح هجومي" },
    { number: "8", name: "صلاح عادل", role: "وسط" }
];

// عرض الأخبار
const newsContainer = document.getElementById("newsContainer");
function renderNews(filter = "all") {
    newsContainer.innerHTML = "";
    const filtered = filter === "all" 
        ? newsData 
        : newsData.filter(item => item.category === filter);

    filtered.forEach(news => {
        const card = document.createElement("div");
        card.className = "news-card";
        card.innerHTML = `
            <div class="news-banner">${news.categoryLabel}</div>
            <div class="news-body">
                <h3>${news.title}</h3>
                <p>${news.summary}</p>
                <span class="news-date">📅 ${news.date}</span>
            </div>
        `;
        newsContainer.appendChild(card);
    });
}

// تفعيل أزرار تصفية الأخبار
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        btn.classList.add("active");
        renderNews(btn.dataset.filter);
    });
});

// عرض تشكيلة الفريق
const squadContainer = document.getElementById("squadContainer");
function renderSquad() {
    squadData.forEach(player => {
        const card = document.createElement("div");
        card.className = "player-card";
        card.innerHTML = `
            <div class="player-number">#${player.number}</div>
            <h3>${player.name}</h3>
            <span class="player-role">${player.role}</span>
        `;
        squadContainer.appendChild(card);
    });
}

// قسم صوت الجمهور (حفظ محلي في المتصفح)
const fanForm = document.getElementById("fanForm");
const fanPosts = document.getElementById("fanPosts");

let posts = JSON.parse(localStorage.getItem("alhilal_fan_posts")) || [
    { name: "هلالابي من أم درمان", message: "بالتوفيق لسيد البلد في كل المحافل، دايماً في الموعد يا أبطال!", time: "اليوم" }
];

function renderPosts() {
    fanPosts.innerHTML = "";
    posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "fan-post-card";
        div.innerHTML = `
            <div class="fan-post-header">
                <span>🔵 ${post.name}</span>
                <small>${post.time}</small>
            </div>
            <p>${post.message}</p>
        `;
        fanPosts.appendChild(div);
    });
}

fanForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("fanName").value.trim();
    const msgInput = document.getElementById("fanMessage").value.trim();

    if (nameInput && msgInput) {
        posts.unshift({
            name: nameInput,
            message: msgInput,
            time: new Date().toLocaleDateString("ar-SD")
        });
        localStorage.setItem("alhilal_fan_posts", JSON.stringify(posts));
        renderPosts();
        fanForm.reset();
    }
});

// قائمة الهاتف
document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("navLinks").classList.toggle("show");
});

// تشغيل الوظائف عند تحميل الصفحة
renderNews();
renderSquad();
renderPosts();