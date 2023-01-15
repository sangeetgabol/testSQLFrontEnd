const { useEffect } = require("react");
const { useNavigate } = require("react-router");

export const Redirect = ({ to }) => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
};
