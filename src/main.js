import BoardComponent from './components/board.js';
import BoardController from "./controllers/board";
import FilterController from './controllers/filter.js';
import SiteMenuComponent from './components/site-menu.js';
import Tasks from './models/tasks';
import {generateTasks} from './mock/task.js';
import {render, RenderPosition} from "./utils/render";

const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuComponent();

siteMenuComponent.getElement().querySelector(`.control__label--new-task`)
  .addEventListener(`click`, () => {
    boardController.createTask();
  });

render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
const tasks = generateTasks(TASK_COUNT);
const tasksModel = new Tasks();
tasksModel.setTasks(tasks);

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel);
boardController.render();

render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
