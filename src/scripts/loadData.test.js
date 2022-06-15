import loadData from "./loadData";
import fetchDataStore from "../store/fetchDataStore";

test("Run loadData", async () => {
  await loadData();
  console.log(fetchDataStore);
});
