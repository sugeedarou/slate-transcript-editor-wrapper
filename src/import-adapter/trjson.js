

/**
 * groups words list from autoEdit transcript based on punctuation.
 * @todo To be more accurate, should introduce an honorifics library to do the splitting of the words.
 * @param {array} words - array of words objects from autoEdit transcript
 */

const groupWordsInParagraphs = (trjson) => {
  const results = [];
    for (let paragraph of trjson) {
        let text = [];
        let words = [];
        for (let word of paragraph) {
            text.push(word.word);
            words.push({text: word.word, start: word.start, end: word.end});
        }
        results.push({text: text, words: words});
    }

  return results;
};

const trjsonToDraft = (trjson) => {
  console.log(trjson);
  const paragraphs = [];
  let words = [];

  const wordsByParagraphs = groupWordsInParagraphs(trjson);

  wordsByParagraphs.forEach((paragraph, i) => {
    const paragraphObj = {
      id: i,
      speaker: `TBC ${i}`,
      start: paragraph.words[0].start,
      end: paragraph.words.at(-1).end,
    };
    paragraphs.push(paragraphObj);
    words = words.concat(paragraph.words);
  });

  console.log({ paragraphs, words });
  return { paragraphs, words };
};

export default trjsonToDraft;
