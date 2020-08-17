import {
    select,
    geoPath,
    geoNaturalEarth1,
    zoom,
    event,
    scaleOrdinal,
    schemeSpectral,
    schemeCategory10
} from 'd3';
import { loadAndProcessData } from './loadAndProcessData';
//import { colorLegend } from './colorLegend';

const svg = select('svg');

const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);

const g = svg.append('g');



svg.call(zoom().on('zoom', () => {
    g.attr('transform', event.transform);
}));

const colorScale = scaleOrdinal(schemeCategory10);

// const colorValue = d => d.properties.data;
//const colorValue = d => d.properties.data;

loadAndProcessData().then(countries => {


    g.selectAll('path').data(countries.features)
        .enter().append('path')
        .attr('class', 'country')
        .attr('d', pathGenerator)
        .attr('fill', d => colorScale(d.properties.name))
        .append('title')
        .text(d => d.properties.name + ': ' + colorValue(d));

});