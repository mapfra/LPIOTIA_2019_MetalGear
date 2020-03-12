/*
 * Sketch     Default function sketch for robot
 * Platform   Freenove Hexapod Robot (Arduino/Genuino Mega 2560)
 * Brief      This sketch is used to show default function of Freenove Hexapod Robot.
 *            You can control the robot by remote control, Android device or computer.
 *            Changing the code will make the default function not working properly.
 * Author     Ethan Pan @ Freenove (support@freenove.com)
 * Date       2018/11/15
 * Copyright  Copyright © Freenove (http://www.freenove.com)
 * License    Creative Commons Attribution ShareAlike 3.0
 *            (http://creativecommons.org/licenses/by-sa/3.0/legalcode)
 * -----------------------------------------------------------------------------------------------*/

#ifndef ARDUINO_AVR_MEGA2560
#error Wrong board. Please choose "Arduino/Genuino Mega or Mega 2560"
#endif

// Include FNHR (Freenove Hexapod Robot) library
#include <FNHR.h>

FNHR robot;

void setup() {
  // Start Freenove Hexapod Robot with default function
  robot.Start(true);
}

void loop() {
  // Update Freenove Hexapod Robot
  robot.Update();
}
