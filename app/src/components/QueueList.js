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

export default function filterQueues(searchText, maxResults) {
  return queueList
    .filter(queue => {
      if (queue.queueName.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      return false;
    })
    .slice(0, maxResults);
}