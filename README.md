*jQuery group animate*

Pattern to allow use of jQuery's animate method decoupled from element selections.

**Update**

Added an extra page to demonstrate the approach can also be used for scrolling too.

Animation in JavaScript is just a function running inside a timer changing a value based on how far towards the end time of the animation it is. So if the function checks the time and finds it's 2 minutes into a 4 minute animation it will change the value 50% between the start value and the end one.

Scrolling is the same when you think about it. A function running inside an event that fires when the user scrolls also checks how close to the end value it is. With that in mind, the pattern works with only a few changes to the group animate code.
