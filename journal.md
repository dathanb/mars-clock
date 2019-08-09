# Journal

Links:
    - [Mars Clock by Jason Tauber](https://jtauber.github.io/mars-clock/)
    - [Allison and McEwen 2000](https://pubs.giss.nasa.gov/abs/al05000n.html)
    - [Mars24 Sunclock - Algorithm and Worked Examples](https://www.giss.nasa.gov/tools/mars24/help/algorithm.html)

## 2019-08-04

<https://jtauber.github.io/mars-clock/> is a gold mine of information about how to calculate Mars time.

So I'm going to start by basically just making a JS library that'll give the same results as that application does.

Let's start by running create-react-app.

OK, now add TODOs to the README.

OK, now time to get started on the actual code. Which of course means writing out a ton and then doing something simple.

We're going to be updating the clock in "real time" based on the browser time. That suggests having a timer that just
periodically sends an update even  to the API. Redux is perfect for that, so let's bring it in.

OK, that works. So now we need a Redux store, right? That's super simple: `const store = createStore(someReducer)`.

OK, cool, reducer wired. Now let's setup a timer to pump out those events. Let's start slow -- one per second. I'm not
sure what that looks like, though -- should we have some sort of initialization step? Or is it a component that we
mount, and when it's mounted it starts firing, and when it's unmounted it stops? That sounds a little kludgie, but fine
for now. If nothing else, it's something I've never experimented with, so it'll be good learning. So let's add a Timer
component.

One thing I'm not crazy about is how JSX introduces what I consider to be an impedance mismatch between JavaScript
codebases and markup. In markup, everything is view-centric. That means that component names don't end in, e.g.,
`Component`. So you have markup that's like `<Container><Timer/><Bookmark/></Container>`, and that's totally appropriate
for a view-centric idiom. But within the context of the application code, the Timer component is just one part of what
makes a Timer. You may choose to factor out the logic that actually listens to the clock and dispatches actions as its
own class. What do you call it, then? To me, that's a Timer. And you can't import two things with the same name, or
export two things with the same name. So one of them ends up winning the naming battle, and the other one gets a name
that maybe doesn't entirely make sense.

I guess you could namespace things. E.g., how we `import React from 'react'`, and then `class MyComponent extends
React.Component`. We could force people to import things like that. But then your marku  might look like
`<Timer.Component>`, which is still weird.

Anyway, back to the task at hand. In order to mount our Timer component and have access to the Redux store, we'll want
to mount it inside a `<Provider>` tag. So let's redo the app to include that Provider tag.

And now the Timer. What do we need?

It's not going to render anything, so that's easy. And it won't receive prop updates, so that's easy. We basically just
want to start a timer (`setInterval`) when it's mounted, and remove that timer (`clearInterval`) when it's unmounted.
Let's start with that.

And now let's mount it.

OK, did that, and it's sending the current date to the console every second.

Now that we have that, let's work on some backend logic -- translating that time into Mars time.

Where does that belong? It's not really a component, it's just a library. So let's put it into its own directory --
`marsCalendar`.

First step I notice is that our Date in the console is in PDT. The logic for converting to Mars Coordinated Time
requires UTC datetimes, so let's do that conversion.

According to <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC>, that's just
`Date.getTime()`.

OK, just gonna dive into the math on that page and replicate it. Be back later.

I'm having trouble converting from Coordinated Mars Time to local mission times. So I'm going to take a step back from
figuring out all that stuff, and make my clock show Coordinated Mars Time first instead.

In a React+Redux context, the way to transit the date from my Timer to other components is to dispath an action. So
let's define an action.

## 2019-08-05

OK, I have some preliminary calculations displaying.

I'm kind of thinking that instead of a file full of a bunch of functions that you have to call correctly, I should maybe
have a MarsCalendar class, and you can get various things from it, like ∆J2000, MTC, etc. And it can do all the debug
logging when we call its methods to do calculations or display. So now seems like a good time to refactor in that
direction.

Also, I'm about at the point where a greater understanding of the actual equations is going to become really handy, so I
think I need to start developing with a few things open -- my editor, to make progress on the calculations; a pad and
paper, for taking notes; the mars clock, for reference; the Allison paper, for reading; and the worked equations site,
for understanding the Allison paper.

I think I'll pick that up tomorrow.

## 2019-08-08

Before going on with the rest of it, I think I'll do some refactoring. I started by doing all the calculations as separate
functions that could be composed, but that is getting a little unwieldy. Instead, I think I'll bundle all those functions
into a single class that calculates everything. That'll make it easier to transmit the information around, easier to
handle composition of functions, and just all around better IMO.
