  //req are d data we send to the api data base 
  //res are the receive from the database
export const test = (req, res) => {
  res.json({ message: "My test API is working good" });
};
