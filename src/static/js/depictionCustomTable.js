/* eslint-disable */
const d3 = require("d3");

//create canvas
const svg = function () {
  const w = 46;
  const h = 556;
  d3.selectAll("#CustomTable")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .append("g");
};

// create gradient
const createGradient = function (color, color1, id) {
  const defs = d3.select("g").append("defs");

  const gradient = defs
    .append("linearGradient")
    .attr("id", id)
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

  gradient
    .append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", color)
    .attr("stop-opacity", 1);

  gradient
    .append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", color1)
    .attr("stop-opacity", 1);
};
// create base
const base = function () {
  d3.selectAll("g")
    .append("rect")
    .attr("width", 44)
    .attr("height", 556)
    .style("fill", "url(#baseGradient)")
    .attr("rx", 7)
    .attr("ry", 7);
  const WeekDays = [
    { name: "Sunday", initial: "S", x: "17.5" },
    { name: "Monday", initial: "M", x: "15.5" },
    { name: "Tuesday", initial: "T", x: "17.5" },
    { name: "Wednesday", initial: "W", x: "15.5" },
    { name: "Thursday", initial: "T", x: "15.5" },
    { name: "Fryday", initial: "F", x: "17.5" },
    { name: "Saturday", initial: "S", x: "17.5" },
  ];
  for (let i = 0; i < WeekDays.length; ++i) {
    let id = i + 1;
    d3.select("#CustomTable:nth-child(" + id + ")")
      .select("g")
      .append("text")
      .text(WeekDays[i].initial)
      .style("fill", "#A0A0A0")
      .attr("x", WeekDays[i].x)
      .attr("y", 20);
  }
};
// create custom
const custom = function (number, startTime, endTime, name, gradientId, id) {
  const depictionStartTime = startTime[0];
  startTime[0] = startTime[0] > endTime[0] ? (startTime[0] = 0) : startTime[0];
  const calStartTime = Number(startTime[0]) + Number(startTime[1] / 60);
  const calEndTime = Number(endTime[0]) + Number(endTime[1] / 60);
  const height = (calEndTime - calStartTime) * 22;
  const startHeight = calStartTime * 22 + 28;
  const startTextHeight = height < 22 ? startHeight + 8.5 : startHeight + 13;

  d3.select("#CustomTable:nth-child(" + number + ")")
    .select("g")
    .append("rect")
    .attr("width", "38")
    .attr("height", height)
    .attr("x", "3")
    .attr("y", startHeight)
    .style("fill", "url(#customGradient" + gradientId + ")")
    .attr("rx", "3")
    .attr("ry", "3")
    .attr("id", id);

  name = name.length > 6 ? name.substring(0, 5) + "…" : name;
  if (height >= 11) {
    d3.select("#CustomTable:nth-child(" + number + ")")
      .select("g")
      .append("text")
      .text(name.substring(0, 6))
      .attr("x", "5")
      .attr("y", startTextHeight)
      .style("font-size", "10")
      .style("fill", "white")
      .style("letter-spacing", "0.03em");
  }

  if (height > 44) {
    d3.select("#CustomTable:nth-child(" + number + ")")
      .select("g")
      .append("text")
      .text("" + depictionStartTime + ":" + startTime[1] + "~")
      .attr("x", "5")
      .attr("y", startTextHeight + 12)
      .style("font-size", "8")
      .style("fill", "white")
      .style("letter-spacing", "0.03em");

    d3.select("#CustomTable:nth-child(" + number + ")")
      .select("g")
      .append("text")
      .text("" + endTime[0] + ":" + endTime[1] + "")
      .attr("x", "5")
      .attr("y", startTextHeight + 12 + 10)
      .style("font-size", "8")
      .style("fill", "white")
      .style("letter-spacing", "0.03em");
  }
};

export default { svg, base, createGradient, custom };
