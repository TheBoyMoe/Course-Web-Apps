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
 
 * The flex grow property determines how much space an item should take up, by default items only take up as much space as is req'd. Add flex-grow:1 to all items in a container and all available space within the parent is equally shared amongst all children which grow to occupy parent's width. Add flex-wrap: wrap to parent and the items automatically wrap to the next line when the parent is re-sized and there isn't enough space. Use flex-grow to create 2 and 3 column layout. Add the flex-basis property and the items will occupy the same space until the flex-basis width is reached. Below this and the browser will re-distribute that space. Without flex-basis and items takeup as much space as req'd, with the remaining space being distributed between them. Use the flex shorthand instead of specifying flex-grow and flex-basis.
 
 * Align items on the cross-axis - top to bottom of the page
 	* add the align-items property to the flex container, align-items: stretch, items take all available vertical space of parent.
 	* flex-start and flex-end - align items to top/bottom of parent - if parent's flex-direction set to row. If flex-direction is set to column, items align either left or right. Items take up as much vertical/horizontal space as required for their content.
 	* center and all items are vertically aligned in their parent
 
 * You can align individual items using the align-self property - applied to items. Has the options of center, flex-start/-end
 
 * To align an item vertically and horizontally, you can
 	1. set the item's margin to auto. With flex-box items, margin 'absorbs any extra space.
 	2. set the flex container's justify-content (center on main-axis) and align-items (align on the cross-axis) properties to center
 	3. set the flex container's justify-content prop to center & the flex item's align-self (align on the cross-axis) property to center.
  
 
 */


