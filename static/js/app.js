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
//   console.log(value);
  d3.json('samples.json').then(data=> {
    console.log(data);
    // data for demographic info record and for gauge chart
    let dataDemo=data.metadata.filter((record,index)=>(record.id==value))[0];
    updateDemographicInfo(dataDemo);
    updateGaugeChart(dataDemo.wfreq);
    // data for bubble and bar charts
    let dataChart=data.samples.filter(record=>(record.id==value))[0];
    // Bar Chart's data preparation - sort and slice
    let topNumber=10
    // re-mapping data for barchart into one array of objects
    let dataBar=dataChart.sample_values.map((d,i)=>{
        return {name:dataChart.otu_ids[i],value:d};
    })
        // sort array
    dataBar.sort((a,b)=>(b.value-a.value))
    // mapping x and y arrays for bar chart
    let xBar=dataBar.map(el=>el.value).slice(0,topNumber).reverse()
    , yBar=dataBar.map(el=>('OTC '+el.name)).slice(0,topNumber).reverse()
    
    updateBarChart(xBar,yBar);
    updateBubbleCharts(dataChart);
  
});
}
// ******************************* updateDemographicInfo
/** update Demographic info record
 * 
 * @param {*} dataSet 
 */
function updateDemographicInfo(dataSet){
    // console.log('deminfo',dataSet);
    let metaBody=d3.select("#sample-metadata");
    metaBody.selectAll('div').remove();
    Object.entries(dataSet).forEach(record=>{
        metaBody.append('div').text(record[0]+": "+record[1])
    });
  
};
