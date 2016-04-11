// complete the function so that it returns the fastest route 
function navigate(numberOfIntersections, roads, start, finish) {

    

}

function toIntersections(roads) {
  var result = {
    toArray: function() {
      for (var i in this) {
        if (typeof this[i] !== 'function') {
          for (var j in this[i]) {
            console.log(this[i][j]);  
          }
        }
      }
    }
  };


  return roads.reduce(function(result, n) {
    result[n.from] = result[n.from] || [];
    result[n.to] = result[n.to] || [];

    result[n.from].push(result[n.to]);

    return result;
  }, result)
}

function toMap(intersections) {
  return Array.prototype.map.call(intersections, function(n, k) {
    console.log(n, k);
    return n;
  });
}

function getNeighbors(roads, intersection) {
  return roads.filter(function(r) {
    return r.from === intersection;
  }).map(function(road) {
    return 
  });
}

function getShortest(roads, index) {

}


var roads = [
    {from: 0, to: 1, drivingTime: 5},
    {from: 0, to: 2, drivingTime: 10},
    {from: 1, to: 2, drivingTime: 10},
    {from: 1, to: 3, drivingTime: 2},
    {from: 2, to: 3, drivingTime: 2},
    {from: 2, to: 4, drivingTime: 5},
    {from: 3, to: 2, drivingTime: 2},
    {from: 3, to: 4, drivingTime: 10}
];
  
toIntersections(roads).toArray();