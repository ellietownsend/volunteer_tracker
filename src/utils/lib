export const classes = [
            "Math",
            "Computer Science",
            "AMC 8",
            "AMC 10",
            "Java",
            "Python",
            "Algebra 1",
            "Geometry",
            "Algebra 2 / Pre-Calculus",
            "Chemistry",
            "Introduction to Biology",
            "Physics"
            ];

export const personalInformation = [
        "email",
        "first_name",
        "last_name",
        "birthdate",
];

const milestones = [
    "hours",
    "anniversaries",
    "shifts",
]

export const organizationName = "Girls Who Math";

export const organizationMission = `
Girls Who Math — Inspiring the Next Generation of STEM Leaders

“Science is not a boy’s game, it’s not a girl’s game. It’s everyone’s game. It’s about where we are and where we’re going.”
— Nichelle Nichols, Former NASA Ambassador and Actress

Our Mission

At Girls Who Math, we believe that STEM should be fun, approachable, and accessible to everyone. Our mission is to break down economic and social barriers that prevent young women and gender minorities from pursuing opportunities in science, technology, engineering, and mathematics.

We work to create an inclusive environment where students of all backgrounds can explore their interests, build confidence, and envision themselves as future leaders in STEM.

What We Do

To support our mission, we provide:

Free one-on-one tutoring to help students strengthen their STEM skills
Small-group STEM classes that encourage collaboration and curiosity
Educational resources and mentorship beyond what some schools are able to provide
College, scholarship, and career guidance to help students access future opportunities
Community outreach and seminars that promote STEM education and challenge gender stereotypes
Why Our Work Matters

Although women perform at the same levels of achievement as their male counterparts in STEM classes, they continue to be underrepresented in STEM careers. Women make up only 26% of the STEM workforce, and many girls begin losing interest in STEM during middle school.

Girls Who Math works to change this by helping students maintain their passion for STEM, overcome barriers, and pursue technical careers with confidence. We also recognize that some communities face greater obstacles, which is why we collaborate with organizations such as the Black Student Fund and Latino Student Fund to expand access and support for students from historically underserved backgrounds.

Our Global Impact

Girls Who Math has built a worldwide community of students and volunteers dedicated to making STEM education more accessible.

Our impact includes:

🌎 Students from 32 countries across every continent except Antarctica
👩‍🏫 300+ volunteers supporting STEM education
⏰ 7,000+ hours of tutoring provided
📚 1,500+ hours of STEM classes taught across 10 subjects
🎓 850+ students currently enrolled in tutoring and/or classes
Our Vision

At Girls Who Math, we believe that talent exists everywhere—and opportunity should too. By providing free educational support, mentorship, and resources, we are working toward a future where women and gender minorities from every background can pursue and succeed in STEM.
`


export function normalizePersonalInformation(personalInfo){
    const formatted = personalInfo.replaceAll("_", " ");
    return formatted[0].toUpperCase() + formatted.slice(1);
}

export const roles = [
        "Tutor",
        "Curriculum",
        "Outreach",
        "Student Matching",
        "Program Operations",
    ];


export function isEqual(comp1, comp2){
    if(Array.isArray(comp1) && Array.isArray(comp2)){
        /* array comparion */
          return JSON.stringify(comp1) === JSON.stringify(comp2);
    }
    if(comp1){}
  
    return comp1 === comp2;
}