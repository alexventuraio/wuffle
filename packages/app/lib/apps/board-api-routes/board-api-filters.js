function filterIssueOrPull(issueOrPull) {

  if (issueOrPull.pull_request) {
    return filterPull(issueOrPull);
  } else {
    return filterIssue(issueOrPull);
  }
}

module.exports.filterIssueOrPull = filterIssueOrPull;


function filterRepository(githubRepository) {

  const {
    name,
    owner,
    html_url
  } = githubRepository;

  return {
    name,
    owner: filterUser(owner),
    html_url
  };
}

module.exports.filterRepository = filterRepository;


function filterUser(user) {

  const {
    login,
    avatar_url,
    html_url
  } = user;

  return {
    login,
    avatar_url,
    html_url
  };
}

module.exports.filterUser = filterUser;


function filterComment(comment) {

  const {
    user,
    html_url
  } = comment;

  return {
    user: filterUser(user),
    html_url
  };
}

module.exports.filterComment = filterComment;


function filterLabel(githubLabel) {

  const {
    name,
    color,
    column_label
  } = githubLabel;

  return {
    name,
    color,
    ...(column_label ? { column_label } : {})
  };
}

module.exports.filterLabel = filterLabel;

function filterLink(link) {
  const {
    type,
    target
  } = link;

  return {
    type,
    target: filterIssueOrPull(target)
  };
}

function filterMilestone(githubMilestone) {

  const {
    number,
    title,
    html_url
  } = githubMilestone;

  return {
    number,
    title,
    html_url
  };
}

module.exports.filterMilestone = filterMilestone;


function filterPull(pullRequest) {

  const {
    id,
    key,
    number,
    state,
    title,
    user,
    assignees,
    requested_reviewers,
    labels,
    milestone,
    repository,
    draft,
    comments = [],
    merged,
    html_url,
    pull_request,
    links = [],
    order,
    column
  } = pullRequest;

  return {
    id,
    key,
    number,
    state,
    title,
    user: user ? filterUser(user) : null,
    assignees: assignees.map(filterUser),
    requested_reviewers: requested_reviewers.map(filterUser),
    labels: labels.map(filterLabel),
    comments: Array.isArray(comments) ? comments.map(filterComment) : [],
    milestone: milestone ? filterMilestone(milestone) : null,
    draft,
    merged,
    repository: filterRepository(repository),
    html_url,
    pull_request,
    links: links.map(filterLink),
    order,
    column
  };
}

module.exports.filterPull = filterPull;


function filterIssue(issue) {

  const {
    id,
    key,
    number,
    state,
    title,
    user,
    assignees,
    labels,
    milestone,
    html_url,
    repository,
    pull_request,
    comments = [],
    links = [],
    order,
    column
  } = issue;

  return {
    id,
    key,
    number,
    state,
    title,
    user: user ? filterUser(user) : null,
    assignees: assignees.map(filterUser),
    labels: labels.map(filterLabel),
    milestone: milestone ? filterMilestone(milestone) : null,
    repository: filterRepository(repository),
    comments: Array.isArray(comments) ? comments.map(filterComment) : [],
    pull_request,
    html_url,
    links: links.map(filterLink),
    order,
    column
  };

}

module.exports.filterIssue = filterIssue;