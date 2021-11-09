const queueList = [
  {
    "queueName": "hello"
  },
  {
    "queueName": "new-one"
  },
  {
    "queueName": "dlq"
  },
  {
    "queueName": "messages"
  }
]

export default function filterQueue(searchText, maxResults) {
  return queueList
    .filter(queue => {
      if (queue.queueName.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      // if (queue.keywords.includes(searchText)) {
      //   return true;
      // }
      return false;
    })
    .slice(0, maxResults);
}