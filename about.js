/* =========================================================
   ABOUT PAGE
   ========================================================= */

// Always start the About page at the very top
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
});

window.addEventListener("pageshow", () => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
});

/* ================= BOOT SCREEN ================= */

const bootSection = document.getElementById("skills-boot");
const bootStatus = document.getElementById("boot-status");
const bootMessage = document.getElementById("boot-message");
const bootPercent = document.getElementById("boot-percent");
const skillsDesktop = document.getElementById("technical-skills");

let bootStarted = false;

if (bootSection) {
    const bootObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting || bootStarted) {
                return;
            }

            bootStarted = true;
            bootSection.classList.add("is-active");

            /* Loading text */
            setTimeout(() => {
                bootMessage.textContent = "Loading technical skills...";
            }, 900);

            setTimeout(() => {
                bootMessage.textContent = "Initializing developer toolbox...";
            }, 1800);

            setTimeout(() => {
                bootMessage.textContent = "Finalizing system...";
            }, 2500);

            /* Fake percentage counter */
            let currentPercent = 0;

            const percentInterval = setInterval(() => {
                currentPercent += Math.floor(Math.random() * 8) + 3;

                if (currentPercent >= 100) {
                    currentPercent = 100;
                    clearInterval(percentInterval);

                    bootSection.classList.add("is-complete");
                    bootStatus.textContent = "READY";
                    bootMessage.textContent = "Profile loaded.";
                    bootPercent.textContent = "100%";

                    setTimeout(() => {
                        skillsDesktop.classList.add("is-visible");
                    }, 700);

                    return;
                }

                bootPercent.textContent = `${currentPercent}%`;
            }, 180);
        });
    }, {
        threshold: 0.35
    });

    bootObserver.observe(bootSection);
}

/* ================= SKILL DATA ================= */

const skillData = {
    programming: {
        title: "PROGRAMMING LANGUAGES",
        description: "Languages I have worked with across academic, personal, and development projects.",
        skills: [
            ["HTML", "HTML"],
            ["CSS", "CSS"],
            ["JavaScript", "JS"],
            ["Java", "JAVA"],
            ["Python", "PY"],
            ["PHP", "PHP"],
            ["SQL", "SQL"],
            ["C++", "C++"],
            ["C#", "C#", "Beginner"]
        ]
    },

    frameworks: {
        title: "FRAMEWORKS & LIBRARIES",
        description: "Frameworks and libraries I have used for web, mobile, and desktop applications.",
        skills: [
            ["React Native (Expo)", "RN"],
            ["Angular", "NG"],
            ["Spring Boot", "SB"],
            ["JavaFX", "JFX"]
        ]
    },

    deployment: {
        title: "CLOUD & DEPLOYMENT",
        description: "Platforms and technologies I have used for deployment and server environments.",
        skills: [
            ["AWS EC2", "AWS"],
            ["Render", "RE"],
            ["Railway", "RW"],
            ["Apache Tomcat", "TOM"],
            ["NGINX", "NGX"]
        ]
    },

    web: {
        title: "WEB TECHNOLOGIES",
        description: "Web technologies, APIs, data formats, and development tools I have worked with.",
        skills: [
            ["REST APIs", "API"],
            ["JSON", "JSON"],
            ["XML", "XML"],
            ["XAMPP", "XAMPP"],
            ["Postman", "POST"]
        ]
    },

    databases: {
        title: "DATABASE TECHNOLOGIES",
        description: "Database systems I have used for application development.",
        skills: [
            ["MySQL", "SQL"],
            ["Oracle", "ORA"]
        ]
    },

    design: {
        title: "MULTIMEDIA & DESIGN",
        description: "Creative and design tools I have used for interfaces, graphics, and multimedia.",
        skills: [
            ["Adobe Photoshop", "PS"],
            ["Adobe Premiere", "PR"],
            ["Canva", "CV"],
            ["Wix", "WIX"],
            ["Figma", "FIG"]
        ]
    },

    ides: {
        title: "IDEs & EDITORS",
        description: "Development environments and editors I have used throughout my projects.",
        skills: [
            ["Visual Studio Code", "VS"],
            ["Android Studio", "AS"],
            ["Xcode", "XC"],
            ["Eclipse", "EC"],
            ["Apache NetBeans", "NB"],
            ["IntelliJ IDEA", "IJ"],
            ["Brackets", "BR"],
            ["Jupyter Notebook", "JN"]
        ]
    },

    productivity: {
        title: "PRODUCTIVITY TOOLS",
        description: "Organization, productivity, and collaboration tools I have worked with.",
        skills: [
            ["JIRA", "JIRA"],
            ["Notion", "NOT"],
            ["Microsoft Word", "WORD"],
            ["Microsoft Excel", "XLS"],
            ["Microsoft PowerPoint", "PPT"],
            ["Google Docs", "DOCS"],
            ["Google Sheets", "SHEET"],
            ["Google Slides", "SLD"]
        ]
    },

    "operating-systems": {
        title: "OPERATING SYSTEMS",
        description: "Operating systems I have used for development and general computing.",
        skills: [
            ["Windows", "WIN"],
            ["macOS", "MAC"]
        ]
    }
};

