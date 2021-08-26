import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "../data/dummy_tree.json";

import {
  getMaxX,
  getMaxY,
  getMaxRadius,
  getMaxColor,
  orderLargestBelow,
  x,
  y,
  radius,
  color,
  name,
  id,
} from "../helpers/treeHelpers";

/*
Specify circle constants
*/
var circleMaxRadius = 8;
var circleMinRadius = 3;
var circleEnlargeConstant = 2;
var circleIdleOpacity = 0.2;
var circleActiveOpacity = 1;
var circleClickedStrokeWidth = 4;

/*
Create our user of interest
*/
var userOfInterest = {
  UserID: "123456789", // Add the user of interest if wanted
};

/*
Create id-functions
*/
const getCircleId = (d) => "circ" + id(d);
const getTextId = (d) => "text" + id(d);

//
var radiusScale;
var colorScale;

//
var xScale;
var yScale;

function Tree() {
  const [tweetId, setTweetId] = useState(null);
  const d3Tree = useRef();

  useEffect(() => {
    const margin = { top: 50, right: 30, bottom: 30, left: 30 };
    const width =
      parseInt(d3.select("#tree").style("width")) - margin.left - margin.right;
    const height =
      parseInt(d3.select("#tree").style("height")) - margin.top - margin.bottom;
    //d3.selectAll("svg > *").remove();
    const svg = d3
      .select(d3Tree.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    /*
Create title
*/
    var title = g
      .append("text")
      .attr("class", "title") // style in css
      .attr("x", width / 2)
      .attr("y", 0)
      .text("Twitter network in 01_tree.json");

    xScale = d3
      .scaleLog()
      .range([0, width])
      .domain([1, getMaxX(data)]);
    var xAxis = d3.axisBottom(xScale).ticks(5, d3.format(",d"));
    var gXAxis = g
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + 0 + "," + height + ")")
      .call(xAxis);

    // Create x-axis label.
    var xAxisLabel = g
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height - 6)
      .text("Number of retweets");
    //

    yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, getMaxY(data)]);
    var yAxis = d3.axisLeft(yScale);
    var gYAxis = g.append("g").attr("class", "y axis").call(yAxis);

    // Create y-axis label
    var yAxisLabel = g
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Number of unique retweeters");

    /*
  Create scale for radius
  */
    radiusScale = d3
      .scaleLog()
      .base(10)
      .range([circleMinRadius, circleMaxRadius])
      .domain([1, getMaxRadius(data)]);

    /*
  Create scale for color
  */
    colorScale = d3
      .scaleLinear()
      .range(["blue", "red"])
      .domain([1, getMaxColor(data)]);

    // Enter the data
    var nodes = g
      .append("g")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cursor", "grab")
      .attr("class", "nodeCircle")
      .attr("data-id", id)
      .attr("id", getCircleId)
      .attr("opacity", circleIdleOpacity)
      .attr("fill", (d) => colorScale(color(d)))
      .attr("stroke", "black")
      .attr("stroke-width", 0)
      .attr("r", (d) => radiusScale(radius(d)))
      .attr("cx", (d) => xScale(x(d)))
      .attr("cy", (d) => yScale(y(d)))
      .on("mouseover", function (event, d) {
        d3.select(event.target)
          .attr("r", 10 * circleEnlargeConstant)
          .attr("opacity", circleActiveOpacity);

        console.log(d);
        console.log(event.target);
        console.log(this);

    
      })
      .on("mouseout", mouseoutCircle)
      .on("click", clickCircle)
      .sort(orderLargestBelow);

    svg.call(
      d3
        .zoom()

        .scaleExtent([0.5, Infinity])
        .on("zoom", (event, d) => {
          {
            // Create new x- and y-scale
            var new_xScale = event.transform.rescaleX(xScale);
            var new_yScale = event.transform.rescaleY(yScale);

            // Display new axes
            gXAxis.call(xAxis.scale(new_xScale));
            gYAxis.call(yAxis.scale(new_yScale));

            // Reposition circles
            d3.selectAll(".nodeCircle")
              .attr("cx", function (d) {
                return new_xScale(x(d));
              })
              .attr("cy", function (d) {
                return new_yScale(y(d));
              });


            // Reposition texts
            d3.selectAll(".nodeText")
              .attr("x", function (d) {
                return new_xScale(x(d));
              })
              .attr("y", function (d) {
                return new_yScale(y(d));
              });
          }
        })
    );

    // Create tooltip that shows username
    nodes.append("text").call(setTextAttributes);

    // Set appearance for user of interest
    d3.select("#" + getCircleId(userOfInterest)).attr("fill", "orange");

    g.exit().remove();
  }, []);



  //Set attributes for tooltip (showing screen name) text.
  const setTextAttributes = (text) => {
    text
      .attr("class", "hidden nodeText") // Set class to hidden upon creation
      .attr("data-id", id)
      .attr("id", getTextId)
      .attr("x", (d) => xScale(x(d)))
      .attr("y", (d) => yScale(y(d)))
      .attr("dy", (d) => -(circleMaxRadius * circleEnlargeConstant * 1.5))
      .attr("text-anchor", "beginning")
      .text((d) => name(d));
  };

  //Handle mouse hover on circle. Display circle's screen name.
  const mouseoverCircle = (event, d) => {
    var theCircle = d3
      .select(this)
      .attr("fill", "orange")
      .attr("r", 10 * circleEnlargeConstant);

  };

  //Handle zoom. Zoom both x-axis and y-axis.

  function mouseoutCircle(event, d) {
    d3.select(event.target)
      .attr("r", 10 / circleEnlargeConstant)
      .attr("opacity", circleActiveOpacity);
 
  }

  /**
   * Handle click on zoomable area. That is, handle click outside a node which
   * is considered a deselecting click => deselect previously clicked node
   * and remove displayed tweets.
   */
  const clickView = () => {
    // Remove clicked status on clicked nodes
    d3.selectAll(".clicked")
      .attr("stroke-width", "0")
      .classed("clicked", false);

    // Remove timeline
    //document.getElementById("tweet").innerHTML = "";

    // Get the <ul> element with id="myList"
    var list = document.getElementById("theTweet");

    // If the <ul> element has any child nodes, remove its first child node
    if (list.hasChildNodes()) {
      list.removeChild(list.childNodes[0]);
    }

    document.getElementById("theTweet").innerHTML = "";


  };

  /**
   * Handle click on a tweet circle. Display the clicked tweet and let the tweet
   * appear selected by adding a stroke to it.
   */
  const clickCircle = (event, d) => {
    // Remove results from old click
    clickView();

    // Add stroke width and set clicked class
    d3.select(this)
      .attr("stroke-width", circleClickedStrokeWidth)
      .classed("clicked", true);

    console.log(d.ScreenName);
    setTweetId(d.ScreenName);
  };

  useEffect(() => {
    const anchor = document.createElement("a");
    anchor.setAttribute("class", "twitter-timeline");
    anchor.setAttribute("data-theme", "light");
    anchor.setAttribute("height", "800");
    anchor.setAttribute("width", "500");
    anchor.setAttribute("data-chrome", "noheader nofooter noborders");
    anchor.setAttribute("href", `https://twitter.com/${tweetId}`);
    document.getElementsByClassName("twitter-embed")[0].appendChild(anchor);

    const script = document.createElement("script");
    script.setAttribute("src", "https://platform.twitter.com/widgets.js");
    document.getElementsByClassName("twitter-embed")[0].appendChild(script);
  }, [tweetId]);

  return (
    <div className="flex justify-center items-center p-20">
      <div className="shadow-lg bg-gray-100">
        <div id="tree">
          <svg ref={d3Tree}></svg>
        </div>
        <div className="twitter-embed" id="theTweet"></div>
      </div>
    </div>
  );
}

export default Tree;
