// Counting and listing for the /review board (ReviewQueue).

// How many entries there are in total and in each status. Entries with
// any other status only count toward the total.
export function countByStatus(items) {
  const counts = { all: items.length, published: 0, pending: 0, returned: 0 };
  items.forEach((item) => {
    if (item.reviewStatus in counts) counts[item.reviewStatus] += 1;
  });
  return counts;
}

// The entries for the chosen tab and order. The page loads them oldest
// first, so "newest" reverses that.
export function visibleItems(items, filter, order) {
  const ordered = order === "newest" ? [...items].reverse() : items;
  return ordered.filter(
    (item) => filter === "all" || item.reviewStatus === filter,
  );
}
