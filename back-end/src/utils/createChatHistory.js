export const createChatHistory = (initialText = '') => {
  let text = initialText;

  return {
    addRecord: function(newText) {
      text += '\n' + newText;
    },
    getRecords: function() {
      return text;
    }
  };
};
