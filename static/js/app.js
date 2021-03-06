d3.json('samples.json').then(function(data){
    addDatasetName(data.names);
})
// ******************************* Function addDatasetName
/** adds options to drop down menu to choose dataset
 *  and update charts for first option
 * @param {*} names 
 */
function addDatasetName(names){
let selectOption=d3.select("#selDataset");
names.forEach(element => {
    selectOption.append('option').text(element);
   
});
// udate chart for first option
optionChanged(names[0])
}


// ******************************* Function optionChanged
/** select on change function:
 * gets ID for dataset, filters JSON and channels required data to update charts functions
 * 
 * @param {*} value 
 */
function optionChanged(value) {
  console.log(value);
  d3.json('samples.json').then(data=> {
    console.log(data);
    let dataDemo=data.metadata.filter((record,index)=>(record.id==value))[0];
    updateDemographicInfo(dataDemo);
    updateGaugeChart(dataDemo.wfreq);
    let dataChart=data.samples.filter(record=>(record.id==value))[0];
    updateBarChart(dataChart);
    updateBubbleCharts(dataChart);
  
});
    



}


function updateBarChart(dataSet){
    console.log('barhchart',dataSet)
};
function updateBubbleCharts(dataSet){
    console.log('bubblechart',dataSet)
};

function updateDemographicInfo(dataSet){
    console.log('deminfo',dataSet);
    let metaBody=d3.select("#sample-metadata");
    metaBody.selectAll('div').remove();
    Object.entries(dataSet).forEach(record=>{
        metaBody.append('div').text(record[0]+": "+record[1])
    });
  
};
function updateGaugeChart(dataSet)
{
    console.log('gaugechart',dataSet)
}