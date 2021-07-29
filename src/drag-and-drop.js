import {
  repopulateList,
} from './status-update';

const completedClear = (ul) => {
  const draggables = [...document.querySelectorAll('.draggable')];

  const newList = draggables.filter((draggable) => draggable.getElementsByClassName('completed')[0].checked === false);

  draggables.forEach((draggable) => ul.removeChild(draggable));

  newList.forEach((item) => ul.appendChild(item));

  repopulateList();

  const clear = document.getElementById('clear');
  ul.appendChild(clear);
};

// Section relating to drag and drop functionality
const dragstart = (element) => {
  element.classList.add('skateover');
};

const dragover = (element, e) => {
  e.preventDefault();
  element.classList.add('dragover');
};

const dragleave = (element) => {
  element.classList.remove('dragover');
};

const drop = (element) => {
  const skateover = document.querySelector('.skateover');
  element.before(skateover);

  repopulateList();
  element.classList.remove('dragover');
};

const dragend = (element) => {
  element.classList.remove('skateover');
};

export {
  dragstart, dragover, dragleave, drop, dragend, completedClear,
};