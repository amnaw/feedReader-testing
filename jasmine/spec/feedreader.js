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
        it('allFeeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* this test loops through each feed in the allFeeds
         * object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('allURLs are defined', function() {
           let URL = /^(http|https):\/\//;
           for(feed of allFeeds){
                /* This covers all truthiness, including url.length === 0 and url === undefined !
                 * and do the job of [expect(feed.url).toBeDefined(); AND
                 * expect(feed.url.length).toBeGreaterThan(0);] */
                expect(feed.url).toBeTruthy();
                expect(feed.url).toMatch(URL); //to check if it is actually a URL 
            }
           
        });

        /* this test loops through each feed in the allFeeds 
         * object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('allNames are defined', function() {
            for(feed of allFeeds){
                expect(feed.name).toBeTruthy();
            }
           
        });
    });


    describe('The menu', function() {
        /* this test ensures the menu element is hidden by default.
         * grab the body and check if it have the class 'menu-hidden'
         */
        it('should be hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        }); 
        // this test ensures the menu changes visibility when the menu icon is clicked.
        it('should hiding/showing', function() {
            //grab the menu icon in a varible
            let menuIcon = document.querySelector('.menu-icon-link');
            //simulating the click on the menuIcon
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            //click again
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        }); 
    });

        /* this test ensures when the loadFeed function is called
         * and finishes, there is at least a single .entry element
         * within the .feed container note:loadFeed() is asynchronous
         */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            /* the callback function (the second argument of loadFeed) 
             * contains only one call to done() to shorten the code we'll passing the function itself 
             * (without invoking it) as the second argument:
             *  loadFeed(0, function() {
             *     done(); }) */
            loadFeed(0, done);
         });
        
        it('at least one entry', function() {
            //parent-child relationship $(".parent .child")
            let container = $('.feed .entry'); 
            expect(container.length).toBeGreaterThan(0);
            }) 
        });

        /* this test that ensures when a new feed is loaded
         * so we will check if the content actually changes.
         */
    describe('New Feed Selection', function() {   
        let content1;   //the  HTML content for the first feed
        let content2;  //the  HTML content for the second feed
        beforeEach(function(done) {
            loadFeed(0, function() {
                let feed1 = document.querySelector('.feed');
                content1 = feed1.innerHTML;
                loadFeed(1, function() {
                    let feed2 = document.querySelector('.feed');
                    content2 = feed2.innerHTML;
                    done();
                });
            });
         });

        it('the content is changed', function() {
            //compare between the contents
            expect(content1).not.toBe(content2);
            }); 
    });
}());

