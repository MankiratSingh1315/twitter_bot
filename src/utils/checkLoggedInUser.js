const TwitterClient = require("../config/TwitterClient");

const checkLoggedInUser = async () => {
  try {
    const user = await TwitterClient.v2.me();
    if (!user || !user.data) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);

    throw new Error("Error fetching logged in user");
  }
};
module.exports = checkLoggedInUser;
