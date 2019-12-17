import AbstractComponent from "./abstract-component";

const createTasksTemplate = () => (
  `<div class="board__tasks"></div>`
);

export default class Tasks extends AbstractComponent {
  getTemplate() {
    return createTasksTemplate();
  }
}
