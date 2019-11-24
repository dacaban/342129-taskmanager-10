import {createBoardTemplate} from './components/board.js';
import {createFilterTemplate} from './components/filter.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createTaskTemplate} from './components/task.js';
import {createSiteMenuTemplate} from './components/site-menu.js';

const TASK_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createBoardTemplate());

const TaskListElement = siteMainElement.querySelector(`.board__tasks`);
render(TaskListElement, createTaskEditTemplate());

new Array(TASK_COUNT)
  .fill(``)
  .forEach(
      () => render(TaskListElement, createTaskTemplate())
  );

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createLoadMoreButtonTemplate());
