# QQ.js: Wrangle asynchronicity with lightweight execution queues

QQ provides lightweight synchronous queues to help developers who
QQ about callback hell. It transforms complicated, asynchronous code
to be:

+   Cleaner
+   Flatter
+   Easier to reason about

## Quick Start

Instantiate a QQ as you would any other object; use the
`add` method to append code blocks to the
queue and then execute the `start` method
to begin sequential execution. For example:

    q = new QQ();

    q.add( function( next ) {

        var async = function() {
            console.log( 'foo' );
            next();
        };
        setTimeout( async, 2000 );

    } );

    q.add( function( next ) {

        console.log( 'bar' );
        next();

    } );

q.start();

...will (after two seconds) output:

    foo
    bar

## In-depth

### Constructor & Class Methods

`QQ( [function Callback] )`

__Description:__ Instantiates a queue object. The optional Callback argument will 
be called when the queue's execution has completed.

`.add( function Block )`

__Description:__ Appends a block of code to the queue. The first argument of the 
Block function will be provided by QQ and will advance the queue when executed.

`.start()`

__Description:__ Begins executing the queue.

`.reset()`

__Description:__ Resets the execution pointer to the beginning of the queue.

`.clear()`

__Description:__ Clears all items from the queue and resets the execution pointer 
to the beginning of the now-empty queue.

### Examples

The constructor takes one optional argument: a callback which is executed when 
the queue finishes.

    q = new QQ( function() {

        message = "Third: A final callback, passed as an argument to the "
                + "constructor, is executed when the queue finishes.";
        log( message );

    } );


QQ's `add` method appends a code block to the end of the queue. It takes one 
function as its only argument. That argument function itself takes one argument
which is assumed to be the queue's `next` function.

    q.add( function( next ){

        message = "First: Add blocks of code to the queue by passing an "
                + "anonymous function to the 'add' method."
        log( message );
        next();

    } );


The `next` function is provided by QQ and executes the next item in the queue 
when the current code block has completed execution. As such, `next` should be 
the last call made in each code block provided to `add`.

    q.add( function( next ){

        message = "Second: The anonymous function passed to the 'add' "
                + "method will be passed a single argument, the 'next' "
                + "function, which is called within your block of code "
                + "to advance the queue. 'next' can also be passed as a "
                + "callback to asynchronous operations like AJAX requests."
        log( message );
        timeout = setTimeout( next, 1000 );

    } );

Begin executing the queue with QQ's `start` method.

    q.start();

Finally, the `reset` and `clear` methods allow you to reset the queue to its 
original state (allowing you to execute the same sequence again) or clear the 
queue of all items, respectively.
