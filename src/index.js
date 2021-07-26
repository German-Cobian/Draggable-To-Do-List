import './style.css';
import {
  activities,
  loadActivitiesList,
  newActivityDefine,
  updateDoneActivity,
  activityDescriptionEdit,
  repopulateList,
} from './status-update';
import {
  dragstart, dragover, dragleave, drop, dragend,
} from './drag-and-drop';

// Section with heading and refresh
const toDoList = () => {
  const ul = document.querySelector('ul'); // ft-3

  const heading = () => {
    const li = document.createElement('li');
    li.id = 'todo-heading';
    const h3 = document.createElement('h3');
    h3.textContent = 'Today\'s To Do';
    const i = document.createElement('i');
    i.classList.add('fas', 'fa-sync-alt');
    i.id = 'refresh-icon';
    i.addEventListener('click', () => {
      window.location.reload();
    });

    li.appendChild(h3);
    li.appendChild(i);

    return li;
  };

  // Section that displays activities
  const renderList = (activity) => {
    const li = document.createElement('li');
    li.classList.add('draggable'); // ft-2
    li.setAttribute('activity', activity.index); // ft-2
    li.draggable = true; // ft-2

    const div = document.createElement('div');

    const input = document.createElement('input');
    input.classList.add('completed'); // ft-2
    input.type = 'checkbox';
    input.name = 'completed';
    input.addEventListener('click', () => updateDoneActivity(parseInt(li.getAttribute('activity'), 10), input.checked)); // ft-2 modify on ft-3

    const p = document.createElement('p');
    p.classList.add('description'); // ft-2
    p.contentEditable = 'true'; // ft 3
    p.textContent = activity.description;
    p.addEventListener('input', () => activityDescriptionEdit(parseInt(li.getAttribute('activity'), 10), p.textContent)); // ft 3

    div.appendChild(input);
    div.appendChild(p);
    li.appendChild(div);

    const i = document.createElement('i');
    i.classList.add('fas', 'fa-ellipsis-v');
    // This functionality added in ft-3
    i.addEventListener('click', () => {
      ul.removeChild(li);
      localStorage.clear();

      repopulateList();
    });

    // Event listeners for drag and drop functionality
    li.addEventListener('dragstart', () => dragstart(li));
    li.addEventListener('dragover', (e) => dragover(li, e));
    li.addEventListener('dragleave', () => dragleave(li));
    li.addEventListener('drop', () => {
      drop(li);
    });
    li.addEventListener('dragend', () => {
      dragend(li);
    });

    li.appendChild(i);

    return li;
  };

  // Section where activities are inputed
  const addActivity = () => {
    const li = document.createElement('li');
    li.id = 'new-activities';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Add to your list...';
    input.id = 'list-item';
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        newActivityDefine(input.value);
        ul.appendChild(renderList(activities[activities.length - 1]));

        const clear = document.getElementById('clear');
        ul.appendChild(clear);

        input.value = '';
      }
    });

    li.appendChild(input);

    return li;
  };

  // Section to clear all completed activies
  const clearCompleted = () => {
    const li = document.createElement('li');

    li.textContent = 'Clear all completed';
    li.id = 'clear';

    li.addEventListener('click', () => {
      const draggables = [...document.querySelectorAll('.draggable')];

      const incompleteActivities = draggables.filter((draggable) => draggable.getElementsByClassName('completed')[0].checked === false);

      draggables.forEach((draggable) => ul.removeChild(draggable));

      incompleteActivities.forEach((item) => ul.appendChild(item));

      localStorage.clear();

      repopulateList();

      const clear = document.getElementById('clear');
      ul.appendChild(clear);
    });

    return li;
  };

  ul.appendChild(heading());
  ul.appendChild(addActivity());

  activities.sort((a, b) => ((a.index > b.index) ? 1 : -1));
  activities.forEach((activity) => ul.appendChild(renderList(activity)));

  ul.appendChild(clearCompleted());
};

toDoList(loadActivitiesList());
