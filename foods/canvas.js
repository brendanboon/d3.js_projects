/* 
   Created by Ryan Brounley
   April 2016
   
   A simple interactive visualization to show the calorie count of your breakfast
   
   Developer Note:
        This is not the only way to complete this visualization and in fact it 
        is not the simplest. The goal of this is to teach how to use d3's node features 
        and to show d3 visualization data structure information 
        rather than from pure json/csv files. With a little work to this method,
        one can implement a way for users to add data interactively.
*/



//sets up the mvc style canvas
newd3Controller(foodsModel());


/**  foodsModel()
        This is the data structure for the visualization, d3 will read it's data from here
        
     returns:
        addFood : method to add food to the list data structure
        getFoods : getter to grab food list data structure
**/

function foodsModel(){
    var foods = [];     //list of all foods
    var idx = 0;        //current index
    
    
    /*  function food:
            This is essentially a food object, however, it is designed as a function using
            the concepts of function closure.
            
        parameters: 
            type: food type from json
            calories: calorie count from json
            name: name from json
            
        returns:
            idx : the index of the new node, incremented each time it's built.
            name : the name of the food item for the bubble in d3
            calories : calorie count of food
            type : which type of breakfast food it groups with
            radius : determines the size of the bubble (according to calorie count)
            color : color of bubble
            cx : the x value on the svg
            cy : the y value on the svg
            active : did they choose this to add to 
    */
    
    function food(_type, _cal, _name) {
        var active = false;
        var color;
        var cx;
        var i;
        
        //switch statement to determine the color based on type
        //sets the color and the i value (used in cx calculation)
        switch (_type){
                case "meat" : 
                    color = "red";
                    i = 1;
                    break;
                case "drink" : 
                    color = "blue";
                    i = 2;
                    break;
                case "grain" : 
                    color = "green";
                    i = 3;
                    break;
                case "fruit" : 
                    color = "purple";
                    i = 4;
                    break;
                default :
                    color = "black";
                    break;
        }
                
        return{
            idx : idx++,
            name : _name,
            calories : _cal,
            type : _type,
            radius : (.46 * _cal), //scaling circle radius based on calorie count
            color : color,
            cx : (i * 380) - 200, //placing x value on page with relation to i value assigned above
            cy : 300,
            active : active,
        }
    }
    
    
    /*  function addFood:
            adds a new food to the list structure
            
        parameters: 
            type: food type from json
            calories: calorie count from json
            name: name from json
            
        returns:
            the food object generated and added.
    */
    function addFood(_type, _cal, _name){
        var newfood = food(_type, _cal, _name);
        foods.push(newfood);
        return newfood;
    }

    /*  function getFoods:
            returns the list of foods
            
        returns:
            foods (list)
    */
    function getFoods(){
        return foods;
    }
    
    
    //returns the setters and getters to use in controller
    return {
        addFood : addFood,
        getFoods : getFoods,
    }
}



/**  newd3Controller(_model)
        Where all the d3 happens!
**/

