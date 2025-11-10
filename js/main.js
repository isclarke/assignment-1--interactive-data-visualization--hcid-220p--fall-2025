//Load data from data.csv
d3.csv('data/data.csv').then(data => {
    const parseDate = d3.timeParse('%Y-%m-%d');
    data.forEach(d => {
        d.date = parseDate(d.date);
    });

    //Get min and max using d3 component
    const minDate = d3.min(data, d => d.date);
    const maxDate = d3.max(data, d => d.date);

    const everyDate = d3.timeDays(minDate, d3.timeDay.offset(maxDate, 1));

    //Count events per date
    const eventCount = d3.rollup(data, v => v.length, d => d3.timeFormat('%Y-%m-%d')(d.date));

    //Scale
    const xScale = d3.scaleTime()
        .domain([minDate, maxDate])
        .range([0, 1200]);

    // Create SVG container
    const svg = d3.select('#data-csv-container')
        .append('svg')
        .attr('width', 1200)
        .attr('height', 1200);

    // Create x-axis
    const xAxis = d3.axisBottom(xScale)
