/* eslint-disable import/no-mutable-exports */

let activities = [
  { description: 'Un-clog the toilet', completed: false, index: 3 },
  { description: 'Complain to the neighbor about his brats', completed: false, index: 1 },
  { description: 'De-flea the dog', completed: true, index: 2 },
];

const inputActivity = (description, completed, index) => {
  activities.push({ description, completed, index });
};

const emptyList = () => {
  activities = [];
};

const archiveActivities = () => {
  localStorage.setItem('activities', JSON.stringify(activities));
};

const loadArchivedActivities = () => {
  let loadActivities;
  if (loadActivities === undefined) {
    loadActivities = JSON.parse(localStorage.getItem('activities'));
  }
  activities = JSON.parse(localStorage.getItem('activities'));
  return activities;
};

const updateCheckboxStatus = (activity, check) => {
  const specificActivity = activities.find((a) => a.description === activity.description);

  specificActivity.completed = check;
  
  archiveActivities();
};

export {
  activities, inputActivity, emptyList, archiveActivities, loadArchivedActivities, updateCheckboxStatus,
};

/* eslint-enable import/no-mutable-exports */