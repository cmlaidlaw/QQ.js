/*! @license
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Christopher M. Laidlaw
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

QQ = function( callback ) {

    'use strict';

    this.items = [];
    this.current = -1;
    if ( typeof callback === 'function' ) {
        this.callback = callback;
    } else {
        this.callback = false;
    }

};

/*
 * Helper function to begin processing the queue
 */
QQ.prototype.start = function() {

    'use strict';

    this.__exec();

};

/*
 * Add an item to the queue.
 * Takes one function 'fn' as an argument. 'fn' is then bound with an
 * internal argument 'next' and then appended to the queue. Calling
 * 'next' within the scope of 'fn' will advance the queue.
 */
QQ.prototype.add = function( fn ) {

    'use strict';

    var that = this;

    this.items.push( function() {
        fn.call( that, function() { that.__exec(); } );
    } );

};

/*
 * Resets the execution pointer but leaves the queue intact to allow
 * re-execution of the entire queue.
 */
QQ.prototype.reset = function() {

    'use strict';

    this.current = -1;

};

/*
 * Resets the execution pointer and clears all items from the queue.
 */
QQ.prototype.clear = function() {

    'use strict';

    this.items = [];
    this.current = -1;

};

/*
 * Internal method used to advance the queue by one and execute the
 * final callback when the entire queue has been executed.
 */
QQ.prototype.__exec = function() {

    'use strict';

    this.current = this.current + 1;

    if ( this.current < this.items.length && this.items.length > 0 ) {

        //immediately execute the next item in the queue
        this.items[this.current]();

    } else if ( this.current == this.items.length && this.callback !== false) {

        //execute the final callback if the queue has completed execution
        this.callback();

    }

};