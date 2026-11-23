// بيانات احتياطية في حال تعذر قراءة news.json محلياً
const fallbackArticlesData = [
    {
        id: 1,
        category: "africa",
        categoryLabel: "دوري أبطال أفريقيا",
        title: "الهلال يواصل تحضيراته القوية للمواجهة الأفريقية المرتقبة",
        summary: "أجرى الفريق مرانه الرئيسي وسط روح معنوية عالية من جميع اللاعبين والجهاز الفني لحصد النقاط الكاملة.",
        content: [
            "واصل فريق الهلال السوداني تحضيراته الجادة استعداداً للمواجهة الأفريقية المرتقبة وسط تركيز عالٍ وانضباط داخل التدريبات.",
            "ركز الجهاز الفني خلال المران على الجوانب التكتيكية والسرعة في التحول الهجومي وتنظيم الخطوط."
        ],
        author: "تحرير جمهور الهلال",
        image: "h.jpeg",
        date: "22 نوفمبر 2026"
    },
    {
        id: 2,
        category: "club",
        categoryLabel: "أخبار النادي",
        title: "تألق لافت لنجوم خط الوسط في التجارب الإعدادية",
        summary: "أشاد الجهاز الفني بالمستوى البدني والفني الذي ظهر به اللاعبون خلال معسكر الفريق.",
        content: [
            "قدم لاعبو خط الوسط مستويات مميزة خلال الحصص التدريبية والمباريات التحضيرية، مما عزز الخيارات الفنية للفريق.",
            "تظهر الروح الجماعية والانسجام بوضوح بين العناصر الأساسية والشابة في صفوف الموج الأزرق."
        ],
        author: "متابعة الهلال",
        image: "hl.jpg",
        date: "20 نوفمبر 2026"
    },
    {
        id: 3,
        category: "africa",
        categoryLabel: "البطولة الأفريقية",
        title: "جماهير الموج الأزرق تملأ المدرجات وتزف الفريق",
        summary: "لوحة تشجيعية رائعة رسمتها جماهير الهلال السوداني دعماً لسيد البلد في مشواره القاري.",
        content: [
            "تواصل جماهير الهلال السوداني حضورها المؤثر ودعمها المتواصل للفريق في مختلف المواعيد القارية.",
            "يشكل الدعم الجماهيري حافزاً إضافياً للاعبين لتقديم أفضل ما لديهم داخل المستطيل الأخضر."
        ],
        author: "صوت الجماهير",
        image: "h.jpeg",
        date: "18 نوفمبر 2026"
    },
    {
        id: 4,
        category: "blogs",
        categoryLabel: "مدونات وتحليلات",
        title: "مدونات وتحليلات: قراءة في منظومة الضغط والربط الهجومي للهلال",
        summary: "تحليل فني وتدوينة حول كيفية صناعة اللعب واستغلال المساحات في الثلث الأخير.",
        content: [
            "تعتمد فعالية الهلال هجومياً على سرعة نقل الكرة من مناطق العمق إلى الأطراف وصناعة التفوق العددي.",
            "الضغط المنظم بعد فقدان الكرة يقلل من خطورة المنافسين ويمنح الفريق استعادة أسرع للكرة."
        ],
        author: "مدونة سيد البلد",
        image: "h.jpeg",
        date: "23 نوفمبر 2026"
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

let articlesData = [...fallbackArticlesData];
let currentFilter = "all";

const newsContainer = document.getElementById("newsContainer");
const blogsContainer = document.getElementById("blogsContainer");

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function createArticleCard(item) {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
        <div class="news-banner">${escapeHtml(item.categoryLabel || item.category || "محتوى")}</div>
        <div class="news-body">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.summary || "")}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-top:12px;">
                <span class="news-date">📅 ${escapeHtml(item.date || "")}</span>
                <button type="button" class="btn btn-outline read-article-btn" data-id="${escapeHtml(item.id)}" style="padding:6px 12px; font-size:0.85rem;">
                    قراءة المزيد
                </button>
            </div>
        </div>
    `;

    const btn = card.querySelector(".read-article-btn");
    if (btn) {
        btn.addEventListener("click", () => openArticleModal(item));
    }

    return card;
}

// عرض الأخبار مع الفلترة
function renderNews(filter = currentFilter) {
    if (!newsContainer) return;
    currentFilter = filter;
    newsContainer.innerHTML = "";

    const filtered = filter === "all"
        ? articlesData
        : articlesData.filter(item => item.category === filter);

    if (!filtered.length) {
        newsContainer.innerHTML = `<p style="text-align:center;">لا توجد مواد منشورة في هذا التصنيف حالياً.</p>`;
        return;
    }

    filtered.forEach(news => {
        newsContainer.appendChild(createArticleCard(news));
    });
}

// عرض قسم مدونات وتحليلات
function renderBlogs() {
    if (!blogsContainer) return;
    blogsContainer.innerHTML = "";

    const blogItems = articlesData.filter(item => item.category === "blogs");

    if (!blogItems.length) {
        blogsContainer.innerHTML = `<p style="text-align:center;">لا توجد مدونات وتحليلات منشورة حالياً.</p>`;
        return;
    }

    blogItems.forEach(blog => {
        blogsContainer.appendChild(createArticleCard(blog));
    });
}

// تحميل البيانات من ملف news.json
async function loadArticlesFromJson() {
    try {
        const response = await fetch("./news.json", { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data.articles) && data.articles.length > 0) {
            articlesData = [...data.articles].sort((a, b) => Number(b.id) - Number(a.id));
        }
    } catch (error) {
        console.warn("تم الاعتماد على البيانات الاحتياطية لأن تحميل news.json لم يكتمل:", error);
    }

    renderNews(currentFilter);
    renderBlogs();
}

// نافذة قراءة الخبر أو المقال أو التدوينة بالكامل
function openArticleModal(article) {
    let modal = document.getElementById("hilalArticleModal");

    if (!modal) {
        modal = document.createElement("div");
        modal.id = "hilalArticleModal";
        modal.style.cssText = `
            position: fixed; inset: 0; background: rgba(0, 20, 50, 0.75);
            display: flex; align-items: center; justify-content: center;
            padding: 16px; z-index: 9999;
        `;
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.style.display = "none";
        });
        document.body.appendChild(modal);
    }

    const paragraphsHtml = Array.isArray(article.content) && article.content.length > 0
        ? article.content.map(p => `<p style="margin-bottom:12px; line-height:1.85;">${escapeHtml(p)}</p>`).join("")
        : `<p style="line-height:1.85;">${escapeHtml(article.summary || "")}</p>`;

    modal.innerHTML = `
        <div style="background:#fff; color:#111; max-width:720px; width:100%; max-height:88vh; overflow-y:auto; border-radius:12px; padding:24px; box-shadow:0 15px 40px rgba(0,0,0,0.3);">
            <button type="button" id="closeHilalModal" aria-label="إغلاق"
                style="float:left; background:#004aad; color:#fff; border:none; border-radius:8px; padding:6px 12px; cursor:pointer; font-family:inherit;">
                إغلاق ✕
            </button>
            <span style="display:inline-block; background:#e8f1ff; color:#004aad; padding:4px 10px; border-radius:6px; font-size:0.85rem; font-weight:700;">
                ${escapeHtml(article.categoryLabel || article.category || "")}
            </span>
            <h2 style="margin:12px 0 8px; color:#002b6b;">${escapeHtml(article.title)}</h2>
            <small style="display:block; color:#666; margin-bottom:16px;">
                📅 ${escapeHtml(article.date || "")} ${article.author ? `• ✍️ ${escapeHtml(article.author)}` : ""}
            </small>
            ${
                article.image
                    ? `<img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}" style="width:100%; max-height:320px; object-fit:cover; border-radius:8px; margin-bottom:16px;">`
                    : ""
            }
            <div>${paragraphsHtml}</div>
        </div>
    `;

    modal.style.display = "flex";

    const closeBtn = document.getElementById("closeHilalModal");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }
}

// تفعيل أزرار تصفية الأخبار
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const activeBtn = document.querySelector(".filter-btn.active");
        if (activeBtn) activeBtn.classList.remove("active");
        btn.classList.add("active");
        renderNews(btn.dataset.filter);
    });
});

// عرض تشكيلة الفريق
const squadContainer = document.getElementById("squadContainer");
function renderSquad() {
    if (!squadContainer) return;
    squadContainer.innerHTML = "";
    squadData.forEach(player => {
        const card = document.createElement("div");
        card.className = "player-card";
        card.innerHTML = `
            <div class="player-number">#${escapeHtml(player.number)}</div>
            <h3>${escapeHtml(player.name)}</h3>
            <span class="player-role">${escapeHtml(player.role)}</span>
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
    if (!fanPosts) return;
    fanPosts.innerHTML = "";
    posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "fan-post-card";
        div.innerHTML = `
            <div class="fan-post-header">
                <span>🔵 ${escapeHtml(post.name)}</span>
                <small>${escapeHtml(post.time)}</small>
            </div>
            <p>${escapeHtml(post.message)}</p>
        `;
        fanPosts.appendChild(div);
    });
}

if (fanForm) {
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
}

// قائمة الهاتف
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}

// تشغيل الوظائف عند تحميل الصفحة
renderNews("all");
renderBlogs();
loadArticlesFromJson();
renderSquad();
renderPosts();
