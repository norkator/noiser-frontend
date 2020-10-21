export default {
  methods: {
    lsSaveValue: (key, value) => {
      localStorage.setItem(key, value);
    },
    lsGetValue: (key) => {
      return localStorage.getItem(key);
    }
  }
};
