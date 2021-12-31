import axios from "axios";

const baseUrl = "http://localhost:19924/api/";

export default {
  plant(url = baseUrl + "Plants") {
    return {
      fetchAll: () => axios.get(url),
      update: (id, updateRecord) => axios.put(url + "/" + id, updateRecord),
    };
  },
};