function newd3Controller(_model) {
    var model = _model;
    
    /* 
       height and width copy the width and height values
       of the div element in html 
    */ 
    var height = 550,
        width = 1500,
        padding = 10, // separation between nodes
        maxRadius = 20;
    
    
    //Reads foods.json in and adds each listing to the model's food list
    d3.json("foods.json", function(error, data) {
          if(error) return console.warn(error);
          data.forEach(function(d) {
              model.addFood(d.type, d.calories, d.name);
          });
          attachFood();
        });

    
        //creates an svg to use as d3 canvas to the div with id "container"
        var svg = d3.select("#container").append("svg")
            .attr("width", width)
            .attr("height", height);
    
        //Set of text above each type on the page
        svg.append("svg:text")
           .text("Proteins")
           .attr("x",125)
           .attr("y", 50)
           .attr("fill", "red")
           .attr("font-family", "sans-serif")
           .attr("font-size", 30);
    
        svg.append("svg:text")
           .text("Drinks")
           .attr("x",500)
           .attr("y", 50)
           .attr("fill", "blue")
           .attr("font-family", "sans-serif")
           .attr("font-size", 30);
    
        svg.append("svg:text")
           .text("Grains")
           .attr("x", 900)
           .attr("y", 50)
           .attr("fill", "green")
           .attr("font-family", "sans-serif")
           .attr("font-size", 30);
    
       svg.append("svg:text")
           .text("Fruits")
           .attr("x",1300)
           .attr("y", 50)
           .attr("fill", "purple")
           .attr("font-family", "sans-serif")
           .attr("font-size", 30);
    
        var calorieCounter = document.getElementById('calories');
        var items = document.getElementById('items');
    
    
        //An update method to refresh the data on the graph in case of change
        function attachFood(){
            updateCalories();
            var nodes = model.getFoods(); //establishes data as model list

            //creates force layout on page that applies to all nodes and uses the tick function below
            var force = d3.layout.force()
                .nodes(nodes)          //adds nodes
                .size([width, height]) //width and height match that of svg
                .gravity(0)
                .charge(0)
                .on("tick", tick)      //sets tick function
                .start();

            //creates a "g" element for each node
            var node = svg.selectAll(".node")
                .data(nodes)
                .enter().append("g")
            
            
            //appends a circle with information to each node
            var circle = node.append("circle")
                .call(force.drag)
                .attr("class", "node")
                .attr("id", function(d) { return d.name; })
                .attr("r", function(d) { return d.radius; })
                .style("fill", function(d) { return color(d); })
                .on("click", function (d){
                                    if(d.active) d.active = false;
                                    else         d.active = true;
                    
                                    console.log(d.radius);
                                    d3.select(this).style("fill", function(d) { return color(d);})
                                    updateCalories();
                });       

            //appends formatted "name" text to each node
            var text =
              node.append("text")
                    .attr("x", function (d) { return d.cx })
                    .attr("y", function (d) { return d.cy })
                    .style("text-anchor", "middle")
                    .text( function (d) { return d.name; })
                    .attr("font-family", "sans-serif")
                    .attr("font-size", function(d){return fontSize(d);})
                    .attr("fill", "white");
                                

            //Changes the color of the circle if selected
            function color(d){
                if(d.active) return "gold";
                else         return d.color;
            }
            
            //Sample function to change font size according to radius of circle
            function fontSize(d){
                var radius = d.radius;
                if(radius < 21) return 8;
                else if(radius < 31 && radius > 21) return 9;
                else if(radius < 52 && radius > 31) return 12;
                else            return 20;
            }
            
            /*
            updateCalories():
                Updates the value of calories according to the selected nodes in the model
                providing an accurate representation of how many calories are in the 
                currently selected meal.
            */
            function updateCalories(){
                var count = 0;
                var actives = []; //keeps track of active nodes found in search
                var foods = model.getFoods();  //all the foods in the model
                
                //counts the calories and adds them to a new array
                for(var i = 0; i < foods.length; i++){
                    if(foods[i].active){
                        actives.push(foods[i]);
                        count += foods[i].calories;
                    }
                }
                
                //clears all active node text from active calorie description
                while (items.firstChild) {
                    items.removeChild(items.firstChild);
                }
                
                //adds all active node names to active calorie description
                actives.forEach(function (data){
                        var node = document.createElement('a');
                        var text = document.createTextNode(data.name + ", ");
                        node.appendChild(text);
                        items.appendChild(node);
                });
                
                //adds the total calorie count to html
                calorieCounter.innerHTML = "You will consume... " + count + " calories";
            }

            
           
            //Handles the movement of all of the nodes and their specific attributes
            function tick(e) {
              circle
                  .each(gravity(.2 * e.alpha))
                  .each(collide(.5))
                  .attr("cx", function(d) { return d.x; })
                  .attr("cy", function(d) { return d.y; });
                
              text
                  .each(gravity(.2 * e.alpha))
                  .attr("x", function(d) { return d.x; })
                  .attr("y", function(d) { return d.y; });
            }

            
            /*
                Multi-Foci is achieved because each group (type) of nodes is given a the same x and y value
                and the force layout/gravity functions have them pushing against each other towards the same spot.
                
                See https://bl.ocks.org/mbostock/1804919
            */
            
            // Move nodes toward cluster focus.
            function gravity(alpha) {
              return function(d) {
                d.y += (d.cy - d.y) * alpha;
                d.x += (d.cx - d.x) * alpha;
              };
            }

            // Resolve collisions between nodes.
            // see https://bl.ocks.org/mbostock/1804919
            function collide(alpha) {
              var quadtree = d3.geom.quadtree(nodes);
              return function(d) {
                var r = d.radius + maxRadius + padding,
                    nx1 = d.x - r,
                    nx2 = d.x + r,
                    ny1 = d.y - r,
                    ny2 = d.y + r;
                quadtree.visit(function(quad, x1, y1, x2, y2) {
                  if (quad.point && (quad.point !== d)) {
                    var x = d.x - quad.point.x,
                        y = d.y - quad.point.y,
                        l = Math.sqrt(x * x + y * y),
                        r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
                    if (l < r) {
                      l = (l - r) / l * alpha;
                      d.x -= x *= l;
                      d.y -= y *= l;
                      quad.point.x += x;
                      quad.point.y += y;
                    }
                  }
                  return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                });
              };
            }
        }
    
}