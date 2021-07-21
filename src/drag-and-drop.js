import {
  emptyList, inputActivity, archiveActivities,
} from './status-update';
  
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
  
    const draggables = document.querySelectorAll('.draggable');
  
    let i = 0;
    draggables.forEach((draggable) => {
      draggable.setAttribute('activity', i);
      i += 1;
    });
  
    emptyList();
    draggables.forEach((draggable) => {
      const description = draggable.getElementsByClassName('description')[0].textContent;
      const completed = draggable.getElementsByClassName('completed')[0].checked;
      const index = draggable.getAttribute('activity');
  
      inputActivity(description, completed, index);
  
      archiveActivities();
    });
  
    element.classList.remove('dragover');
  };
  
  const dragend = (element) => {
    element.classList.remove('skateover');
  };

  export {
    dragstart, dragover, dragleave, drop, dragend,
  };