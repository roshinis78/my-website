// Using jQuery, read our data and call visualize(...) only once the page is ready:
$(function () {
    d3.csv('data/majors.csv').then(function (data) {
        // Call our visualize function:
        visualizeMajors(data)
    })
})

var visualizeMajors = function (data) {
    // Boilerplate:
    var margin = { top: 50, right: 0, bottom: 50, left: 50 }

    var width = 1050 - margin.left - margin.right

    var height = 540 - margin.top - margin.bottom

    var svg = d3
        .select('#majors-chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .style('width', width + margin.left + margin.right)
        .style('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // Visualization Code:

    var config = {
        pointDisp: 40,
        lineSpacing: 15
    }

    var color = d3
        .scaleLinear()
        .domain([-1, 0, 1])
        .range(['green', 'black', 'red'])

    // get an array of all the colleges with two spaces for axis padding
    var allColleges = ['', ...new Set(data.map(item => item.College)), '']

    var collegeScale = d3
        .scaleOrdinal()
        .domain(allColleges)
        .range(d3.range(0, width, width / allColleges.length))
    var hortzAxis = d3.axisBottom(collegeScale)

    var countScale = d3
        .scaleLinear()
        .domain([1200, 0]) // get the maximum number
        .range([margin.top, height])
    var vertAxis = d3.axisLeft(countScale)

    svg
        .append('g')
        .call(hortzAxis)
        .attr('transform', 'translate(' + margin.left + ',' + height + ')')
        .style('font', '15px calibri')

    svg
        .append('g')
        .call(vertAxis)
        .attr('transform', 'translate(' + margin.left + ', 0)')
        .style('font', '15px calibri')

    svg
        .append('text')
        .html('UIUC Undergraduate Major Distributions from 2004 to 2018')
        .attr('x', 320)
        .attr('y', 0)
        .style('font', '20px calibri')
        .style('fontWeight', 'bold')

    var startX = []
    var startY = []
    var endX = []
    var endY = []

    svg
        .selectAll('left')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'left')
        .attr('id', function (d, i) {
            return 'start-' + i
        })
        .attr('r', 3)
        .attr('cx', function (d, i) {
            var x = collegeScale(d.College) + margin.left - config.pointDisp
            startX.push(x)
            return x
        })
        .attr('cy', function (d, i) {
            var y = countScale(d['2004'])
            startY.push(y)
            return y
        })
        .attr('opacity', 0.5)

    svg
        .selectAll('right')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'right')
        .attr('id', function (d, i) {
            return 'end-' + i
        })
        .attr('r', 3)
        .attr('cx', function (d, i) {
            var x = collegeScale(d.College) + margin.left + config.pointDisp
            endX.push(x)
            return x
        })
        .attr('cy', function (d, i) {
            var y = countScale(d['2018'])
            endY.push(y)
            return y
        })
        .attr('opacity', 0.5)

    svg
        .selectAll('number-left')
        .data(data)
        .enter()
        .append('text')
        .text(function (d) {
            return d['2004']
        })
        .attr('x', function (d, i) {
            return startX[i] - 35
        })
        .attr('y', function (d, i) {
            return startY[i] + 5
        })
        .attr('class', 'number-left')
        .attr('id', function (d, i) {
            return 'number-left-' + i
        })
        .attr('opacity', 0)

    svg
        .selectAll('number-right')
        .data(data)
        .enter()
        .append('text')
        .text(function (d) {
            return d['2018']
        })
        .attr('x', function (d, i) {
            return endX[i] + 10
        })
        .attr('y', function (d, i) {
            return endY[i] + 5
        })
        .attr('class', 'number-right')
        .attr('id', function (d, i) {
            return 'number-right-' + i
        })
        .attr('opacity', 0)

    svg
        .selectAll('slope-line')
        .data(data)
        .enter()
        .append('line')
        .attr('class', 'slope-line')
        .attr('id', function (d, i) {
            return 'line-' + i
        })
        .attr('x1', function (d, i) {
            return startX[i]
        })
        .attr('y1', function (d, i) {
            return startY[i]
        })
        .attr('x2', function (d, i) {
            return endX[i]
        })
        .attr('y2', function (d, i) {
            return endY[i]
        })
        .attr('stroke-width', 1)
        .attr('stroke', function (d, i) {
            return color((endY[i] - startY[i]) / (endX[i] - startX[i]))
        })
        .attr('opacity', 0.5)

    svg
        .selectAll('majors-tooltip-background')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'majors-tooltip-background')
        .attr('id', function (d, i) {
            return 'majors-tooltip-background-' + i
        })
        .attr('opacity', 0)
        .style('stroke', 'black')
        .style('fill', 'black')
        .attr('x', function (d, i) {
            return startX[i] - 35
        })
        .attr('y', function (d, i) {
            y = startY[i]
            if (endY[i] < startY[i]) {
                y = endY[i]
            }
            return y - 100
        })
        .attr('rx', '5')
        .attr('ry', '5')
        .attr('width', '150')
        .attr('height', '70')

    var tooltip = svg
        .selectAll('majors-tooltip')
        .data(data)
        .enter()
        .append('text')
        .attr('id', function (d, i) {
            return 'majors-tooltip-' + i
        })
        .attr('x', function (d, i) {
            return startX[i] - 30
        })
        .attr('y', function (d, i) {
            y = startY[i]
            if (endY[i] < startY[i]) {
                y = endY[i]
            }
            return y - 83
        })
        .attr('opacity', 0)
        .style('font', '14px calibri')
        .style('fill', 'white')
    tooltip
        .append('tspan')
        .attr('class', 'tooltip-major')
        .text(function (d, i) {
            return d['Major Name']
        })
    tooltip
        .append('tspan')
        .attr('class', 'tooltip-growth')
        .text(function (d, i) {
            sign = d['2018'] - d['2004'] > 0 ? '+' : ''
            return 'Overall: ' + sign + (d['2018'] - d['2004'])
        })
        .attr('x', function (d, i) {
            return startX[i] - 30
        })
        .attr('dy', config.lineSpacing)
        .style('fontWeight', 'bolder')
        .style('fill', function (d, i) {
            return d['2018'] - d['2004'] > 0 ? 'chartreuse' : 'red'
        })
    tooltip
        .append('tspan')
        .attr('class', 'tooltip-growth')
        .text(function (d, i) {
            sign = d['2018_illinois'] - d['2004_illinois'] > 0 ? '+' : ''
            return 'Illinois: ' + sign + (d['2018_illinois'] - d['2004_illinois'])
        })
        .attr('x', function (d, i) {
            return startX[i] - 30
        })
        .attr('dy', config.lineSpacing)
        .style('fontWeight', 'bolder')
        .style('fill', function (d, i) {
            return d['2018_illinois'] - d['2004_illinois'] > 0 ? 'chartreuse' : 'red'
        })
    tooltip
        .append('tspan')
        .attr('class', 'tooltip-growth')
        .text(function (d, i) {
            sign = d['2018_oos'] - d['2004_oos'] > 0 ? '+' : ''
            return 'Non-Illinois: ' + sign + (d['2018_oos'] - d['2004_oos'])
        })
        .attr('x', function (d, i) {
            return startX[i] - 30
        })
        .attr('dy', config.lineSpacing)
        .style('fontWeight', 'bolder')
        .style('fill', function (d, i) {
            return d['2018_oos'] - d['2004_oos'] > 0 ? 'chartreuse' : 'red'
        })

    svg
        .selectAll('slope-line-area')
        .data(data)
        .enter()
        .append('line')
        .attr('class', 'slope-line-area')
        .attr('x1', function (d, i) {
            return startX[i]
        })
        .attr('y1', function (d, i) {
            return startY[i]
        })
        .attr('x2', function (d, i) {
            return endX[i]
        })
        .attr('y2', function (d, i) {
            return endY[i]
        })
        .attr('stroke-width', 20)
        .attr('stroke', 'white')
        .attr('opacity', 0)
        .on('mouseover', function (d, i) {
            document.getElementById('majors-tooltip-' + i).style.opacity = 1
            document.getElementById('majors-tooltip-background-' + i).style.opacity = 0.6
            document.getElementById('line-' + i).style.opacity = 1
            document.getElementById('start-' + i).style.opacity = 1
            document.getElementById('end-' + i).style.opacity = 1
            document.getElementById('number-left-' + i).style.opacity = 1
            document.getElementById('number-right-' + i).style.opacity = 1
        })
        .on('mouseout', function (d, i) {
            document.getElementById('majors-tooltip-' + i).style.opacity = 0
            document.getElementById('majors-tooltip-background-' + i).style.opacity = 0
            document.getElementById('line-' + i).style.opacity = 0.5
            document.getElementById('start-' + i).style.opacity = 0.5
            document.getElementById('end-' + i).style.opacity = 0.5
            document.getElementById('number-left-' + i).style.opacity = 0
            document.getElementById('number-right-' + i).style.opacity = 0
        })
}