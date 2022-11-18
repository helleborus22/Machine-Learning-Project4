/*
JSON DATA:
 1. metadata: array of objects (demographics)
        age
        bbtype
        ethnicity
        gender
        id
        location
        wfreq
 2. names: array of id numbers (sample IDs/ selection tool)
 3. samples: array of objects (biodiversity info)
        id
        otu_ids
        otu_labels
        sample_values

STEPS:
 1. User selects a test subject ID number
        #selDataset (id to target)
 2. Use the ID number to select an element of the samples array
        Identify the otu_ids, out_labels, and out_values
 3. Use these values to create a horizontal bar chart
        #bar (id to target)
        * Values: sample_values
        * Labels: otu_ids
        * Hovertext: otu_labels
 4. Use these values to create a bubble chart
        #bubble (id to target)
        * X Values: otu_ids
        * Y Values: sample_values
        * Marker Size: sample_values
        * Marker Colors: otu_ids
        * Text Values: otu_labels
 5. Use the ID number to select an element of the metadata array
 6. Display the demographic info from the m-d array as a chart
        #sample-metadata (id to target)
 7. Refresh the page if the user selects a different ID number
        HTML Function: optionChanged(this.value)
*/

// Identify the URL to be used
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Write the JS Promise (API call to the URL)
const promise = d3.json(url);

// Log the promise for reference while working
console.log(promise)

// Select the subject ID's from the promise (d3.json(url))
promise.then((data)=>
    {
        // Select the 'names' array
        var names = data.names;

        // Append items in 'names' to the ID drop-down (#selDataset)
        d3.select("#selDataset") // Select selDataset ID
            .selectAll('option').data(names) // *** A D3 JOIN ***
            // See: https://bost.ocks.org/mike/join/
            // Join Syntax: selectAll(arrayA).data(arrayB)
            .enter().append('option') // Append to the enter function of the D3 Join
            // Join Structure: (Enter)(Update)(Exit)
            // Since there are no options in the ID drop-down, Update and Exit are empty
            .text(function(n){return n;}); // Specify what and how to append to Enter()
            // See: https://github.com/d3/d3-selection/blob/main/README.md#selection_append
            // Using the Identity Function in .text() maps the text-version to each name
    }
);

// Write a function to update the webpage, according to the ID selected

