import { observables, } from '../utility';

export const createProgress = () => {
  let isInProgress = observables.of(false);

  let withProgress = (callback) => {
    let endProgress = () => {
      console.log('endProgress');
      observables.set(isInProgress, false);
    };
    let progress = () => {
      console.log('progress');
      callback(endProgress);
    };
    let startProgress = () => {
      console.log('startProgress');
      observables.set(isInProgress, true, progress);
    };
    startProgress();
  };

  return { isInProgress, withProgress };
};