function processParagraph(pStart, pEnd, pContent) {
  const paragraph = { words: [], text: pContent };
  let cChar = 0;
  const sumChars = pContent.reduce((total, word) => total + word.length, 0);
  //let sum = numbers.reduce((totalValue, currentValue) => totalValue + currentValue, initialValue);
  const totalTime = pEnd - pStart;

  for (const word of pContent) {
    //cChar += len(word)
    const wordObj = { text: word, start: null, end: null };
    wordObj.start = pStart + (totalTime * (cChar / sumChars));
    cChar += word.length;
    wordObj.end = pStart + (totalTime * (cChar / sumChars));

    paragraph.words.push(wordObj);
  }
  // return complete paragraph json object

  return paragraph;
}

function timestringToFloat(timestring) {
  //example 01:33:31.979
  // return float
  const splitedTimestring = timestring.split(':');
  const float = parseInt(splitedTimestring[0]) * 3600 + parseInt(splitedTimestring[1]) * 60 + parseFloat(splitedTimestring[2]);

  return float;
}

/**
 * groups words list from autoEdit transcript based on punctuation.
 * @todo To be more accurate, should introduce an honorifics library to do the splitting of the words.
 * @param {array} words - array of words objects from autoEdit transcript
 */

const groupWordsInParagraphs = (vttText) => {
  const results = [];
  //let paragraph = { words: [], text: [] };

  const vttLines = vttText.match(
    /^.*([\n\r]+|$)/gm
  );
  //need to check if last element is empty before deleting
  vttLines.pop();
  // remove first element
  vttLines.shift();
  let pStart, pEnd, pContent, paragraph;
  for (let vttLine of vttLines) {
    // e.g. '00:00:31.979 --> 00:00:38.409'
    vttLine = vttLine.trim();
    if (!isNaN(vttLine)) { continue; }
    if (vttLine.startsWith('NOTE ')) { continue; }
    if (vttLine.startsWith('- ')) {
      vttLine = vttLine.slice(2);
    }
    if (vttLine.includes('-->')) {
      if (pContent == undefined) {
        pContent = [];
        const lineSplit = vttLine.split(' --> ');
        pStart = timestringToFloat(lineSplit[0]);
        pEnd = timestringToFloat(lineSplit[1]);
        continue;
      }
      // process
      paragraph = processParagraph(pStart, pEnd, pContent);
      // append paragraph to results
      results.push(paragraph);
      // empty pContent
      pContent = [];
      // set new pStart and pEnd
      const lineSplit = vttLine.split(' --> ');
      pStart = timestringToFloat(lineSplit[0]);
      pEnd = timestringToFloat(lineSplit[1]);

    } else { // content line

      pContent = pContent.concat(vttLine.split(' '));
    }

  }

  // process last paragraph
  paragraph = processParagraph(pStart, pEnd, pContent);
  // append paragraph to results
  results.push(paragraph);
  console.log(results);

  return results;
};

const vttToDraft = (vttText) => {
  console.log(vttText)
  const paragraphs = [];
  let words = [];

  const wordsByParagraphs = groupWordsInParagraphs(vttText);

  wordsByParagraphs.forEach((paragraph, i) => {
    const paragraphObj = {
      id: i,
      speaker: `TBC ${ i }`,
      start: paragraph.words[0].start,
      end: paragraph.words.at(-1).end,
    }
    paragraphs.push(paragraphObj)
    words = words.concat(paragraph.words)

  });

  console.log({paragraphs, words})
  return {paragraphs, words};
};

export default vttToDraft;