# Mars Clock

Mars time in the browser.

## TODO:

Static coordinates for various missions available [here](https://mars.nasa.gov/internal_resources/825/#:~:text=Its%20coordinates%20are%201.95%20degrees%20south%2C%20354.47%20degrees%20east.&text=Like%20a%20human%20field%20geologist,examine%20their%20composition%20and%20structure.)


### Software

1. ~Calculate Mars time~
2. ~Calculate time for Curiosity~
3. Calculate time for Spirit and Opportunity
4. Calculate time for Pathfinder
5. Calculate time for Phoenix
6. Calculate time for InSight
7. Calculate time for Viking landers
8. Add Mars calendar
9. Add Mars daylight map
10. Highlight Mission coordinates on the map
11. Replace daylight map with Google Mars?
12. Call to <http://worldclockapi.com/> for time instead of trusting the browser.
13. ~Publish to Github Sites.~
14. Change color scheme to inverted colors (night mode)
15. Auto-reload the site periodically so the mars clock pulls in new versions automatically
16. Figure out a no-flicker reload so the auto reload is seamless
17. Report mission times instead of MTC

### System

1. ~Prevent chromium from displaying "restore pages?" notification~
2. ~Hide mouse cursor on raspberry Pi~
3. Enable touchscreen on Raspberry pi
4. Order / construct more compact cabling for hdmi connection
  - mini HDMI port on the raspberry pi is on top of the board with the curved part pointing down at the board
      - so the cable needs the curved part of the plug pointing away from the breakout board
  - HDMI port on the display is behind the display with the curved part pointing at the display
      - so the cable needs the curved part of the plug pointint away from the breakout board
5. Order / construct more compact cabling for usb power for display
  - micro-USB port on the raspberry pi is on top of the board wth the curbed part pointing down at the board
      - so the cable needs the curved part of the plug pointing away from the breakout board
  - micro-USB port on the display is behind the display with the curved part pointing at the display
      - so the cable needs the curved part of the plug pointing away from the breakout board
6. Order / construct case
7. Mount components in case
  - Need some standoffs, surface mounts for them, screws to mount the board to them
8. Change desktop background to something Mars clock-y
9. Enable touchscreen keyboard on Raspberry Pi
    - [Manufacturer product website](https://wiki.52pi.com/index.php/5-Inch-800x480-Capacitive-Touch-Screen_SKU:_EP-0081)
10. Setup network time sync?
    - The Pi Zero doesn't have a CMOS battery, so I don't think it can keep a system time. But it appears to keep correct
      time regardless - maybe it's syncing to network time already? If so, we might not need this. And we might not
      need to manually query the time via an API in the clock app.
11. Pair bluetooth keyboard and mouse with the Pi
12. Install heat sink on Pi CPU
