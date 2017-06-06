/**
	References:
	[1] https://medium.com/@martindefatte/is-css-flexbox-ready-for-prime-time-yet-dcaceebd6fdb
	[2] https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties
 	[3] https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 	[4]
 
 * set an element as the flex-box container, display: flex - block level flex container
	* display: inline-flex - container takes up as much space as required by the content
 
 * only children of a flex container become flex items - elements outside of the flex container are unaffected.
 
 * some flex properties only apply to flex containers and others to items, and vice versa
 
 * by default, flex items are laid out from left-to-right along the main axis - you can change this with the flex-direction property, and even change the direction of items
	* flex-direction: row (default, also - column, column-reverse, row-reverse)
	* row - elements lined up like columns/pillars
	* columns - elements stacked like rows
	* reverse - reverse order of elements, e.g 1-6 --> 6-1
 
 * by default all items will be placed on the same line, flex line, event if the items overflow the parent
 	* with flex-wrap property you can make items wrap when parent re-sized smaller (set flex-wrap on flex container)
 
 * Justify-content property (applied to containers only) allows you to control how elements are aligned in the parent container (on main access), e.g left, right or center but also allow you to control how space is distributed in the container
 	* flex-start - align items left
 	* flex-end - align items right
 	* center - align items in the center of the parent
 	* space-between/-around - distribute space between/around items
 
 * By default flex items appear in the order they're defined in the html (have an order value of 0), you can change the order of any item using the order property - applied to flex items ONLY. For an item to appear before other items, it must have an order value smaller than it's siblings, e.g -1, since default is 0.
 
 
 
 */


