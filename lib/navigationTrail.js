// Remembers the pages visited in this tab, so the browser's Back and Forward
// buttons can be told apart (the page change itself carries no direction).

export function createTrail(startPath) {
  return { paths: [startPath], position: 0 };
}

function depth(path) {
  return path.split("/").filter(Boolean).length;
}

// Records a move to `path` and returns "back" or "forward".
// `fromHistoryButtons` is true when the browser's Back/Forward caused it.
export function advanceTrail(trail, path, fromHistoryButtons) {
  const previous = trail.paths[trail.position];

  if (fromHistoryButtons) {
    if (trail.paths[trail.position - 1] === path) {
      trail.position -= 1;
      return "back";
    }
    if (trail.paths[trail.position + 1] === path) {
      trail.position += 1;
      return "forward";
    }
    // Unknown page (e.g. after a reload): a shallower page counts as "back".
    trail.paths = [path];
    trail.position = 0;
    return depth(path) < depth(previous) ? "back" : "forward";
  }

  trail.paths = [...trail.paths.slice(0, trail.position + 1), path];
  trail.position += 1;
  return "forward";
}
