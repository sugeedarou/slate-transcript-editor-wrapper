const draftToTrjson = (draft) => {
    console.log(draft);
    let result = [];
    for (let paragraph of draft) {
        let res_paragraph = [];
        for (let word of paragraph.children[0].words) {
            res_paragraph.push({word: word.text, start: word.start, end: word.end});
        }
        result.push(res_paragraph);
    }
    return result;
};

const dpeToTrjson = (dpe) => {
    let result = [];
    //deep copy, making sure that we are not operating on a reference
    let words = JSON.parse(JSON.stringify(dpe.words));
    for (let word of words) {
        delete Object.assign(word, { 'word': word.text }).text;
    }
    let paragraphs = dpe.paragraphs

    for (let paragraph of paragraphs) {
        result.push(words.filter((word) => word.start >= paragraph.start && word.end <= paragraph.end))
    }

    return interpolateTrJson(result);

}

const interpolateTrJson = (trjson) => {
    let res = [];
    for (let paragraph of trjson) {
        const start = paragraph[0].start;
        const end = paragraph[paragraph.length - 1].end;
        const duration = end - start;
        const numOfChars = paragraph.map((word) => word.word).join('').length;
        let newp = [];
        let currChar = 0;
        for (let word of paragraph) {
            newp.push({
                word: word.word, 
                start: start + ((currChar / numOfChars) * duration),
                end: start + (((currChar + word.word.length) / numOfChars) * duration)
            });
            currChar += word.word.length;
        }
        res.push(newp);
    }
    return res;
};

export {draftToTrjson};
export {dpeToTrjson}