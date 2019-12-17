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
import {render, RenderPosition} from "./utils";

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
  const replaceEditToTask = () => tasksComponent.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  const replaceTaskToEdit = () => tasksComponent.getElement().replaceChild(taskEditComponent.getElement(), taskComponent.getElement());

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
  render(tasksComponent.getElement(), taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {
  const isAllTasksArchived = tasks.every((task) => task.isArchive);
  if (isAllTasksArchived) {
    render(boardComponent.getElement(), new NoTasksComponent().getElement(), RenderPosition.BEFOREEND);
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
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    });

    render(boardComponent.getElement(), new SortComponent().getElement(), RenderPosition.BEFOREEND);
    render(boardComponent.getElement(), tasksComponent.getElement(), RenderPosition.BEFOREEND);
    render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
  }
  render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.main__control`);
const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);
const boardComponent = new BoardComponent();
const tasksComponent = new TasksComponent();

render(siteHeaderElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
renderBoard(boardComponent, tasks);
