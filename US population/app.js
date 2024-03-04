
fetch('new.json').then(response => response.json())
    .then(data => {
        const population = data.data.map(d => ({
            year: new Date(d.Year, 0, 1),
            population: d.Population
        }));
        drawchart(population);
    })



function drawchart(data) {
    // Declare the chart dimensions and margins.
    const width = 928;
    const height = 500;
    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 30;
    const marginLeft = 40;

    // Declare the x (horizontal position) scale.
    const x = d3.scaleUtc(d3.extent(data, d => d.year), [marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear([0, d3.max(data, d => d.population)], [height - marginBottom, marginTop]);

    // Declare the line generator.
    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.population));

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;").text("Year");

    // Add the x-axis.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    // Add the y-axis, remove the domain line, add grid lines and a label.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(height / 40).tickFormat(function(d) {
            return d / 1000000 + 'M';
    }))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("Population number"));

    // Append a path for the line.
    svg.append("path")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line(data));

    document.getElementById('chart').appendChild(svg.node());

}

