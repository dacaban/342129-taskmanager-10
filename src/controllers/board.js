import {remove, render, RenderPosition, replace} from "../utils/render";
import TaskComponent from "../components/task";
import TaskEditComponent from "../components/task-edit";
import TasksComponent from "../components/tasks";
import NoTasksComponent from "../components/no-tasks";
import LoadMoreButtonComponent from "../components/load-more-button";
import SortComponent from "../components/sort";

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

  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.setSubmitHandler(() => {
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

const renderTasks = (taskListElement, tasks) => {
  tasks
    .forEach(
        (task) => renderTask(taskListElement, task)
    );
};

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButton = new LoadMoreButtonComponent();
  }
  render(tasks) {
    const isAllTasksArchived = tasks.every((task) => task.isArchive);
    const container = this._container.getElement();
    const loadMoreButtonComponent = this._loadMoreButton;
    const tasksComponent = this._tasksComponent;

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
    } else {
      let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
      renderTasks(tasksComponent.getElement(), tasks.slice(0, showingTasksCount));

      loadMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

        tasks
          .slice(prevTasksCount, showingTasksCount)
          .forEach((task) => renderTask(tasksComponent.getElement(), task));

        if (showingTasksCount >= tasks.length) {
          remove(loadMoreButtonComponent);
        }
      });

      render(container, this._sortComponent, RenderPosition.BEFOREEND);
      render(container, tasksComponent, RenderPosition.BEFOREEND);
      render(container, loadMoreButtonComponent, RenderPosition.BEFOREEND);
    }
  }
}
