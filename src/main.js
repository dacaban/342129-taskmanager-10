import BoardComponent from './components/board.js';
import BoardController from "./controllers/board";
import FilterComponent from './components/filter.js';
import SiteMenuComponent from './components/site-menu.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition} from "./utils/render";

const TASK_COUNT = 22;

const siteHeaderElement = document.querySelector(`.main__control`);
render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);

const filters = generateFilters();
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);
const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent);
boardController.render(tasks);

render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
