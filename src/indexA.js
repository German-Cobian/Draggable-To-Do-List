import {
  activities, loadActivitiesList, updateDoneActivity, activityDescriptionEdit, repopulateList,
} from './status-update';
import {
  dragstart, dragover, dragleave, drop, dragend,
} from './drag-and-drop';

const renderList = (activity) => {
  const li = document.createElement('li');
  li.classList.add('draggable');
  li.setAttribute('activity', activity.index);
  li.draggable = true;

  const ul = document.getElementsByTagName('ul');

  const div = document.createElement('div');

  const input = document.createElement('input');
  input.classList.add('completed');
  input.type = 'checkbox';
  input.name = 'completed';
  input.addEventListener('click', () => updateDoneActivity(parseInt(li.getAttribute('activity'), 10), input.checked));

  const p = document.createElement('p');
  p.classList.add('description');
  p.contentEditable = 'true';
  p.textContent = activity.description;
  p.addEventListener('input', () => activityDescriptionEdit(parseInt(li.getAttribute('activity'), 10), p.textContent));

  div.appendChild(input);
  div.appendChild(p);

  li.appendChild(div);

  const i = document.createElement('i');
  i.classList.add('fas', 'fa-ellipsis-v');
  i.addEventListener('click', () => {
    ul.removeChild(li);
    localStorage.clear();

    repopulateList();
  });

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

const toDolist = () => {
  const ul = document.querySelector('ul');

  activities.sort((a, b) => ((a.index > b.index) ? 1 : -1));
  activities.forEach((activity) => ul.appendChild(renderList(activity)));
};

toDolist(loadActivitiesList());

export { toDolist, renderList };
