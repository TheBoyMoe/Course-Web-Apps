/*
    BDD
    1. in bdd you describe the behaviour of parts of your programme,
        - what it should do
        - what happens if you provide it with a number instead of a string
    2. you describe how it should work, then you write code until it does work the way we expect it to.
    3. at first our tests will fail since our function, which provide the behaviour, have not been written
    4. we then code our function until the tests pass
    5. once our tests pass, you go back and refactor your code - we write our initial code to get the test to pass, go back to improve the code - red->green->refactor testing cycle
    6. now that we have tests in place we will immediately know when changes to the code break the apps functionality due to failing tests
    7. create a 'test' folder in the root of the app, mocha will automatically run all the test files in there when executing 'npm test' command
        - ensure that the 'test' script in package.json has value 'mocha'
    8. define test suites in Mocha with the 'describe' function
        - first arg is a description of the suite
        - 2nd arg is an anonymous function - never takes an arg, that acts as a wrapper around the tests
        - individual tests are also refered to as 'specs'
        
        
*/