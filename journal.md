# Journal

<https://jtauber.github.io/mars-clock/> is a gold mine of information about how to calculate Mars time.

So I'm going to start by basically just making a JS library that'll give the same results as that application does.

Let's start by running create-react-app.

OK, now add TODOs to the README.

OK, now time to get started on the actual code. Which of course means writing out a ton and then doing something simple.

We're going to be updating the clock in "real time" based on the browser time. That suggests having a timer that just
periodically sends an update even  to the API. Redux is perfect for that, so let's bring it in.


