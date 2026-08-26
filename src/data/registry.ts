import type { CurriculumApp, Project } from "@/types";
import { siteConfig } from "@/lib/site-config";

/* ---------------------------------------------------------------------------
 * Operations registry — the single source of truth for every work item.
 * Every fact shown in the UI must originate here (Phase 8 §60–63).
 *
 * Truth rules:
 * - No metric without a verifiable source (resume / store listing / repo).
 * - No Play Store URL exists yet for JobTasker; the channel is stated as a
 *   fact, the hyperlink is omitted until the real listing URL is provided.
 * ------------------------------------------------------------------------ */

export const flagships: readonly Project[] = [
  {
    slug: "jobtasker",
    title: "JobTasker",
    status: "LIVE",
    origin: "PERSONAL PRODUCT",
    category: "PERSONAL",
    evidence: "FLAGSHIP",
    mission:
      "A productivity app that turns tasks and job applications into deliberate, tracked work, live on Google Play.",
    stack: ["FLUTTER", "DART", "MVVM", "CUBIT", "SQFLITE"],
    facts: [
      { label: "CHANNEL", value: "GOOGLE PLAY" },
      { label: "USERS", value: "LIVE" },
      { label: "MONITORING", value: "SENTRY" },
      { label: "UPDATES", value: "SHOREBIRD OTA" },
      { label: "OFFLINE", value: "FIRST" },
    ],
    media: [
      {
        src: "/images/work/jobtasker/tasks-view_webp.webp",
        alt: "JobTasker task list screen showing tracked tasks and their statuses",
        caption: "TASK VIEW / TRACKED WORK",
        kind: "IMAGE",
        width: 1080,
        height: 2340,
      },
      {
        src: "/images/work/jobtasker/focus-mode_webp.webp",
        alt: "JobTasker focus mode session screen",
        caption: "FOCUS MODE / DISTRACTION CONTROL",
        kind: "IMAGE",
        width: 1080,
        height: 2340,
      },
      {
        src: "/images/work/jobtasker/dashboard_webp.webp",
        alt: "JobTasker dashboard summarising completed tasks",
        caption: "DASHBOARD / PROGRESS AT A GLANCE",
        kind: "IMAGE",
        width: 1080,
        height: 2340,
      },
    ],
    mediaGroups: [
      {
        title: "Core flow",
        images: [
          {
            src: "/images/work/jobtasker/tasks-view_webp.webp",
            alt: "JobTasker task list screen showing tracked tasks and their statuses",
            caption: "TASK VIEW / TRACKED WORK",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/jobtasker/add-task_webp.webp",
            alt: "JobTasker add task screen",
            caption: "ADD TASK / CAPTURE INTENT",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/jobtasker/task-added_webp.webp",
            alt: "JobTasker confirmation after a task is created",
            caption: "TASK CREATED",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/jobtasker/focus-mode_webp.webp",
            alt: "JobTasker focus mode session screen",
            caption: "FOCUS MODE / DISTRACTION CONTROL",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
        ],
      },
      {
        title: "Job-application tracking",
        images: [
          {
            src: "/images/work/jobtasker/job-application-1_webp.webp",
            alt: "JobTasker job application form, step one",
            caption: "APPLICATION / DETAILS",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/jobtasker/job-application-2_webp.webp",
            alt: "JobTasker job application form, step two",
            caption: "APPLICATION / STATUS",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/jobtasker/dashboard_webp.webp",
            alt: "JobTasker dashboard summarising completed tasks",
            caption: "DASHBOARD / PROGRESS AT A GLANCE",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
        ],
      },
      {
        title: "Settings and support",
        images: [
          {
            src: "/images/work/jobtasker/settings_webp.webp",
            alt: "JobTasker settings screen in dark theme",
            caption: "SETTINGS / DARK THEME",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/jobtasker/language_webp.webp",
            alt: "JobTasker language selection screen",
            caption: "LOCALIZATION / LANGUAGE PICKER",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/jobtasker/faq_webp.webp",
            alt: "JobTasker FAQ screen in dark theme",
            caption: "SUPPORT / FAQ",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/jobtasker/share_webp.webp",
            alt: "JobTasker share app screen",
            caption: "SHARE / REACH",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
        ],
      },
    ],
    constraints: [
      { label: "PLATFORM", value: "ANDROID (GOOGLE PLAY)" },
      { label: "ARCHITECTURE", value: "MVVM + CUBIT" },
      { label: "CONNECTIVITY", value: "OFFLINE REQUIRED" },
      { label: "MONITORING", value: "SENTRY" },
      { label: "DELIVERY", value: "OTA VIA SHOREBIRD" },
    ],
    decisions: [
      {
        title: "Offline-first storage",
        body: "Every feature works against a local SQLite database. The network is an enhancement, never a dependency.",
        because:
          "A productivity tool that stops working when connectivity drops fails at exactly the moment it should be most useful. Sqflite keeps tasks, applications, and reminders usable anywhere.",
      },
      {
        title: "Production reliability loop",
        body: "Sentry watches for crashes, Shorebird ships code fixes over-the-air, OneSignal carries scheduled reminders, all wired before launch, not after the first incident.",
        because:
          "Shipping to a public store means owning the app after release. Instrumenting first turns user-facing failures into fixable events instead of silent churn.",
      },
      {
        title: "Dual-track model",
        body: "Tasks and job applications share one system: statuses, follow-ups, and focus sessions cover both hunting for work and doing it.",
        because:
          "The app was designed around how job seekers actually operate, tracking applications with the same discipline as daily work instead of forcing two separate tools.",
      },
    ],
    deployment: {
      facts: [
        { label: "CHANNEL", value: "GOOGLE PLAY" },
        { label: "PLATFORM", value: "ANDROID" },
        { label: "CRASH REPORTING", value: "SENTRY" },
        { label: "CODE UPDATES", value: "SHOREBIRD OTA" },
        { label: "PUSH + REMINDERS", value: "ONESIGNAL + LOCAL NOTIFICATIONS" },
      ],
      links: [
        {
          label: "SOURCE ↗",
          href: `${siteConfig.githubUrl}/Taskify-App`,
        },
      ],
    },
    currentState: {
      stampNote: "Live on Google Play with active users.",
      details: [
        { label: "STATUS", value: "PUBLISHED · GOOGLE PLAY" },
        { label: "MONITORING", value: "SENTRY ACTIVE" },
        { label: "UPDATE CHANNEL", value: "SHOREBIRD OTA" },
      ],
      lastReviewed: "2026-08",
    },
    featured: true,
    links: [{ label: "SOURCE ↗", href: `${siteConfig.githubUrl}/Taskify-App` }],
  },
  {
    slug: "marsa",
    title: "Marsa",
    status: "BUILDING",
    origin: "PERSONAL PRODUCT",
    category: "PERSONAL",
    evidence: "FLAGSHIP",
    mission:
      "A vacation-rental booking platform where guests discover units, book them in four guided steps, and pay through local rails.",
    currentPhase: "BOOKING & INSTAPAY RECEIPT FLOW",
    stack: ["FLUTTER", "CLEAN ARCHITECTURE", "CUBIT", "DIO"],
    facts: [
      { label: "ARCHITECTURE", value: "CLEAN" },
      { label: "STATE", value: "CUBIT" },
      { label: "NETWORK", value: "DIO" },
      { label: "UPDATES", value: "SHOREBIRD OTA" },
      { label: "THEMING", value: "LIGHT / DARK" },
    ],
    media: [
      {
        src: "/images/work/marsa/unit-details-light_webp.webp",
        alt: "Marsa unit detail screen in light theme showing photos and booking entry point",
        caption: "UNIT DETAILS / LIGHT THEME",
        kind: "IMAGE",
        width: 1080,
        height: 2340,
      },
      {
        src: "/images/work/marsa/unit-details-dark_webp.webp",
        alt: "Marsa unit detail screen in dark theme",
        caption: "UNIT DETAILS / DARK THEME",
        kind: "IMAGE",
        width: 1080,
        height: 2340,
      },
      {
        src: "/images/work/marsa/payment-light_webp.webp",
        alt: "Marsa payment step of the booking flow with receipt upload",
        caption: "BOOKING STEP 3 / PAYMENT + RECEIPT",
        kind: "IMAGE",
        width: 1080,
        height: 2340,
      },
    ],
    mediaGroups: [
      {
        title: "Discovery",
        images: [
          {
            src: "/images/work/marsa/home-light_webp.webp",
            alt: "Marsa home screen in light theme",
            caption: "HOME / LIGHT THEME",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/marsa/filters-light_webp.webp",
            alt: "Marsa smart filtering screen",
            caption: "FILTERS / SMART SEARCH",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/marsa/unit-details-light_webp.webp",
            alt: "Marsa unit detail screen in light theme showing photos and booking entry point",
            caption: "UNIT DETAILS / LIGHT THEME",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/marsa/unit-details-dark_webp.webp",
            alt: "Marsa unit detail screen in dark theme",
            caption: "UNIT DETAILS / DARK THEME",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
        ],
      },
      {
        title: "Booking flow",
        images: [
          {
            src: "/images/work/marsa/booking-dates-light_webp.webp",
            alt: "Marsa date selection step of the booking flow",
            caption: "BOOKING STEP 1 / DATES",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/marsa/booking-summary-light_webp.webp",
            alt: "Marsa booking summary step",
            caption: "BOOKING STEP 2 / SUMMARY",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/marsa/payment-light_webp.webp",
            alt: "Marsa payment step of the booking flow with receipt upload",
            caption: "BOOKING STEP 3 / PAYMENT + RECEIPT",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
        ],
      },
      {
        title: "Account and preferences",
        images: [
          {
            src: "/images/work/marsa/auth-light_webp.webp",
            alt: "Marsa login screen in light theme",
            caption: "SIGN IN / LIGHT THEME",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/marsa/register-light_webp.webp",
            alt: "Marsa registration screen in light theme",
            caption: "REGISTRATION",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/marsa/profile-light_webp.webp",
            alt: "Marsa profile screen in light theme",
            caption: "PROFILE",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/marsa/theme-light_webp.webp",
            alt: "Marsa theme selection screen",
            caption: "THEME PREFERENCE",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/marsa/coupon-light_webp.webp",
            alt: "Marsa coupon screen",
            caption: "COUPONS",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/marsa/favorites-dark_webp.webp",
            alt: "Marsa favorites screen in dark theme",
            caption: "FAVORITES / DARK THEME",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
        ],
      },
    ],
    constraints: [
      { label: "ARCHITECTURE", value: "CLEAN ARCHITECTURE" },
      { label: "PAYMENTS", value: "INSTAPAY / WALLET + RECEIPT UPLOAD" },
      { label: "STATE DEPTH", value: "4-STEP BOOKING FLOW" },
      { label: "SECURITY", value: "SECURE TOKEN STORAGE" },
      { label: "DELIVERY", value: "OTA VIA SHOREBIRD" },
    ],
    decisions: [
      {
        title: "Clean Architecture from day one",
        body: "Domain, data, and presentation layers are separated behind repository interfaces; Cubit drives each booking step independently.",
        because:
          "Booking flows mutate constantly: payment providers change, rules get added. Layer isolation means those changes stay inside one layer instead of rippling through the app.",
      },
      {
        title: "Centralised API error handling",
        body: "A single Dio interceptor maps network, auth, and server failures into typed outcomes the UI can present consistently.",
        because:
          "Four sequential steps multiply failure points. One translation layer keeps every step's error state predictable instead of five ad-hoc implementations.",
      },
      {
        title: "Receipt-based local payments",
        body: "The payment step supports InstaPay and wallet transfers with an in-app receipt upload feeding the reservation's status track.",
        because:
          "Local rental markets run on manual transfer rails. Meeting users on InstaPay, with proof attached, removes the trust gap a card-only flow would create.",
      },
    ],
    deployment: {
      facts: [
        { label: "STATUS", value: "IN ACTIVE DEVELOPMENT" },
        { label: "UPDATES", value: "SHOREBIRD OTA DURING BUILD-OUT" },
        { label: "THEME COVERAGE", value: "FULL LIGHT / DARK" },
      ],
      links: [],
    },
    currentState: {
      stampNote: "In development: booking and payment flow shipping now.",
      details: [
        { label: "CURRENT PHASE", value: "BOOKING & INSTAPAY RECEIPT FLOW" },
        { label: "ARCHITECTURE", value: "STABLE ACROSS FEATURES" },
        { label: "NEXT", value: "RESERVATION STATUS TRACKING POLISH" },
      ],
      lastReviewed: "2026-08",
    },
    featured: true,
    links: [],
  },
  {
    slug: "quran-cuts",
    title: "Quran Cuts",
    status: "DELIVERED",
    origin: "PERSONAL PRODUCT",
    category: "PERSONAL",
    evidence: "FLAGSHIP",
    mission:
      "An on-device generator that turns Quran verses into shareable vertical video clips: text, recitation, and template composed entirely on the phone.",
    stack: ["FLUTTER", "FFMPEG", "HIVE", "GETIT"],
    facts: [
      { label: "ENGINE", value: "FFMPEG" },
      { label: "PROCESSING", value: "ON-DEVICE" },
      { label: "OUTPUT", value: "9:16 MP4 · 720P" },
      { label: "FLOW", value: "7 STEPS" },
      { label: "STORAGE", value: "HIVE" },
    ],
    media: [
      {
        src: "/images/work/quran-cuts/home-light_webp.webp",
        alt: "Quran Cuts home screen listing previous generated clips",
        caption: "HOME / CLIP LIBRARY",
        kind: "IMAGE",
        width: 1080,
        height: 2340,
      },
      {
        src: "/images/work/quran-cuts/preview-light_webp.webp",
        alt: "Quran Cuts preview screen playing a generated reel before export",
        caption: "PREVIEW / BEFORE EXPORT",
        kind: "IMAGE",
        width: 1080,
        height: 2340,
      },
      {
        src: "/images/work/quran-cuts/generation-light_webp.webp",
        alt: "Quran Cuts generation progress screen while FFmpeg renders the clip",
        caption: "GENERATION / ON-DEVICE RENDER",
        kind: "IMAGE",
        width: 1080,
        height: 2340,
      },
    ],
    mediaGroups: [
      {
        title: "Creation flow",
        images: [
          {
            src: "/images/work/quran-cuts/surah-light_webp.webp",
            alt: "Quran Cuts surah selection screen",
            caption: "STEP 1 / SURAH SELECTION",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/quran-cuts/ayah-light_webp.webp",
            alt: "Quran Cuts ayah range selection screen",
            caption: "STEP 2 / AYAH RANGE",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/quran-cuts/reciter-light_webp.webp",
            alt: "Quran Cuts reciter selection screen",
            caption: "STEP 3 / RECITER",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/quran-cuts/template-light_webp.webp",
            alt: "Quran Cuts visual template selection screen",
            caption: "STEP 4 / TEMPLATE",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
        ],
      },
      {
        title: "Generation and result",
        images: [
          {
            src: "/images/work/quran-cuts/generation-light_webp.webp",
            alt: "Quran Cuts generation progress screen while FFmpeg renders the clip",
            caption: "GENERATION / ON-DEVICE RENDER",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/quran-cuts/preview-light_webp.webp",
            alt: "Quran Cuts preview screen playing a generated reel before export",
            caption: "PREVIEW / BEFORE EXPORT",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/quran-cuts/done-light_webp.webp",
            alt: "Quran Cuts completion screen after export",
            caption: "EXPORT COMPLETE",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
          {
            src: "/images/work/quran-cuts/home-light_webp.webp",
            alt: "Quran Cuts home screen listing previous generated clips",
            caption: "HOME / CLIP LIBRARY",
            kind: "IMAGE",
            width: 1080,
            height: 2340,
          },
        ],
      },
    ],
    constraints: [
      { label: "PROCESSING", value: "ON-DEVICE ONLY" },
      { label: "TEXT", value: "ARABIC AYAH WRAPPING" },
      { label: "AUDIO", value: "RECITER SELECTION PER CLIP" },
      { label: "OUTPUT", value: "720P VERTICAL MP4" },
      { label: "CREATION FLOW", value: "7 GUIDED STEPS" },
    ],
    decisions: [
      {
        title: "On-device rendering",
        body: "FFmpeg composes ayah text, reciter audio, and the chosen template into the final MP4 locally. No server touches the content.",
        because:
          "Religious content carries a privacy expectation cloud services routinely break. Local processing also means generation works offline and costs nothing per render.",
      },
      {
        title: "Arabic-first typography pipeline",
        body: "Verse wrapping and glyph shaping were tuned specifically for Arabic text over templated backgrounds at export resolution.",
        because:
          "Default text layout breaks Arabic line boundaries, producing clipped or awkwardly joined verses. Correct rendering is the difference between usable output and unreadable output.",
      },
      {
        title: "Guided seven-step creation",
        body: "Surah → ayah range → reciter → template → preview → export, with MVVM + Cubit isolating each step and GetIt wiring dependencies.",
        because:
          "Media generation has many degrees of freedom. A linear guided flow keeps the tool approachable while the architecture keeps each step independently testable.",
      },
    ],
    deployment: {
      facts: [
        { label: "COMPLETED", value: "APR 2026" },
        { label: "RENDER ENGINE", value: "MOBILE FFmpeg BUILD" },
        { label: "OUTPUT TARGET", value: "SHARE SHEET / GALLERY" },
      ],
      links: [
        { label: "SOURCE ↗", href: `${siteConfig.githubUrl}/Quran-Cuts-App` },
      ],
    },
    currentState: {
      stampNote: "Feature-complete build delivered April 2026.",
      details: [
        { label: "BUILD", value: "COMPLETE" },
        { label: "PIPELINE", value: "TEXT + AUDIO + TEMPLATE → 9:16 MP4" },
      ],
      lastReviewed: "2026-08",
    },
    featured: true,
    links: [
      { label: "SOURCE ↗", href: `${siteConfig.githubUrl}/Quran-Cuts-App` },
    ],
  },
  {
    slug: "mothooq",
    title: "Mothooq",
    status: "DELIVERED",
    origin: "CLIENT ENGAGEMENT",
    category: "PERSONAL",
    evidence: "FLAGSHIP",
    mission:
      "A used-car marketplace where every listing follows a mandatory inspection at a partner service center. Built as a client engagement and shipped as an MVP in two weeks.",
    stack: ["FLUTTER", "FIREBASE AUTH", "REALTIME DATABASE", "BLOC"],
    facts: [
      { label: "TIMELINE", value: "14 DAYS TO MVP" },
      { label: "CLIENT", value: "MARKETPLACE" },
      { label: "AUTH", value: "GOOGLE / FACEBOOK SIGN-IN" },
      { label: "DATABASE", value: "FIREBASE REALTIME DB" },
      { label: "ROLES", value: "USER / SERVICE CENTER" },
    ],
    media: [
      {
        src: "/images/mothooq_shots/car_details_shots_webp.webp",
        alt: "Mothooq car detail screens with inspection-backed listing information",
        caption: "CAR DETAILS / INSPECTION-BACKED LISTINGS",
        kind: "IMAGE",
        width: 1600,
        height: 900,
      },
      {
        src: "/images/mothooq_shots/services_shots_webp.webp",
        alt: "Mothooq service center screens for the partner role",
        caption: "SERVICE CENTER / PARTNER ROLE",
        kind: "IMAGE",
        width: 1600,
        height: 900,
      },
      {
        src: "/images/mothooq_shots/sell_car-shots_webp.webp",
        alt: "Mothooq sell-a-car submission screens",
        caption: "SELLING / LISTING SUBMISSION",
        kind: "IMAGE",
        width: 1600,
        height: 900,
      },
    ],
    mediaGroups: [
      {
        title: "Marketplace",
        images: [
          {
            src: "/images/mothooq_shots/home_shots_webp.webp",
            alt: "Mothooq marketplace home screens",
            caption: "HOME / MARKETPLACE",
            kind: "IMAGE",
            width: 1920,
            height: 1440,
          },
          {
            src: "/images/mothooq_shots/car_details_shots_webp.webp",
            alt: "Mothooq car detail screens with inspection-backed listing information",
            caption: "CAR DETAILS / INSPECTION-BACKED LISTINGS",
            kind: "IMAGE",
            width: 1920,
            height: 1440,
          },
          {
            src: "/images/mothooq_shots/apply_order_shots_webp.webp",
            alt: "Mothooq apply-to-order screens",
            caption: "APPLY ORDER / BUYER FLOW",
            kind: "IMAGE",
            width: 1920,
            height: 1440,
          },
        ],
      },
      {
        title: "Selling and service centers",
        images: [
          {
            src: "/images/mothooq_shots/sell_car-shots_webp.webp",
            alt: "Mothooq sell-a-car submission screens",
            caption: "SELLING / LISTING SUBMISSION",
            kind: "IMAGE",
            width: 1920,
            height: 1440,
          },
          {
            src: "/images/mothooq_shots/services_shots_webp.webp",
            alt: "Mothooq service center screens for the partner role",
            caption: "SERVICE CENTER / PARTNER ROLE",
            kind: "IMAGE",
            width: 1920,
            height: 1440,
          },
          {
            src: "/images/mothooq_shots/my_cars_shots_webp.webp",
            alt: "Mothooq my-cars screens for vehicle owners",
            caption: "MY CARS / OWNER VIEW",
            kind: "IMAGE",
            width: 1920,
            height: 1440,
          },
        ],
      },
      {
        title: "Account",
        images: [
          {
            src: "/images/mothooq_shots/auth_shots_webp.webp",
            alt: "Mothooq authentication screens with Google and Facebook sign-in",
            caption: "AUTH / GOOGLE + FACEBOOK",
            kind: "IMAGE",
            width: 1920,
            height: 1440,
          },
        ],
      },
    ],
    constraints: [
      { label: "DEADLINE", value: "2 WEEKS TO MVP" },
      { label: "ROLES", value: "BUYERS + PARTNER SERVICE CENTERS" },
      { label: "LISTING RULE", value: "MANDATORY INSPECTION FIRST" },
      { label: "SIGN-IN", value: "GOOGLE + FACEBOOK" },
      { label: "BACKEND", value: "FIREBASE REALTIME DB" },
    ],
    decisions: [
      {
        title: "Role-based access as a core rule",
        body: "Buyers browse and buy; service centers inspect and clear vehicles. Permissions are enforced by role, not by interface hints.",
        because:
          "The marketplace's entire promise is inspection-backed listings. Making the service center a first-class role, not an admin afterthought, which is what makes that promise enforceable.",
      },
      {
        title: "Firebase Realtime Database",
        body: "Listings, appointments, and status changes sync through Firebase's realtime layer rather than a custom backend.",
        because:
          "A two-week MVP cannot carry backend construction. Realtime sync matched the domain of auction-style listing states and let all engineering time go to the experience.",
      },
      {
        title: "BLoC under deadline pressure",
        body: "State management was structured with BLoc from the first commit despite the compressed timeline.",
        because:
          "Deadline pressure is when architecture usually dies. Keeping BLoC discipline meant the post-MVP update phase could build on the codebase instead of rewriting it.",
      },
    ],
    deployment: {
      facts: [
        { label: "DELIVERED", value: "MARCH 2025" },
        { label: "SCOPE", value: "MVP + UPDATE PLAN" },
        { label: "AUTH PROVIDERS", value: "GOOGLE · FACEBOOK" },
      ],
      links: [
        {
          label: "APP FILES ↗",
          href: "https://drive.google.com/drive/folders/1IYZBUvbWJ6e18FKV7sm7NFvf_nKkDbiT?usp=drive_link",
        },
      ],
    },
    currentState: {
      stampNote:
        "Delivered to the client March 2025 with a planned update phase.",
      details: [
        { label: "HANDOFF", value: "COMPLETE" },
        { label: "ENGAGEMENT TYPE", value: "PAID FREELANCE MVP" },
      ],
      lastReviewed: "2026-08",
    },
    featured: true,
    links: [
      {
        label: "APP FILES ↗",
        href: "https://drive.google.com/drive/folders/1IYZBUvbWJ6e18FKV7sm7NFvf_nKkDbiT?usp=drive_link",
      },
    ],
  },
] as const;

/* ---------------------------------------------------------------------------
 * Selected personal work + NTI curriculum projects.
 * Sparse by design: only verified facts (Phase 14B section 1).
 * Chatbot/Bookly descriptions come from the owner's earlier portfolio copy.
 * PlayZone has no documentation yet and is represented as such.
 * ------------------------------------------------------------------------ */
export const selectedProjects: readonly Project[] = [
  {
    slug: "bidmart",
    title: "BidMart",
    status: "DELIVERED",
    origin: "GRADUATION PROJECT",
    category: "PERSONAL",
    evidence: "SELECTED",
    mission:
      "A real-time auction platform with live bidding, dynamic price updates, seller-side product management, and an integrated payment flow.",
    stack: ["FLUTTER", "CLEAN ARCHITECTURE", "REST API", "FCM"],
    facts: [
      { label: "BIDDING", value: "REAL-TIME" },
      { label: "PAYMENTS", value: "INTEGRATED" },
      { label: "ALERTS", value: "FCM" },
      { label: "PERIOD", value: "DEC 2024 - JUL 2025" },
    ],
    media: [
      {
        src: "/images/work/bidmart/home_webp.webp",
        alt: "BidMart auction home screen showing live listings",
        caption: "HOME / LIVE AUCTION LISTINGS",
        kind: "IMAGE",
        width: 1920,
        height: 1440,
      },
      {
        src: "/images/work/bidmart/product-detail_webp.webp",
        alt: "BidMart product detail screen with bidding interface",
        caption: "PRODUCT DETAIL / BIDDING",
        kind: "IMAGE",
        width: 1920,
        height: 1440,
      },
      {
        src: "/images/work/bidmart/payment-flow_webp.webp",
        alt: "BidMart payment flow screen",
        caption: "PAYMENT FLOW",
        kind: "IMAGE",
        width: 1920,
        height: 1280,
      },
    ],
    mediaGroups: [
      {
        title: "Browsing and bidding",
        images: [
          {
            src: "/images/work/bidmart/home_webp.webp",
            alt: "BidMart auction home screen showing live listings",
            caption: "HOME / LIVE AUCTION LISTINGS",
            kind: "IMAGE",
            width: 1920,
            height: 1440,
          },
          {
            src: "/images/work/bidmart/product-detail_webp.webp",
            alt: "BidMart product detail screen with bidding interface",
            caption: "PRODUCT DETAIL / BIDDING",
            kind: "IMAGE",
            width: 1920,
            height: 1440,
          },
          {
            src: "/images/work/bidmart/payment-flow_webp.webp",
            alt: "BidMart payment flow screen",
            caption: "PAYMENT FLOW",
            kind: "IMAGE",
            width: 1920,
            height: 1280,
          },
        ],
      },
      {
        title: "Selling",
        images: [
          {
            src: "/images/work/bidmart/add-product_webp.webp",
            alt: "BidMart add product screen for sellers",
            caption: "SELLING / NEW LISTING",
            kind: "IMAGE",
            width: 1920,
            height: 1280,
          },
          {
            src: "/images/work/bidmart/user-products_webp.webp",
            alt: "BidMart seller product management screen",
            caption: "SELLER DASHBOARD / OWNED LISTINGS",
            kind: "IMAGE",
            width: 1920,
            height: 1440,
          },
          {
            src: "/images/work/bidmart/notifications_webp.webp",
            alt: "BidMart notifications screen with bidding alerts",
            caption: "NOTIFICATIONS / BIDDING ALERTS",
            kind: "IMAGE",
            width: 1920,
            height: 1280,
          },
        ],
      },
      {
        title: "Entry",
        images: [
          {
            src: "/images/work/bidmart/onboarding_webp.webp",
            alt: "BidMart onboarding screens",
            caption: "ONBOARDING",
            kind: "IMAGE",
            width: 1920,
            height: 1280,
          },
        ],
      },
    ],
    links: [],
    featured: false,
  },
  {
    slug: "chatbot-app",
    title: "Chatbot App",
    origin: "PERSONAL PRODUCT",
    category: "PERSONAL",
    evidence: "SELECTED",
    mission:
      "A bilingual AI chat assistant with Arabic/English support, Firebase sign-in, and persisted user preferences.",
    stack: ["FLUTTER", "GEMINI AI", "FIREBASE AUTH", "BLOC"],
    facts: [
      { label: "LANGUAGES", value: "AR / EN" },
      { label: "AI ENGINE", value: "GEMINI" },
      { label: "AUTH", value: "FIREBASE" },
    ],
    media: [
      {
        src: "/images/work/chatbot/onboarding_webp.webp",
        alt: "Chatbot app onboarding screens collage",
        caption: "ONBOARDING / FIRST RUN",
        kind: "IMAGE",
        width: 3600,
        height: 2700,
      },
      {
        src: "/images/work/chatbot/auth_webp.webp",
        alt: "Chatbot app authentication screens collage",
        caption: "AUTHENTICATION",
        kind: "IMAGE",
        width: 3600,
        height: 2700,
      },
    ],
    links: [{ label: "SOURCE ↗", href: `${siteConfig.githubUrl}/chatbot-app` }],
    featured: false,
  },
  {
    slug: "bookly",
    title: "Bookly",
    origin: "PERSONAL PRODUCT",
    category: "PERSONAL",
    evidence: "LIMITED",
    mission:
      "A book discovery application consuming REST APIs, with custom browsing animations.",
    stack: ["FLUTTER", "REST API"],
    facts: [{ label: "DATA", value: "REST API" }],
    media: [
      {
        src: "/images/work/bookly/library-collage_webp.webp",
        alt: "Bookly app screen collage showing the book browsing experience",
        caption: "BOOK DISCOVERY / SCREEN COLLAGE",
        kind: "IMAGE",
        width: 3600,
        height: 2700,
      },
    ],
    links: [{ label: "SOURCE ↗", href: `${siteConfig.githubUrl}/Bookly-App` }],
    featured: false,
  },
  {
    slug: "playzone",
    title: "PlayZone",
    origin: "PERSONAL PRODUCT",
    category: "PERSONAL",
    evidence: "LIMITED",
    stack: [],
    facts: [{ label: "DOCUMENTATION", value: "PENDING" }],
    media: [
      {
        src: "/images/work/playzone/playzone_webp.webp",
        alt: "PlayZone app screenshot",
        caption: "AVAILABLE EVIDENCE / SINGLE CAPTURE",
        kind: "IMAGE",
        width: 1920,
        height: 1280,
      },
    ],
    links: [],
    featured: false,
  },
] as const;

const curriculumApps: readonly CurriculumApp[] = [
  { slug: "nti-bmi", index: "01", title: "BMI App" },
  { slug: "nti-ecommerce", index: "02", title: "E Commerce App" },
  { slug: "nti-yummy", index: "03", title: "Yummy App" },
  { slug: "nti-news", index: "04", title: "News App" },
  { slug: "nti-localdb", index: "05", title: "Local DB App" },
  { slug: "nti-social", index: "06", title: "Social Media App" },
] as const;

function ntiMedia(slug: string): Project["media"] {
  switch (slug) {
    case "nti-bmi":
      return [
        {
          src: "/images/work/nti-bmi/bmi-collage_webp.webp",
          alt: "BMI App screen collage",
          caption: "SCREEN COLLAGE",
          kind: "IMAGE",
          width: 1920,
          height: 1920,
        },
      ];
    case "nti-ecommerce":
      return [
        {
          src: "/images/work/nti-ecommerce/store-collage_webp.webp",
          alt: "E Commerce App screen collage",
          caption: "SCREEN COLLAGE",
          kind: "IMAGE",
          width: 1920,
          height: 1440,
        },
      ];
    case "nti-yummy":
      return [
        {
          src: "/images/work/nti-yummy/recipe-screen_webp.webp",
          alt: "Yummy App content screen",
          caption: "CONTENT SCREEN",
          kind: "IMAGE",
          width: 1080,
          height: 2424,
        },
      ];
    case "nti-news":
      return [
        {
          src: "/images/work/nti-news/news-home_webp.webp",
          alt: "News App home screen",
          caption: "HOME / HEADLINES",
          kind: "IMAGE",
          width: 1920,
          height: 1280,
        },
      ];
    case "nti-localdb":
      return [
        {
          src: "/images/work/nti-localdb/local-db-screen_webp.webp",
          alt: "Local DB App screen showing persisted records",
          caption: "PERSISTED RECORDS",
          kind: "IMAGE",
          width: 1080,
          height: 2424,
        },
      ];
    default:
      return [
        {
          src: "/images/work/nti-social/feed-screen_webp.webp",
          alt: "Social Media App feed screen",
          caption: "FEED SCREEN",
          kind: "IMAGE",
          width: 1080,
          height: 2424,
        },
      ];
  }
}

export const ntiProjects: readonly Project[] = curriculumApps.map(
  (app): Project => ({
    slug: app.slug,
    title: app.title,
    status: "CURRICULUM",
    origin: "NTI CURRICULUM",
    category: "NTI",
    evidence: "LIMITED",
    mission:
      "Individual training project completed during the NTI Flutter track at Creativa Mansoura.",
    stack: ["FLUTTER", "DART"],
    facts: [{ label: "PROGRAM", value: "NTI FLUTTER TRACK" }],
    media: ntiMedia(app.slug),
    links: [],
    featured: false,
  }),
);

/** All 14 registry entries in presentation order. */
export const allProjects: readonly Project[] = [
  ...flagships,
  ...selectedProjects,
  ...ntiProjects,
];

/** Derived counts - never hardcode these numbers in components. */
export const projectCounts = {
  total: allProjects.length,
  personal: allProjects.filter((p) => p.category === "PERSONAL").length,
  nti: allProjects.filter((p) => p.category === "NTI").length,
  flagship: flagships.length,
} as const;

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return allProjects.map((project) => project.slug);
}

/** Hero registry entries — the subset shown in the operator's console. */
export function getHeroRegistry() {
  return [
    { slug: "jobtasker", anchor: "#work" },
    { slug: "marsa", anchor: "#work" },
  ].map(({ slug, anchor }) => ({
    project: getProjectBySlug(slug) as Project,
    anchor,
  }));
}
