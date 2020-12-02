const useTimeDifference = () => {
  function getTimeDifference(initial) {
    let difference = Math.round(Date.now() / 1000 - initial);
    const returnDiffText = (difference) => {
      if (difference >= 29030400) {
        return `${Math.round(difference / 29030400)} year${
          Math.round(difference / 29030400) === 1 ? "" : "s"
        } ago`;
      } else if (difference >= 2419200) {
        return `${Math.round(difference / 2419200)} month${
          Math.round(difference / 2419200) === 1 ? "" : "s"
        } ago`;
      } else if (difference >= 604800) {
        return `${Math.round(difference / 604800)} week${
          Math.round(difference / 604800) === 1 ? "" : "s"
        } ago`;
      } else if (difference >= 86400) {
        return `${Math.round(difference / 86400)} day${
          Math.round(difference / 86400) === 1 ? "" : "s"
        } ago`;
      } else if (difference >= 3600) {
        return `${Math.round(difference / 3600)} hour${
          Math.round(difference / 3600) === 1 ? "" : "s"
        } ago`;
      } else if (difference >= 60) {
        return `${Math.round(difference / 60)} minute${
          Math.round(difference / 60) === 1 ? "" : "s"
        } ago`;
      }
      return "a few seconds ago";
    };
    return returnDiffText(difference);
  }
  return getTimeDifference;
};
export default useTimeDifference;
