import AbstractComponent from "./abstract-component";

const createBoardTemplate = () => (
  `<section class="board container">
  </section>`
);

export default class Board extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}
