const fs = require('fs');
const natural = require('natural');
const nlp = require('compromise');

// try out natural
const BayesClassifier = new natural.BayesClassifier();

// single instance 
module.exports = function Classifier(name) {
  return new Promise((resolve, reject) => {
    // only 1 model is usable. So hardcoding is fine
    natural.BayesClassifier.load('../models/bayes-v4.json', null, function(err, classifier) {
      if (err) reject(err);
      resolve({ age : classifier.classify(name) });
    });
  }).catch(err => {
    return {}
  });
}

/*
natural.BayesClassifier.load('bayes-v4.json', null, function(err, classifier) {
  readData('./training/test.csv')
  .then(data => data.toString().split('\n'))
  .then(testData => {
    let err = 0;
    testData.map(t => {
      const values = t.replace('\r', '').split(';');
      const realAge = values[2];
      const estAge = classifier.classify(values[1].split(' '));

      console.log(`${values[1]};${realAge};${estAge}`);
      if (Math.abs(realAge - estAge) > 2) {
        err += 1;
      }
      
    });
    console.log(`error rate: ${err / testData.length}`);
  })
  .catch(err => console.log(err));
});
*/