/* ================= SKILL WINDOWS ================= */

const skillFolders = document.querySelectorAll(".skill-folder");
const skillModal = document.getElementById("skill-modal");
const skillClose = document.getElementById("skill-close");
const skillItems = document.getElementById("skill-items");
const skillTitle = document.getElementById("skill-panel-title");
const skillDescription = document.getElementById("skill-panel-description");

function openSkillWindow(category) {
    const categoryData = skillData[category];

    if (!categoryData) {
        return;
    }

    skillTitle.textContent = categoryData.title;
    skillDescription.textContent = categoryData.description;
    skillItems.innerHTML = "";

    categoryData.skills.forEach((skill, index) => {
        const name = skill[0];
        const mark = skill[1];
        const note = skill[2] || "";

        const item = document.createElement("div");
        item.className = "skill-item";

        item.innerHTML = `
            <span class="skill-mark">${mark}</span>
            <div>
                <span class="skill-item-name">${name}</span>
                ${note ? `<span class="skill-item-note">${note}</span>` : ""}
            </div>
        `;

        item.style.opacity = "0";
        item.style.transform = "translateY(10px)";
        skillItems.appendChild(item);

        setTimeout(() => {
            item.style.transition = "opacity 0.35s ease, transform 0.35s ease";
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }, index * 60);
    });

    skillModal.classList.add("is-open");
    skillModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeSkillWindow() {
    skillModal.classList.remove("is-open");
    skillModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

/* ================= FOLDER EVENTS ================= */

skillFolders.forEach((folder) => {
    folder.addEventListener("click", () => {
        const category = folder.dataset.category;
        openSkillWindow(category);
    });
});

/* ================= CLOSE EVENTS ================= */

skillClose.addEventListener("click", closeSkillWindow);

document.querySelector("[data-close-modal]")
    .addEventListener("click", closeSkillWindow);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeSkillWindow();
    }
});

/* =========================================================
   SCROLL-BASED ID SCAN
   TRACKS THE ID CARD AS IT PASSES THROUGH THE VIEWPORT
   ========================================================= */

const aboutSection = document.querySelector(".about");
const idScanLine = document.querySelector(".scan-line");

if (aboutSection && idScanLine) {
    const scanTarget = idScanLine.parentElement;
    const mobileScanQuery = window.matchMedia("(max-width: 767px)");

    function updateIDScan() {
        if (mobileScanQuery.matches) {
            idScanLine.classList.add("mobile-scan");
            idScanLine.style.top = "";
            idScanLine.style.opacity = "";
            return;
        }

        idScanLine.classList.remove("mobile-scan");
        const rect = scanTarget.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const start = viewportHeight * 0.88;
        const end = -rect.height * 0.12;
        let scanProgress = (start - rect.top) / (start - end);

        scanProgress = Math.max(0, Math.min(1, scanProgress));

        const scanPosition = -15 + (scanProgress * 130);
        idScanLine.style.top = `${scanPosition}%`;
        idScanLine.style.opacity = scanProgress > 0.02 && scanProgress < 0.98 ? "1" : "0";
    }

    window.addEventListener("scroll", updateIDScan, {
        passive: true
    });

    window.addEventListener("resize", updateIDScan);
    updateIDScan();
}

/* =========================================================
   PROFILE TABS
   ========================================================= */

const profileTabs = document.querySelectorAll(".profile-tab");
const profileContents = document.querySelectorAll(".profile-tab-content");

profileTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = tab.dataset.tab;

        /* Remove active state */
        profileTabs.forEach((item) => {
            item.classList.remove("active");
        });

        profileContents.forEach((content) => {
            content.classList.remove("active");
        });

        /* Activate selected tab */
        tab.classList.add("active");

        const targetContent = document.getElementById(target);

        if (targetContent) {
            targetContent.classList.add("active");
        }
    });
});
