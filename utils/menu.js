import { list, check, todo, home } from "./Icons";

const menu = [
  {
    id: 1,
    title: "All Tasks",
    icon: home,
    link: "/",
  },
  {
    id: 2,
    title: "Important!",
    icon: list,
    link: "/components/important",
  },
  {
    id: 3,
    title: "Completed!",
    icon: check,
    link: "/components/completed",
  },
  {
    id: 4,
    title: "Do It Now",
    icon: todo,
    link: "/components/incomplete",
  },
];

export default menu;
