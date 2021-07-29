import {
  activities, inputActivity, activityDescriptionEdit, updateDoneActivity, emptyList, repopulateList,
} from '../status-update.js';
import { renderList } from '../indexA';
import { completedClear } from '../drag-and-drop';

describe('It updates status and content', () => {
  test('It updates the activity description', () => {
    localStorage.clear();
    const nextIndex = activities[activities.length];
    inputActivity('initial description', false, nextIndex);

    activityDescriptionEdit(nextIndex, 'updated description');

    expect(activities[activities.length - 1].description).toBe('updated description');

    const storage = JSON.parse(localStorage.getItem('activities'));
    expect(storage[storage.length - 1].description).toBe('updated description');
  });

  test('Updates the status of the list item', () => {
    localStorage.clear();
    const nextIndex = activities[activities.length - 1];
    inputActivity('Pending activity', false, nextIndex);

    updateDoneActivity(nextIndex, true);

    expect(activities[activities.length - 1].completed).toBe(true);

    const storage = JSON.parse(localStorage.getItem('activities'));
    expect(storage[storage.length - 1].completed).toBe(true);
  });

  test('It updates the index according to order after re-position', () => {
    localStorage.clear();
    emptyList();

    const activity1 = {
      description: 'Complain to neighbor about his brats',
      completed: false,
      index: 0,
    };
    const activity2 = {
      description: 'De-flea the dog',
      completed: false,
      index: 1,
    };

    const listItems = document.createElement('ul');
    listItems.appendChild(renderList(activity1));
    listItems.appendChild(renderList(activity2));

    document.body.appendChild(listItems);

    repopulateList();

    expect(activities[0].index).toBe('0');
    expect(activities[1].index).toBe('1');

    const listElement1 = listItems.childNodes[0];
    const listElement2 = listItems.childNodes[1];

    const tempIndex = listElement1.getAttribute('activity');
    listElement1.setAttribute('activity', listElement2.getAttribute('activity'));
    listElement2.setAttribute('activity', tempIndex);

    repopulateList();

    const firstActivity = activities[0];
    const secondActivity = activities[1];

    expect(firstActivity.index).toBe('0');
    expect(firstActivity.description).toBe('Complain to neighbor about his brats');
    expect(secondActivity.index).toBe('1');
    expect(secondActivity.description).toBe('De-flea the dog');

    const storage = JSON.parse(localStorage.getItem('activities'));
    expect(storage[0].index).toBe('0');
    expect(storage[0].description).toBe('Complain to neighbor about his brats');
    expect(storage[1].index).toBe('1');
    expect(storage[1].description).toBe('De-flea the dog');
  });

  test('It clears all completed activities', () => {
    emptyList();
    localStorage.clear();
    document.body.innerHTML = '';
    const ul = document.createElement('ul');
    document.body.appendChild(ul);
    const clear = document.createElement('li');
    clear.id = 'clear';
    document.body.appendChild(ul);
    ul.appendChild(clear);

    const activity1 = {
      description: 'Activity 1',
      completed: true,
      index: 0,
    };
    const activity2 = {
      description: 'Activity 2',
      completed: false,
      index: 1,
    };

    ul.appendChild(renderList(activity1));
    ul.appendChild(renderList(activity2));

    repopulateList();
    const checkboxes = document.getElementsByClassName('completed');
    checkboxes[0].checked = true;

    completedClear(ul);

    [...checkboxes].forEach((checkbox) => expect(checkbox.checked).toBe(false));
    expect([...checkboxes].length).toBe(1);

    const storage = JSON.parse(localStorage.getItem('activities'));
    storage.forEach((item) => expect(item.completed).toBe(false));
    expect(storage.length).toBe(1);
  });
});