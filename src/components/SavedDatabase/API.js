import handleError from "../../utils/handleError";
const API_BASEURL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";
export const saveDatabase = (title, database) => {
  console.log(database);
  const blob = new Blob([database], {
    type: `application/x-sqlite-3`,
  });

  console.log(blob);
  const data = new FormData();

  data.set("database", blob);

  return fetch(`${API_BASEURL}/api/database/save/${title}`, {
    method: "POST",
    body: data,
    credentials: "same-origin",
  })
    .then(handleError)
    .then((res) => res.json());
};

export const loadDatabase = (id) => {
  return fetch(`${API_BASEURL}/api/database/load/${id}`, {
    method: "GET",
    credentials: "same-origin",
  })
    .then(handleError)
    .then((res) => res.arrayBuffer());
};

export const deleteDatabase = (id) => {
  return fetch(`${API_BASEURL}/api/database/delete/${id}`, {
    method: "GET",
    credentials: "same-origin",
  }).then(handleError);
};

export const listDatabases = () => {
  return fetch(`${API_BASEURL}/api/database/list`, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then(handleError)
    .then((res) => res.json());
};
