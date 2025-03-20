import p1 from "../assets/images/bonsaiworld.jpg";
import p2 from "../assets/images/blome.jpg";
import p3 from "../assets/images/p3.png";
import p4 from "../assets/images/p4.png";
import p5 from "../assets/images/p5.png";
import p6 from "../assets/images/p6.png";
import p7 from "../assets/images/p7.gif";
import p8 from "../assets/images/p8.png";
import p9 from "../assets/images/p9.png";
import p10 from "../assets/images/p11.gif";

export const projectData = [
  {
    id: "myModal1",
    title: "Bonsaiworld",
    image: p1,
    description: "a Small layout example within the orientational DCI corse, where i was able to express my love for the bonsai art.",
    links: {
      site: "https://bonsaiworld.netlify.app/",
      github: "https://github.com/k0miker/bonsaiworld"
    },
    modalContent: {
      type: "iframe",
      src: "https://bonsaiworld.netlify.app/"
    }
  },
  {
    id: "myModal4",
    title: "Marketing Campagne",
    image: p4,
    description: "A small layout example for a marketing campagne refered to the Bonasiworld",
    links: {
      site: "https://www.canva.com/design/DAGBc48w39w/bc-CJ_qwSN3KxtlTtbQlmg/view?utm_content=DAGBc48w39w&utm_campaign=designshare&utm_medium=link&utm_source=editor",
      github: "https://github.com/k0miker/"
    },
    modalContent: {
      type: "image",
      src: p4
    }
  },
  {
    id: "myModal2",
    title: "Firma Blome",
    image: p2,
    description: "A small web project for our family business at the time, created with WIX without significant prior knowledge.",
    links: {
      site: "https://k0mikerhdf.wixsite.com/blome"
    },
    modalContent: {
      type: "image",
      src: p2
    }
  },
  {
    id: "myModal5",
    title: "Industrieboden Meyer",
    image: p5,
    description: "A webproject i have translated from Typo3 into an Astro Project",
    links: {
      site: "https://www.industriebodenplanung.com/",
      github: "https://github.com/k0miker/"
    },
    modalContent: {
      type: "image",
      src: p5
    }
  },
  {
    id: "myModal7",
    title: "Starfield canvas",
    image: p7,
    description: "A small canvas excurse witch let to this",
    links: {
      site: "https://starfield-cb.netlify.app/",
      codepen: "https://codepen.io/k0miker/pen/wvLoevE",
      github: "https://github.com/k0miker/"
    },
    modalContent: {
      type: "image",
      src: p7
    }
  },
  {
    id: "myModal8",
    title: "Starfieldclash",
    image: p8,
    description: "A small canvas excurse witch let to this Game",
    links: {
      site: "https://k0miker.github.io/starfieldclash/",
      github: "https://github.com/k0miker/starfieldclash"
    },
    modalContent: {
      type: "image",
      src: p8
    }
  },
  {
    id: "myModal9",
    title: "Zombiland",
    image: null,
    video: "/zombi-island.mp4",
    description: "A canvas Game to become more comfortable with JavaScript",
    links: {
      site: "https://zombi-island.netlify.app/",
      github: "https://github.com/k0miker/vampire"
    },
    modalContent: {
      type: "video",
      src: "/zombi-island.mp4"
    }
  },
  {
    id: "myModal10",
    title: "DataGlobe",
    image: null,
    video: "/globe30-collon-480.mov",
    description: "My first React Project also trying three.js and big Data-Visualization",
    links: {
      site: "https://dataglobe.netlify.app/",
      github: "https://github.com/k0miker/project-dataglobe"
    },
    modalContent: {
      type: "iframe",
      src: "https://dataglobe.netlify.app/"
    }
  },
  {
    id: "myModal11",
    title: "BrokeChain",
    image: p10,
    description: "My first React Narive Project in typescript. A small trading demo app for crypto currencies.",
    links: {
      site: "https://broke.dev-space.vip",
      github: "https://github.com/k0miker/brokechain"
    },
    modalContent: {
      type: "responsiveFrame",
      src: "https://broke.dev-space.vip",
      fallbackImage: p10
    }
  }
];
