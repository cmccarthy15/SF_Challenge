// 1. Write a function that takes a candidate_id and returns their percentile for their coding and commmunication score compared to other candidates at the same title and at similar companies.

let d3 = require('d3');
let companies, scoreRecords;

const getInfo = (candidate_id, res) => {
  console.log('inside of getInfo')
  getCompanies(candidate_id, res)
}

const getCompanies = (candidate_id, res) => d3.csv('https://s3.amazonaws.com/simple-fractal-recruiting/companies.csv', function (error, data) {
  companies = data.slice(0, data.length);
  getScoreRecords(candidate_id, res)
})

const getScoreRecords = (candidate_id, res) => d3.csv('https://s3.amazonaws.com/simple-fractal-recruiting/score-records.csv', function (error, data) {
  scoreRecords = data.slice(0, data.length);
  const { codingPercentile, communicationPercentile } = getCandidatePercentiles(candidate_id, scoreRecords, companies)
  if(res) {
    res.send({ coding_percentile: codingPercentile, communication_percentile: communicationPercentile})
    // res.coding_percentile = codingPercentile
    // res.communication_percentile = communicationPercentile
  }

  console.log('codingPercentile', codingPercentile)
  console.log('communicationPercentile', communicationPercentile)
})

/*  IS SIMILAR FUNCTION  */
function areSimilar(company_1, company_2){
  return Math.abs(company_1["fractal_index"] - company_2["fractal_index"]) < 0.15
}


/* GET CANDIDATE PERCENTILES FUNCTION */
function getCandidatePercentiles(candidate_id, scoreRecords, companies){
  /*      STEPS
      1. get the candidate info
      2. get their company info
      3. get all other companyIds
      4. find all other employees where they have the same title and companyId in our set
      5. map those employees to arrays of communication_score and coding_score
      6. calculate percentile using those arrays
          a. Method one: sort the arrays and use indexes
          b. Up challenge: find a method with better time complexity
          c. Current caveat: this will return lowest edge of the percentile if multiple people have the same score, so it's a harsher metric at the moment.
  */
  let communicationScores = [], codingScores = [];


  /*   STEP ONE   */

  const candidateInfo = scoreRecords.find(elem => elem.candidate_id === candidate_id)

  /*   STEP TWO   */
  const candidateCompany = companies.find(elem => elem.company_id === candidateInfo.company_id)

  /*   STEP THREE   */
  const similarCompanyIds = companies
    .filter(company => areSimilar(candidateCompany, company))
    .map(company => company.company_id);

  /*   STEP FOUR   */
  const similarCandidates = scoreRecords
    .filter(record => {
      return similarCompanyIds.indexOf(record.company_id) > -1
        && record.title === candidateInfo.title
    })
    .forEach(record => {
      /*   STEP FIVE   */
      communicationScores.push(record.communication_score);
      codingScores.push(record.coding_score);
    })

  /*   STEP SIX   */
  const communicationPercentile = Math.round(communicationScores.sort((a, b) => a - b).indexOf(candidateInfo.communication_score) / (communicationScores.length - 1) * 100)

  const codingPercentile = Math.round(codingScores.sort((a, b) => a - b).indexOf(candidateInfo.coding_score) / (codingScores.length - 1) * 100)

  return {codingPercentile, communicationPercentile}
}

// getInfo('889')

module.exports = getInfo;
