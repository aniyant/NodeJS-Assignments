import { connect } from "mongoose";

const connectToDB = async (url) => {
  await connect(url);
};

export default connectToDB;
