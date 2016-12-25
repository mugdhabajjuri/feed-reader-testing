/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         //for loops through all the feeds from 0 to length and expects url to be defined
         it('url is defined', function(){
            for(var i=0; i<allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe(0);
            }
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        //for loops through all the feeds from 0 to length-1 and expects name to be defined
         it('name is defined',function(){
            for(var i=0; i<allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe(0);
            }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         //hasclass() determines whether any of the matched elements are assigned the given class.
         //here it expects menu element is hidden by default as the body have menu-hidden class.
         it('menu hidden', function(){
            expect($(document.body).hasClass('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          //by default menu icon is hidden when click() function is invoked menu-hidden should be false.
          it('menu change visibility', function(){
            menuIcon = $('.menu-icon-link');

            menuIcon.click();
            expect($(document.body).hasClass('menu-hidden')).not.toBe(true);

            menuIcon.click();
            expect($(document.body).hasClass('menu-hidden')).toBe(true);
          });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         //done function signals to the frame work when loadFeed() has completed
         //to make sure there is at least 1 entry then length of the .feed .entry should not be 0
         beforeEach(function(done){
            loadFeed(0,done);
         });

         it('have at least single .entry within .feed container', function(done){
                expect($('.feed .entry').length).not.toBe(0);
                done();
         });
    });

    describe("New Feed Selection", function() {
        var prevEntries, nextEntries;
        beforeEach(function(done) {
            loadFeed(1, function() {
                nextEntries = $('.feed').find("h2").text();
                done();
            });
        });

        it('test to ensure that the new feed is loaded', function(done) {
            loadFeed(0, function() {
                prevEntries = $('.feed').find("h2").text();
                console.log(prevEntries,nextEntries);
            });
            expect(prevEntries).not.toBe(nextEntries);
            done();
        });
    });
}());
