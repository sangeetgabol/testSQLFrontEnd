import handleError from "../../utils/handleError";

const API_BASEURL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";
export const saveProgress = (allQuestions) => {
  return fetch(`${API_BASEURL}/api/group/save-progress`, {
    method: "POST",
    body: JSON.stringify({ questions: allQuestions }),
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then(handleError);
};

export const createGroup = (title, databaseID) => {
  const data = { title, databaseID };

  return fetch(`${API_BASEURL}/api/group/create`, {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then(handleError);
};

export const updateGroup = (groupId, title) => {
  return fetch(`http://localhost:3001/api/group/update/${groupId}`, {
    method: "POST",
    body: JSON.stringify({ title }),
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then(handleError);
};

export const deleteGroup = (id) => {
  return fetch(`http://localhost:3001/api/group/delete/${id}`, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then(handleError)
    .then((res) => res.json());
};

export const getGroup = (id) => {
  return fetch(`${API_BASEURL}/api/group/${id}`, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then(handleError)
    .then((res) => res.json());
};

export const removeUserFromGroup = (groupId, userId) => {
  return fetch(`${API_BASEURL}/api/group/${groupId}/remove/${userId}`, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then(handleError);
};

export const listGroups = () => {
  return fetch(`${API_BASEURL}/api/group/list/all`, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then(handleError)
    .then((res) => res.json());
};

export const joinGroup = (id) => {
  return fetch(`${API_BASEURL}/api/group/join/${id}`, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then(handleError)
    .then((res) => res.json());
};

export const leaveCurrentGroup = () => {
  return fetch(`${API_BASEURL}/api/group/leave/current`, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then(handleError);
};