// HTML name: optionChanged(this.value)
function optionChanged(idSelection)
{
    // The entire rest of the program lives here. (D3 "data" does not exist outside of this function)
    promise.then((data) =>
    {

        // Identify and employ the biodiversity information from the Samples Array...

        // Get info from data.samples and store it in a variable
        samplesData = data.samples;
        
        // Create an array of objects to organize the Sample Value Data
        var arrayOfSampleObjects = [];

        // Create an array of objects to hold the Top 10 OTUs found in a sample
        var slicedData = [];

        // Loop through the Samples Array
        samplesData.forEach(sample => {
            // Check to see if the Sample ID matches the ID Selection,
            // If the IDs match, append that info to the following arrays
            if (sample.id === idSelection)
            {
                // Create arrays to store BD Info from the Samples Array
                var otu_idsArray = [];
                var otu_stringsArray = [];
                var otu_labelsArray = [];
                var sample_valuesArray = {};

                // The first array should map the OTU ID to an OTU ID String
                otu_stringsArray = sample.otu_ids.map(otuID => `OTU ${otuID}`);
                // The remaining three arrays should be be copies of
                // the corresponding arrays found in Samples Array
                otu_idsArray = sample.otu_ids;
                otu_labelsArray = sample.otu_labels;
                sample_valuesArray = sample.sample_values;

                // Covert the three OTU arrays to a list of objects
                for(var i = 0; i<= otu_idsArray.length; i++)
                {
                    var object = {
                        otuID: otu_idsArray[i],
                        otuString: otu_stringsArray[i],
                        otuLabel: otu_labelsArray[i],
                        sampleValue: sample_valuesArray[i]
                    }
                    arrayOfSampleObjects.push(object);
                }
                
                // Sort the array of objects to be in descending order, by sampleValue
                arrayOfSampleObjects.sort((first, second) => (second.sampleValue - first.sampleValue))

                // Slice the array of objects, keeping the first 10 objects
                slicedData = arrayOfSampleObjects.slice(0,10);

            } // End check of ID match

        }); // End loop through Samples Array - Completed Goal: Gathered slicedData & arrayOfSampleObjects

        // Create a horizontal bar chart using the BD Information (HTML: #bar)

        // Reorder the sliced data again - to match the image in the assignment requirements
        slicedDataReordered = slicedData.reverse()

        // Create a trace for the Bar Graph
        let barGraphTrace = {
            name: "bdInfoBarChart",
            type: 'bar',
            orientation: 'h',
            // Map an array of the sample Values for the x values
            x: slicedDataReordered.map(value => value.sampleValue),
            // Map an array of the OTU IDs for the y values
            y: slicedDataReordered.map(value => value.otuString),
            text: slicedDataReordered.otuLabel
        };

        // Define the Bar Graph Data
        let barGraphData = [barGraphTrace];

        // Define the Bar Graph Layout (Titles and Axes)
        let barGraphLayout = {
            title: "Biodiversity Information",
            xaxis: {
                title: "OTU Values"
            },
            yaxis: {
                title: "OTU Labels"
            }
        };

        // Plot the Bar Graph
        Plotly.newPlot("bar", barGraphData, barGraphLayout); // Use the keyword "bar" here as a reference to the "bar" id in index.html
        
        // Create a bubble chart using the BD Information (HTML: #bubble)

        // Create a list of outIDs for the X Values and Marker Colors
        var otuIDsArray = arrayOfSampleObjects.map(value => value.otuID);
        var otu_labelsArray = arrayOfSampleObjects.map(value => value.otuLabel);
        // Create a list of sampleValues for the Y Values and Marker Size
        var sampleValuesArray = arrayOfSampleObjects.map(value => value.sampleValue);

        
        // Remove non-numerical (undefined) values from the two arrays
        otuIDsArray = otuIDsArray.filter(Number);
        sampleValuesArray = sampleValuesArray.filter(Number);

        // Create a trace for the Bubble Chart
        var bubbleChartTrace = {
            x: otuIDsArray,
            y: sampleValuesArray,
            text: otu_labelsArray,
            mode: 'markers',
            marker: {
                color: otuIDsArray,
                size: sampleValuesArray,
            }
        };

        // Define the Bubble Chart Data
        var bubbleChartData = [bubbleChartTrace];

        // Define the Bubble Chart Layout (Titles and Axes)
        var bubbleChartLayout = {
            title: 'Bubble Chart',
            showlegend: true,
            xaxis: {
                title: "OTU ID Labels"
            },
            yaxis: {
                title: "OTU Values"
            }
        }

        // Plot the Bubble Chart
        Plotly.newPlot('bubble', bubbleChartData, bubbleChartLayout);

        // Update the demographic data table

        // Remove the old demographic table data
        d3.select(".panel-body").selectAll('div').remove()

        // Get info from data.metadata and store it in a variable
        var sampleMetadata = data.metadata;
        
        // Create an object to hold the demographic data of the sample
        var demographicArray = [];

        console.log("sampleMetadata");
        console.log(sampleMetadata);

        // Loop through the Metadata Array (contains the demographic information)
        sampleMetadata.forEach(sample => {
            // Check to see if the Sample ID matches the ID Selection,
            // If the IDs match, append that info to the following arrays
            if (sample.id == idSelection)
            {
                demographicArray = [`Sample ID: ${sample.id}`,
                    `Ethnicity: ${sample.ethnicity}`,
                    `Gender: ${sample.gender}`,
                    `Age: ${sample.age}`,
                    `Location: ${sample.location}`,
                    `Belly Button Type: ${sample.bbtype}`,
                    `Wash Frequency: ${sample.wfreq}`];
            }
        });

        // Use a D3 Join to add text to ".panel-body"
        d3.select(".panel-body").selectAll('div') // Joining a new div to Panel Body
            .data(demographicArray).enter() // Choose to use data from the demographicArray
            .append('div') // Add a new div for each element in the demographicArray
            .text(function(d){return d;}); // Return the text of each array element

    }); // End promise.then()
};