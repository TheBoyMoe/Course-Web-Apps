/*
	References:
	[1] http://sass-lang.com/guide & http://thesassway.com/ & http://sassbreak.com/
	[2] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#variables_
	[3] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#syntax
	[4] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#using_sass
	[5] http://sassbreak.com/ruby-sass-libsass-differences/
	[6] http://sassbreak.com/watch-your-sass/
	[7] https://www.sassmeister.com/
	[8] https://codekitapp.com/
	[9] http://scout-app.io/
	[10] http://koala-app.com/
	[11] https://coryetzkorn.com/blog/color-variables-in-sass/
	[12] http://thesassway.com/beginner/variable-naming
	[13] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#nested_rules
	[14] http://thesassway.com/beginner/the-inception-rule
	[15] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#parent-selector
	[16] http://blog.teamtreehouse.com/sass-tip-double-ampersand-selector
	[17] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins
	[18] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixin-content
	[19] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#extend
	[20] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#placeholder_selectors_
	[21] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#comments
	[22] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#partials
	[23] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#media
	[24] https://github.com/necolas/normalize.css/blob/master/normalize.css (normalize v 7.0)
	[25] http://sass-lang.com/documentation/Sass/Script/Functions.html#rgb_functions
	[26] http://sass-lang.com/documentation/Sass/Script/Functions.html#hsl_functions
	[27] http://sass-lang.com/documentation/Sass/Script/Functions.html#opacity_functions
	[28] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#function_directives
	[29] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#number_operations
	[30] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#function_directives
	[31] http://blog.teamtreehouse.com/smarter-sass-mixins-null
	[32] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#keyword_arguments_2
	[33] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixin-arguments
	[34] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#_9
	[35] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#maps
	[36] http://sass-lang.com/documentation/Sass/Script/Functions.html#map-functions
	[37] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#_10
	[38] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#_12
	[39] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#interpolation_
	[40] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#each-directive
	[41] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#lists
	[42] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#each-directive
	[43] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#maps
	[44] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#_6 (error)
	[45] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#_5 (warn and debug)
	[46] https://www.sitepoint.com/using-source-maps-debug-sass-chrome/#live-editing-scss-in-the-browser (debug sass with source maps)
	[47] https://robots.thoughtbot.com/sass-source-maps-chrome-magic (more on source maps)
	[48] http://thesassway.com/intermediate/using-source-maps-with-sass
	
	compiling single sass file to css:
	$ sass input.scss:output.css
	
	you can have sass automatically update your sass files when any changes are saved with the watch command
	$ sass --watch input.scss:output.css
	
	you can automatically combine multiple sass files into a single css file by watching the sass folder
	$ sass --watch scss:css
	
	You need a server, eg http-server, and to have it running
 	$ http-server -p 3000
 
	* Mixins allow you to declare styles that can be referenced in other parts of your style sheet
	1. create the mixin with the @mixin directive
	2. include the mixin inside other rules with the @include directive followed by the mixin name
		- must be declared before called, wither at the top of the style sheet or in a separate file.
	
	Content directive allows you to pass values to mixins, allowing you to use the same mixin in different locations. Add @content to the mixin definition, add {} with the content to the @include statement, following it's name.
	
	You can also pass arguments to mixins, e.g. @mixin center($w) {} - you can assign the $w value to one of the properties defined in the mixin, such as the width property. When defining mixins with parameter you can assign default values, e.g @mixin center($width: 200px). However, in certain situations when not assigning that property you do not need the property to show up in the css, e.g when using '$border: none' as a default. Instead use 'null' as the default value - stops sass outputting needless css.
	
	* Extend Directive allows you to share snippets of code across your style sheets.
	
	* Placeholder selectors are used for those selectors that do not appear in the html, thus not referenced directly, only used by sass, e.g with extend directives - create a placeholder selector to reference the styles common to two or more selectors, reference the placeholder selector in the style sheet with the @extend directive.
	
	* Comments - single line comments defined with // DO NOT appear in the css output
	
	* Partials - allow you to split your stylesheet into separate files, allowing you to modularize your css so it's easier to maintain. Use partials to group related styles, all your variables. Sass will automatically merge your partials into a single file on compilation.
	1. create the partial - add an _ to the beginning of the name of the sass file. The _ tells sass not to be compiled into css, you need to import partials into other sass files
	2. import the partial into other sass files, where required. You can even import partials into other partials.
	
	The order in which you import partials matters, that's the order in which they're compiled into css. Import partials that are being referenced in other partials first, e.g. mixins, variables, placeholders, etc.
	
 	* Media Queries - sass lets you nest media queries directly inside the selector they're being applied to. Instead of defining the media query and then defining the selector inside it with the specific styles to be applied at that break point, simply place the media query with the styles in that selector where it's initially defined. You can also create variables for the min-width and max-width values.
 	
 	* Functions output a single value, NO css. Define a function with the @function directive followed by the name of the function. Functions can take parameters, comma separated list. To make the parameters reusable define them as variables, name starts with a $ sign. All functions have a @return diractive to return the functions result.
 	
 	* Conditionals, @if(expression){} - output a block of code only if the expression evaluates as true. You'll often use conditionals inside mixins to make your mixins more intelligent, e.g make a flexible media query mixin that outputs different code for each break point.
 	
 	* Sass Maps - provide a way to keep track of data, by associating a name with a value - key/value pair. You can accessing any value in a map by using the name you assign it. A key can be any data type, eg string or number, must be unique. Sass provides a number of functions to manipulate maps.
 	
 */