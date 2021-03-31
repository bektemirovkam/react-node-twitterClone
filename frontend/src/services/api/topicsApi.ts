import axios from "axios";
import { TopicState } from "../../store/ducks/topics/contracts/state";

export const topicsApi = {
  fetchTopics: (): Promise<TopicState["topics"]> => {
    return axios.get("/topics").then(({ data }) => data);
  },
};
