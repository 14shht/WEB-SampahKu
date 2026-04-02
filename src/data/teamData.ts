export type TeamMember = {
  name: string;
  role: string;
  image: string;
};

const teamData: TeamMember[] = [
  {
    name: "Gede Oke",
    role: "Machine Learning Engineer",
    image: "/images/Gede Oke.png",
  },
  {
    name: "Adit",
    role: "Machine Learning Engineer",
    image: "/images/Aditya.png",
  },
  {
    name: "Faiq",
    role: "Full Stack Developer",
    image: "/images/faiq.png",
  },
  {
    name: "Muhammad Qurtubi",
    role: "Full Stack Developer",
    image: "/images/qurtubi.jpeg",
  },
];

export default teamData;
