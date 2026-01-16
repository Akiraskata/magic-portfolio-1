import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Akira",
  lastName: "Kata",
  name: `AKIRA KATA`,
  role: "Design Engineer",
  avatar: "/images/avatar.jpg",
  email: "info@akirakata.com",
  location: "Asia/Tokyo", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Japanese","Chinese"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>{person.firstName}のニュースレターを購読する</>,
  description: <>創造性とエンジニアリングについて、毎週発信しています。</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  // {
  //   name: "GitHub",
  //   icon: "github",
  //   link: "https://github.com/once-ui-system",
  //   essential: true,
  // },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/company/akiraskata/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/akiraskata/",
    essential: false,
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@akiraskata",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "ホーム",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>学びながら、つくる</>,
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">個人プロジェクト</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          主な制作実績
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      東京を拠点に、 <Text as="span" size="xl" weight="strong">Web技術を学びながら開発しています</Text>, <br /> 小さなプロジェクトを通して、経験を積んでいます。
</>
  ),
};

const about: About = {
  path: "/about",
  label: "自己紹介",
  title: `Welcome to ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: true,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
        <>
          <em>学びながら、つくる。</em>
          <em>— This is a new chapter.</em>
          <br />
          こんにちは、方晶です。東京を拠点に活動するデザインエンジニアで、現在はフルスタック開発を中心にWeb技術を学んでいます。
          <br /><br />
          小さなプロジェクトを通して実践的なスキルを身につけながら、設計と実装の両面から価値のあるものづくりを目指しています。
          <br /><br />
          日常では読書や写真撮影、音楽を楽しみながら、YouTubeを活用して技術やデザインに関する情報収集も行っています。
        </> ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "貿易向けソフトウェア会社",
        timeframe: "2021",
        role: "ソフトウェア営業",
        achievements: [
          <>貿易関連ソフトウェアの営業業務を担当し、顧客対応および要件ヒアリングを行いました。</>,
          <>顧客の業務内容を理解し、システム導入や利用のサポートを行いました。</>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "アプリ",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "デザインスタジオ / フリーランス",
        timeframe: "2018",
        role: "グラフィックデザイナー",
        achievements: [
          <>ポスターや販促物などの平面デザイン制作を担当しました。</>,
          <>視覚表現やユーザー目線のデザイン感覚を身につけました。</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "国際工科専門学校",
        description: <>2023年より日本語の学習を開始し、日常会話および専門用語の理解力向上に取り組んでいます。</>,
      },
      {
        name: "白荻学園",
        description: <>2025年より在学中。IT情報分野を専攻し、ソフトウェア開発および全栈技術を学んでいます。</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "バックエンド開発",
        description: (
          <>JavaおよびSpring Bootを使用したバックエンド開発を学習し、REST APIの構築に取り組んでいます。</>
        ),
        tags: [
          { name: "Vue.js" },
          { name: "React" },
          { name: "JavaScript"
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "データベース / フルスタック",
        description:  <>データベース設計の基礎を学び、フロントエンドとバックエンドを連携させた全栈開発を学習中です。</>,

        tags: [
          {
            name: "Database" },
          { name: "Full Stack" },

        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "ブログ",
  title: "Design & Tech の記録",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "制作実績",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "ギャラリー",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
