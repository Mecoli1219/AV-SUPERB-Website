export type ResearchType = {
  image: string,
  title: string,
  authors: {
    name: string,
    link?: string,
    me?: boolean,
  }[],
  link: string,
  journal: string,
  year: string,
  description: string,
  others: {
    "project page"?: string,
    arXiv?: string,
    video?: string,
    code?: string,
  },
}

type ResearchDataType = {
  interest: string[],
  researchList: ResearchType[],
}

const researchData: ResearchDataType = {
  interest: [
    "I have a keen interest in exploring various aspects of machine learning, such as natural language processing and reinforcement learning. Representative papers are highlighted.",
  ],
  researchList: [
    {
      image: "static/research/dbc.png",
      title: "Diffusion Model-Augmented Behavioral Cloning",
      link: "https://nturobotlearninglab.github.io/dbc/",
      authors: [
        {
          name: "Hsiang-Chun Wang*",
        },
        {
          name: "Shang-Fu Chen*",
        },
        {
          name: "Ming-Hao Hsu",
        },
        {
          name: "Chun-Mao Lai",
          link: "https://mecoli1219.github.io/",
          me: true,
        },
        {
          name: "Shao-Hua Sun",
          link: "https://shaohua0116.github.io/",
        },
      ],
      journal: "arXiv",
      year: "2023",
      description: "We propose a novel imitation learning method combining with diffusion model. We show that our method can achieve better performance than previous imitation learning methods.",
      others: {
        "project page": "https://nturobotlearninglab.github.io/dbc/",
        arXiv: "https://arxiv.org/abs/2302.13335",
      }
    },
    {
      image: "static/research/cuda-dst.png",
      title: "Controllable User Dialogue Act Augmentation for Dialogue State Tracking",
      link: "https:/Xi.org/abs/2106.01598",
      authors: [
        {
          name: "Chun-Mao Lai*",
          link: "https://mecoli1219.github.io/",
          me: true,
        },
        {
          name: "Ming-Hao Hsu*",
        },
        {
          name: "Chao-Wei Huang",
          link: "https://scholar.google.com/citations?user=nmsPLncAAAAJ",
        },
        {
          name: "Yun-Nung Chen",
          link: "https://www.csie.ntu.edu.tw/~yvchen/",
        },
      ],
      journal: "SIGDIAL",
      year: "2022",
      description: "We propose a data augmentation method for DST, which improve the state-of-the-art performance on MultiWOZ 2.1.",
      others: {
        arXiv: "https://arxiv.org/abs/2207.12757",
        code: "https://github.com/miulab/cuda-dst"
      }
    }
  ]
}

export default researchData;