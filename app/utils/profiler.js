/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: Antonio Prates [antonioprates@gmail.com], sep-2019
 *
 * "hubbubTrack" implements performance tracking on a dev-build using react Profiler
 * see more at: https://reactjs.org/docs/profiler.html
 *
 * After configured on component, on browser console type: window.performanceTests
 */

export function hubbubTrack(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) {
  // Aggregate or log render timings...

  if (!window.performanceTests) window.performanceTests = {};

  if (!window.performanceTests[id]) window.performanceTests[id] = {};

  window.performanceTests[id].renderCount
    ? window.performanceTests[id].renderCount++
    : (window.performanceTests[id].renderCount = 1);

  window.performanceTests[id].totalTime
    ? (window.performanceTests[id].totalTime += actualDuration)
    : (window.performanceTests[id].totalTime = actualDuration);

  window.performanceTests[id].averageTime =
    window.performanceTests[id].totalTime / window.performanceTests[id].renderCount;

  // uncomment bellow lines to also store history (either first or second option)

  // option 1 - duration only history:
  // if (!window.performanceTests[id].history) window.performanceTests[id].history = [];
  // window.performanceTests[id].history[window.performanceTests[id].renderCount] = actualDuration;

  // option 2 - full history:
  // if (!window.performanceTests[id].history) window.performanceTests[id].history = [];
  // window.performanceTests[id].history[window.performanceTests[id].renderCount] = {
  //   id,
  //   phase,
  //   actualDuration,
  //   baseDuration,
  //   startTime,
  //   commitTime,
  //   interactions
  // };
}
