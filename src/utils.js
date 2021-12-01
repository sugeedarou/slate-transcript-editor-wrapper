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

export {draftToTrjson};