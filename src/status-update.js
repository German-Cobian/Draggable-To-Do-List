const activities = [
  { description: 'Un-clog the toilet', completed: false, index: 1 },
  { description: 'Complain to the neighbor about his brats', completed: false, index: 3 },
  { description: 'De-flea the dog', completed: true, index: 3 },
];

const emptyList = () => {
  activities = [];
};

const inputActivity = (description, completed, index) => {
  activities.push({ description, completed, index: parseInt(index, 10) });
};

const archiveActivities = () => {
const jsonActivities = JSON.stringify(activities);
  localStorage.setItem('activities', jsonActivities);
};

const activityReload = (activity, check) => {
  const specificActivity = activities.find((act) => act.description === activity.description);

  specificActivity.completed = check;

  activity.completed = check;
  console.log(activity.completed)
  archiveActivities();
};

export {
  activities, emptyList, inputActivity, archiveActivities, activityReload,
};