
export function CategoryReducer(state, action) {
  switch (action.type) {
    case 'Geography':
      return { category: 'Geography', url: 'https://opentdb.com/api.php?amount=1&category=22&type=multiple'};
    case "History":
      return { category: 'History', url: 'https://opentdb.com/api.php?amount=1&category=23&type=multiple' };
      case "Animals":
      return { category: 'Animals', url: 'https://opentdb.com/api.php?amount=1&category=21&type=multiple' };
      case "Sports":
      return { category: 'Sports', url: 'https://opentdb.com/api.php?amount=1&category=27&type=multiple' };
      case "Random":
      return { category: 'Random', url: 'https://opentdb.com/api.php?amount=1&category=1&type=multiple' };
      case 'noSelection':
        return {category: 'noSelection'}
    default:
      throw new Error(`Count Reducer does not recognize ${action.type}`);
  }
}