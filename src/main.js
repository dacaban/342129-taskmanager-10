import BoardComponent from './components/board.js';
import SortComponent from "./components/sort";
import FilterComponent from './components/filter.js';
import LoadMoreButtonComponent from './components/load-more-button.js';
import TaskEditComponent from './components/task-edit.js';
import TaskComponent from './components/task.js';
import TasksComponent from "./components/tasks";
import NoTasksComponent from "./components/no-tasks";
import SiteMenuComponent from './components/site-menu.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {render, remove, replace, RenderPosition} from "./utils/render";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  const replaceEditToTask = () => replace(taskComponent, taskEditComponent);
  const replaceTaskToEdit = () => replace(taskEditComponent, taskComponent);

  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);

  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  render(tasksComponent.getElement(), taskComponent, RenderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {
  const isAllTasksArchived = tasks.every((task) => task.isArchive);
  if (isAllTasksArchived) {
    render(boardComponent.getElement(), new NoTasksComponent(), RenderPosition.BEFOREEND);
  } else {
    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    tasks
      .slice(0, showingTasksCount)
      .forEach(
          (task) => renderTask(tasksComponent.getElement(), task)
      );

    const loadMoreButtonComponent = new LoadMoreButtonComponent();

    loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      tasks
        .slice(prevTasksCount, showingTasksCount)
        .forEach((task) => renderTask(tasksComponent.getElement(), task));

      if (showingTasksCount >= tasks.length) {
        remove(loadMoreButtonComponent);
      }
    });

    render(boardComponent.getElement(), new SortComponent(), RenderPosition.BEFOREEND);
    render(boardComponent.getElement(), tasksComponent, RenderPosition.BEFOREEND);
    render(boardComponent.getElement(), loadMoreButtonComponent, RenderPosition.BEFOREEND);
  }
  render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.main__control`);
const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);
const boardComponent = new BoardComponent();
const tasksComponent = new TasksComponent();

render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);
renderBoard(boardComponent, tasks);
