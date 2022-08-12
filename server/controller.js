let journals = require('./db.json'); 
let globalID= 0

module.exports ={
    getJournals: (req, res) => {
        res.status(200).send(journals)
    },
    createJournal: (req, res) => {
        const {title, rating, imageURL} = req.body;
        let newJournal = {
            id: globalID,
            title,
            rating: +rating,
            imageURL
        }
        journals.push(newJournal);
        globalID++;
        res.status(200).send(journals);
    },
    updateJournal: (req, res) => {
        const {id} = req.params;
        const {type} = req.body;
        let index = journals.findIndex(elem => +elem.id === +id);
        console.log(type);
        if(type === 'x' && journals[index].rating > 1){
            journals[index].rating -= 1;
            res.status(200).send(journals);
        } else if(type === 'plus' && journals[index].rating < 5){
            journals[index].rating += 1;
            res.status(200).send(journals);
        } else {
            res.status(400).send('Invalid rating!')
        }
    },
    deleteJournal: (req, res) => {
        let index = journals.findIndex(elem => elem.id === +req.params.id);
        journals.splice(index, 1);
        res.status(200).send(journals);
    },
}