// Servo Sweep example for the ESP32
// https://wokwi.com/arduino/projects/323706614646309460

#include <ESP32Servo.h>


Servo servo;

const int servoPin1 = 18;
const int servoPin2 = 19;



void setup() {
  servo.attach(servoPin1, 500, 2400);
  servo.attach(servoPin2, 500, 2400);

}

int pos1 = 0;
int pos2 = 0;

void loop() {
  for (pos1 = 0; pos1 <= 180; pos1 += 1) {
    servo.write(pos1);
    delay(15);
  }
  delay(15*180);
  for (pos2 = 0; pos2 <= 180; pos2 += 1) {
    servo.write(pos2);
    delay(15);
  }
}

