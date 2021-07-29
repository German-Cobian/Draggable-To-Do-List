/* eslint-disable import/no-mutable-exports */

let activities = [];

const loadActivitiesList = () => {
  let loadActivities = JSON.parse(localStorage.getItem('activities'));
  if (loadActivities == null) {
    loadActivities = [];
  }
  activities = loadActivities;
  return activities;
};

const emptyList = () => {
  activities = [];
};

const inputActivity = (description, completed, index) => {
  const newObj = { description, completed, index };

  activities.push(newObj);

  return activities[activities.length - 1];
};

const archiveActivities = () => {
  const jsonActivities = JSON.stringify(activities);
  localStorage.setItem('activities', jsonActivities);
};

const newActivityDefine = (description) => {
  let index = 0;

  if (activities.length > 0) {
    index = activities[activities.length - 1].index + 1;
  }

  inputActivity(description, false, index);
  archiveActivities();
};

const updateDoneActivity = (index, check) => {
  const doneActivities = activities.find((a) => a.index === index);
  doneActivities.completed = check;
  archiveActivities();
};

const activityDescriptionEdit = (index, description) => {
  const descriptionToEdit = activities.find((a) => a.index === index);
  descriptionToEdit.description = description;
  archiveActivities();
};

const repopulateList = () => {
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
};

const activityReload = (activity, check) => {
  const specificActivity = activities.find((act) => act.description === activity.description);

  specificActivity.completed = check;

  activity.completed = check;
  archiveActivities();
};

export {
  activities,
  loadActivitiesList,
  emptyList,
  inputActivity,
  archiveActivities,
  newActivityDefine,
  updateDoneActivity,
  activityDescriptionEdit,
  repopulateList,
  activityReload,
};

/* eslint-enable import/no-mutable-exports */